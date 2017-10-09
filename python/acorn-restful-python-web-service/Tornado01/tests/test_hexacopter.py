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

    def test_set_and_get_hexacopter_motor_speed(self):
        """
        Ensure we can set and get the hexacopter's motor speed
        """
        patch_args = {'motor_speed': 700}
        patch_response = self.fetch(
            '/hexacopters/1',
            method='PATCH',
            body=json.dumps(patch_args))
        self.assertEqual(patch_response.code, status.HTTP_200_OK)
        get_response = self.fetch(
            '/hexacopters/1',
            method='GET')
        self.assertEqual(get_response.code, status.HTTP_200_OK)
        get_response_data = escape.json_decode(get_response.body)
        self.assertTrue('speed' in get_response_data.keys())
        self.assertTrue('turned_on' in get_response_data.keys())
        self.assertEqual(get_response_data['speed'], patch_args['motor_speed'])
        self.assertEqual(get_response_data['turned_on'], True)

    def test_get_altimeter_altitude(self):
        """
        Ensure we can get altimeter's altitude
        """
        get_response = self.fetch(
            '/altimeters/1',
            method='GET')
        self.assertEqual(get_response.code, status.HTTP_200_OK)
        get_response_data = escape.json_decode(get_response.body)
        self.assertTrue('altitude' in get_response_data.keys())
        self.assertGreaterEqual(get_response_data['altitude'], 0)
        self.assertLessEqual(get_response_data['altitude'], 3000)

    def test_set_invalid_brightness_level(self):
        """
        Ensure we cannot set an invalid brightness level for a LED
        """
        patch_args_led_1 = {'brightness_level': 256}
        patch_response_led_1 = self.fetch(
            '/leds/1',
            method='PATCH',
            body=json.dumps(patch_args_led_1))
        self.assertEqual(patch_response_led_1.code, status.HTTP_400_BAD_REQUEST)
        patch_args_led_2 = {'brightness_level': -256}
        patch_response_led_2 = self.fetch(
            '/leds/2',
            method='PATCH',
            body=json.dumps(patch_args_led_2))
        self.assertEqual(patch_response_led_2.code, status.HTTP_400_BAD_REQUEST)
        patch_response_led_3 = self.fetch(
            '/leds/2',
            method='PATCH',
            body=json.dumps({}))
        self.assertEqual(patch_response_led_3.code, status.HTTP_400_BAD_REQUEST)

    def test_set_brightness_level_invalid_led_id(self):
        """
        Ensure we cannot set the brightness level for an invalid LED id
        """
        patch_args_led_1 = {'brightness_level': 128}
        patch_response_led_1 = self.fetch(
            '/leds/100',
            method='PATCH',
            body=json.dumps(patch_args_led_1))
        self.assertEqual(patch_response_led_1.code, status.HTTP_404_NOT_FOUND)

    def test_get_brightness_level_invalid_led_id(self):
        """
        Ensure we cannot get the brightness level for an invalid LED id
        """
        patch_response_led_1 = self.fetch(
            '/leds/100',
            method='GET')
        self.assertEqual(patch_response_led_1.code, status.HTTP_404_NOT_FOUND)

    def test_set_invalid_motor_speed(self):
        """
        Ensure we cannot set an invalid motor speed for the hexacopter
        """
        patch_args_hexacopter_1 = {'motor_speed': 89000}
        patch_response_hexacopter_1 = self.fetch(
            '/hexacopters/1',
            method='PATCH',
            body=json.dumps(patch_args_hexacopter_1))
        self.assertEqual(patch_response_hexacopter_1.code, status.HTTP_400_BAD_REQUEST)
        patch_args_hexacopter_2 = {'motor_speed': -78600}
        patch_response_hexacopter_2 = self.fetch(
            '/hexacopters/1',
            method='PATCH',
            body=json.dumps(patch_args_hexacopter_2))
        self.assertEqual(patch_response_hexacopter_2.code, status.HTTP_400_BAD_REQUEST)
        patch_response_hexacopter_3 = self.fetch(
            '/hexacopters/1',
            method='PATCH',
            body=json.dumps({}))
        self.assertEqual(patch_response_hexacopter_3.code, status.HTTP_400_BAD_REQUEST)

    def test_set_motor_speed_invalid_hexacopter_id(self):
        """
        Ensure we cannot set the motor speed for an invalid hexacopter id
        """
        patch_args_hexacopter_1 = {'motor_speed': 128}
        patch_response_hexacopter_1 = self.fetch(
            '/hexacopters/100',
            method='PATCH',
            body=json.dumps(patch_args_hexacopter_1))
        self.assertEqual(patch_response_hexacopter_1.code, status.HTTP_404_NOT_FOUND)

    def test_get_motor_speed_invalid_hexacopter_id(self):
        """
        Ensure we cannot get the motor speed for an invalid hexacopter id
        """
        patch_response_hexacopter_1 = self.fetch(
            '/hexacopters/5',
            method='GET')
        self.assertEqual(patch_response_hexacopter_1.code, status.HTTP_404_NOT_FOUND)

    def test_get_altimeter_altitude_invalid_id(self):
        """
        Ensure we cannot get the altimeter's altitude for an invalid altimeter id
        """
        get_response = self.fetch(
            '/altimeters/5',
            method='GET')
        self.assertEqual(get_response.code, status.HTTP_404_NOT_FOUND)
