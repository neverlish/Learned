import unittest

from unittest.mock import patch, MagicMock

from ai1.tools.rest_api.notice_api_tool import NoticeRestApiTool

class NoticeRestApiToolTest(unittest.TestCase):

    def setUp(self):
        self.tool = NoticeRestApiTool()

    def test_init(self):
        self.assertEqual(self.tool.name, "notice_rest_api")
        self.assertEqual(self.tool.required, {"base_url", "class_name"})
        parameter_names = [parameter.name for parameter in self.tool.parameters]
        self.assertIn("base_url", parameter_names)
        self.assertIn("class_name", parameter_names)
        self.assertIn("limit", parameter_names)

    @patch("ai1.tools.rest_api.notice_api_tool.requests.get")
    def test_run_success(self, mock_get):
        mock_response = MagicMock()

        mock_response.raise_for_status.return_value = None
        mock_response.json.return_value = [
            {
                "title": "파이썬 보강 수업 안내",
                "content": "이번 주 토요일 오전 10시에 보강 수업이 있습니다."
            },
            {
                "title": "과제 제출 안내",
                "content": "금요일 밤 10시까지 제출하세요."
            }
        ]

        mock_get.return_value = mock_response

        result = self.tool.run(
            base_url="https://example.com",
            class_name="python",
            limit=2
        )

        self.assertIn("파이썬 보강 수업 안내", result)
        self.assertIn("과제 제출 안내", result)

        mock_get.assert_called_once_with(
            "https://example.com/api/notices",
            params={
                "class_name": "python",
                "limit": 2
            },
            timeout=5
        )

    @patch("ai1.tools.rest_api.notice_api_tool.requests.get")
    def test_run_empty_notices(self, mock_get):
        mock_response = MagicMock()
        mock_response.raise_for_status.return_value = None
        mock_response.json.return_value = []
        mock_get.return_value = mock_response
        result = self.tool.run(
            base_url="https://example.com",
            class_name="flutter"
        )
        self.assertIn("flutter 반 공지가 없습니다", result)


if __name__ == "__main__":
    unittest.main()

