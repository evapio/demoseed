"""
I am runtime
"""
import logging
import sys
import signal
import os
import importlib
import json

import tornado.web
import pymongo
import bson


class OpenHandler(tornado.web.RequestHandler):

    def options(self, *args, **kwargs):
        self.finish()

    def finish(self, *args, **kwargs):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        )
        self.set_header("Access-Control-Allow-Methods", "PUT, DELETE")
        super(OpenHandler, self).finish(*args, **kwargs)


def shutdown(sig, frame):
    logging.info('Shutting down')
    sys.exit(0)


def nice_list(mongo_result_set):

    return [
        nice_object(result) for result in mongo_result_set
    ]


def nice_object(record):
    new_record = record
    for k, v in new_record.iteritems():
        if isinstance(v, bson.ObjectId):
            new_record[k] = str(v)

    return new_record


class MainHandler(OpenHandler):

    def get(self):
        products = self.settings['mongodb'].gleebo.products.find(
            {
            }
        )
        self.finish({"products": nice_list(products)})


def main():

    logging.basicConfig(level=logging.INFO)

    root = logging.getLogger()

    root.handlers[0].setFormatter(
        logging.Formatter(
            '%(asctime)s %(levelname)-8s %(filename)-26s %(lineno)-6d - %(message)s'
        )
    )
    config = json.load(open("/var/opt/config.json", "rb"))[0]
    logging.info(config)
    mongodb = pymongo.MongoClient(
        "mongodb://{}:{}/".format(config['db'][0].get('ServiceAddress'),
                                  config['db'][0].get('ServicePort')))

    application = tornado.web.Application(
        [
            (r"/", MainHandler)
        ],
        **{
            'debug': True,
            'mongodb': mongodb
        }
    )

    signal.signal(signal.SIGINT, shutdown)

    application.listen(9000)

    logging.info('API Server running')

    tornado.ioloop.IOLoop.instance().start()
