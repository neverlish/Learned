import streamlit as st

#----------------------------------------------
def detect_intent(user_text):
    text = user_text.strip().lower()

    if "취소" in text:
        return "cancel"

    if "배송" in text or "상태" in text:
        return "delivery"

    if "주소" in text or "계정" in text or "변경" in text:
        return "info_change"

    return "default"






#----------------------------------------------
st.title("에이전트 UX 데모 대시보드")

st.subheader("채팅창 대신, 보이는 구조로 안내하는 간단한 에이전트 화면")

st.markdown(
    """
이 화면은 다음과 같은 일을 돕기 위한 데모입니다.

- 주문 취소
- 배송 상태 확인
- 계정 정보 변경 안내

아래 입력창에 요청을 적어보세요.
예: 주문 취소하고 싶어요 / 배송 상태 알려줘 / 주소 변경하고 싶어요
    """
)

col1, col2, col3, col4 = st.columns(4)

col1.metric("배송 준비", "3건")
col2.metric("배송 완료", "2건")
col3.metric("취소 가능", "1건")
col4.metric("환불 검토", "2건")

st.divider()

user_request = st.text_input("요청을 입력하세요")

intent = detect_intent(user_request)

action_col1, action_col2, action_col3 = st.columns(3)

if action_col1.button("주문 취소"):
    st.success("주문 취소 흐름을 시작할 수 있습니다. 주문번호를 확인해 주세요.")

if action_col2.button("배송 상태 확인"):
    st.info("배송 상태 확인을 위해 주문번호를 입력받는 화면으로 연결할 수 있습니다.")

if action_col3.button("계정 정보 변경"):
    st.warning("계정 정보 변경은 본인 확인이 필요한 작업으로 안내할 수 있습니다.")

if intent == "cancel":
    st.markdown("### 주문 취소 안내")
    st.write("주문번호를 입력하면 취소 가능 여부를 먼저 확인할 수 있습니다.")

    cancel_order_id = st.text_input("주문번호", key="cancel_order_id")

    agree_cancel = st.checkbox("취소 전 주문 내용을 다시 확인했습니다.")

    if st.button("취소 요청 진행"):
        if cancel_order_id and agree_cancel:
            st.success(f"{cancel_order_id} 주문에 대해 취소 요청 화면으로 이동할 수 있습니다.")
        else:
            st.error("주문번호 입력과 확인 체크가 필요합니다.")

elif intent == "delivery":
    st.markdown("### 배송 상태 안내")
    st.write("현재 배송 관련 주요 상태를 아래에서 확인할 수 있습니다.")

    delivery_choice = st.selectbox(
        "확인할 배송 단계",
        ["배송 준비", "출고 완료", "배송 중", "배송 완료"]
    )

    st.info(f"선택한 상태: {delivery_choice}")

elif intent == "info_change":
    st.markdown("### 계정 정보 변경 안내")
    st.write("변경하려는 항목을 선택하면 다음 절차를 안내할 수 있습니다.")

    change_target = st.radio(
        "변경 항목",
        ["주소 변경", "연락처 변경", "이메일 변경"]
    )

    st.success(f"{change_target} 절차 안내 화면을 이어서 구성할 수 있습니다.")

else:
    st.markdown("### 추천 사용 방법")
    st.write("아직 요청이 명확하지 않다면 아래 예시 중 하나로 시작해 보세요.")
    st.code("주문 취소하고 싶어요")
    st.code("배송 상태 알려줘")
    st.code("주소 변경하고 싶어요")

st.divider()

st.caption("이 데모는 질문에 따라 화면 블록이 달라지는 간단한 생성형 UI 느낌을 흉내 낸 예제입니다.")