# base_usr, class_name, limit
import requests
from ai1.object_model import Tool, Parameter

class NoticeRestApiTool(Tool):
    def __init__(self):
        description = "수업 공지 REST API를 호출해 반별 공지 목록을 가져오는 도구입니다."
        super().__init__(
            name="notice_rest_api",
            description=description,
            parameters=[
                Parameter(
                    name="base_url",
                    type="string",
                    description="공지 API 서버 기본 주소"
                ),
                Parameter(
                    name="class_name",
                    type="string",
                    description="조회할 반 이름"
                ),
                Parameter(
                    name="limit",
                    type="integer",
                    description="가져올 공지 개수"
                )
            ],
            required={"base_url", "class_name"}
        )

    def run(self, **kwargs) -> str:
        base_url = kwargs["base_url"]
        class_name = kwargs["class_name"]
        limit = kwargs.get("limit", 3)

        # https://example.com/ api/notices?class_name = python & limit = 3
        url = f"{base_url.rstrip('/')}/api/notices"

        params = {
            "class_name": class_name,
            "limit": limit
        }

        try:
            response = requests.get(
                    url,
                    params=params,
                    timeout=5
                )
            # 상태코드 오류 검사
            response.raise_for_status()

            notices = response.json()

            if not notices:
                return f"{class_name} 반 공지가 없습니다."

            lines = [f"{class_name} 반 공지 목록"]

            for index, notice in enumerate(notices, start=1):
                title = notice.get("title", "제목 없음")
                content = notice.get("content", "내용 없음")
                lines.append(f"{index}. {title} - {content}")

            return "\n".join(lines)

        except requests.RequestException as error:
            return f"공지 API 호출 오류: {error}"

        except Exception as error:
            return f"공지 처리 오류: {error}"





