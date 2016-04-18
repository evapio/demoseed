"""
I am runtime
"""
import logging
import sys
import signal
import os
import importlib

import tornado.web
import pymongo
import bson


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


class MainHandler(tornado.web.RequestHandler):

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

    mongodb = pymongo.MongoClient("mongodb://test-db-base.service.evap")

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
