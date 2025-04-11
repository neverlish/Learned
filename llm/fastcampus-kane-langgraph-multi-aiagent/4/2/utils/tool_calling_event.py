from langchain_core.messages import AIMessage
import streamlit as st
import requests
from io import BytesIO
from PIL import Image
import base64
from langsmith import traceable


async def invoke_our_graph(state, st_placeholder, graph):  # graph 매개변수 추가
    container = st_placeholder
    thoughts_placeholder = container.container()
    token_placeholder = container.empty()
    final_text = ""

    try:
        async for event in graph.astream_events(
            state, version="v2"
        ):  # session_state에서 가져온 graph 사용
            kind = event["event"]

            if kind == "on_chat_model_stream":
                addition = event["data"]["chunk"].content
                final_text += addition
                if addition:
                    token_placeholder.write(final_text)

            elif kind == "on_tool_start":
                with thoughts_placeholder:
                    status_placeholder = st.empty()
                    with status_placeholder.status(
                        "도구 호출중...", expanded=True
                    ) as s:
                        tool_name = event["name"]
                        st.write(f"🔧 {tool_name}를 호출했습니다.")

                        input_data = event["data"].get("input")
                        if tool_name == "search_docs":
                            st.write("📚 문서 검색:")
                            st.info(input_data)
                        else:
                            st.write("도구 입력값:")
                            st.code(input_data)

                        st.write("도구 출력값:")
                        output_placeholder = st.empty()
                        s.update(label="도구 호출을 완료했어요!", expanded=False)

            elif kind == "on_tool_end":
                with thoughts_placeholder:
                    if "output_placeholder" in locals():
                        tool_output = event["data"].get("output")
                        if isinstance(tool_output, str):
                            tool_output = tool_output
                        else:
                            tool_output = tool_output.content

                        output_placeholder.code(tool_output)

                        if event["name"] in ["data_visualization", "generate_image"]:
                            try:
                                splitted = tool_output.split(",")
                                if tool_output.startswith("data:image/png;base64,"):
                                    final_text += (
                                        f"\n![Generated Chart]({splitted[1]})\n"
                                    )
                                elif splitted[1].startswith("http"):
                                    with st.spinner():
                                        final_text += (
                                            f"\n![Generated Image]({splitted[1]})\n"
                                        )
                                else:
                                    st.error(tool_output)
                            except Exception as e:
                                st.error(f"Error displaying image: {str(e)}")
    except RecursionError as e:
        raise  # 상위 레벨에서 처리하도록 예외를 다시 발생시킵니다.

    return final_text
