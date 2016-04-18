import logging
import unittest

import groundcrew.common
import common


class PingTest(unittest.TestCase):
    """
    We're using unittest.TestCase as an exception here
    so we can control the lifetime of the server Process
    """

    @groundcrew.common.test
    def test_ping(self):
        common.setup(self)
        response = common.test_webmethod(
            self,
            '/api/ping',
            None,
            None,
            'get'
        )
        assert response.status_code == 200
        logging.info(response.content)
        self.tornado_process.terminate()

    @groundcrew.common.test
    def test_broken_ping(self):

        def config_update(config):
            config['<config>']['mongodb'] = {
                "host": "doesnotwork",
                "connectTimeoutMS": 1000,
                "serverSelectionTimeoutMS": 1000
            }

        common.setup(
            self,
            config_update=config_update
        )
        response = common.test_webmethod(
            self,
            '/api/ping',
            None,
            None,
            'get'
        )
        assert response.status_code != 200
        logging.info(response.content)
        self.tornado_process.terminate()
