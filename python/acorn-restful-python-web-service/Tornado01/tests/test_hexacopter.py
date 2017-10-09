import unittest
import status
import json
from tornado import ioloop, escape
from tornado.testing import AsyncHTTPTestCase, gen_test, gen
from async_api import Application

class TestHexacopter(AsyncHTTPTestCase):
    def get_app(self):
        self.app = Application(debug=False)
        return self.app

    def test_set_and_get_led_brightness_level(self):
        """
        Ensure we can set and get the brightness levels for both leds
        """
        patch_args_led_1 = {'brightness_level': 128}
        patch_args_led_2 = {'brightness_level': 250}
        patch_response_led_1 = self.fetch(
            '/leds/1',
            method='PATCH',
            body=json.dumps(patch_args_led_1))
        patch_response_led_2 = self.fetch(
            '/leds/2',
            method='PATCH',
            body=json.dumps(patch_args_led_2))
        self.assertEqual(patch_response_led_1.code, status.HTTP_200_OK)
        self.assertEqual(patch_response_led_2.code, status.HTTP_200_OK)
        get_response_led_1 = self.fetch(
            '/leds/1',
            method='GET')
        get_response_led_2 = self.fetch(
            '/leds/2',
            method='GET')
        self.assertEqual(get_response_led_1.code, status.HTTP_200_OK)
        self.assertEqual(get_response_led_2.code, status.HTTP_200_OK)
        get_response_led_1_data = escape.json_decode(get_response_led_1.body)
        get_response_led_2_data = escape.json_decode(get_response_led_2.body)
        self.assertTrue('brightness_level' in get_response_led_1_data.keys())
        self.assertTrue('brightness_level' in get_response_led_2_data.keys())
        self.assertEqual(get_response_led_1_data['brightness_level'], patch_args_led_1['brightness_level'])
        self.assertEqual(get_response_led_2_data['brightness_level'], patch_args_led_2['brightness_level'])
