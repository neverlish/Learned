import streamlit as st
import pandas as pd

# 페이지 구성 설정: 전체 너비로 확장
st.set_page_config(layout="wide")

st.title("🔍 프로필 매칭 검색")

# 프로필 데이터 로드
@st.cache_data
def load_profiles():
    return pd.read_json("profile_db.jsonl", lines=True)

profiles = load_profiles()

# 사용자 입력 부분
with st.form("search_form"):
    st.write("자신과 유사한 사람을 찾아보세요!")

    # 관심사 입력
    interests_text = st.text_input("관심사 입력", placeholder="예: 커피, 여행, 산책")
    interests = [interest for interest in interests_text.split(",")]

    # 선호하는 나이대 선택
    age_range = st.slider("선호하는 나이대", 20, 50, (20, 30))

    # 성별 선택
    gender_preference = st.radio("성별", ('모두', '남자', '여자'))

    # 검색 버튼
    submitted = st.form_submit_button("검색하기")

# 검색 결과 처리
def filter_profiles(profiles, interests, age_range, gender_preference):
    # 나이대와 성별로 필터링
    filtered_profiles = profiles[(profiles['age'] >= age_range[0]) & (profiles['age'] <= age_range[1])]
    if gender_preference != '모두':
        filtered_profiles = filtered_profiles[filtered_profiles['gender'] == gender_preference]

    # 관심사가 일치하는 프로필 찾기
    def interest_match(keywords):
        return any(interest in keywords for interest in interests)

    filtered_profiles['match_score'] = filtered_profiles['keywords'].apply(interest_match)
    return filtered_profiles[filtered_profiles['match_score']]

# 검색 결과 출력
if submitted:

    result_profiles = filter_profiles(profiles, interests, age_range, gender_preference)

    if not result_profiles.empty:
        st.subheader("검색 결과")
        st.write(f"관심사: {', '.join(interests)}, 나이대: {age_range}, 성별: {gender_preference}")

        for index, row in result_profiles.iterrows():
            with st.container(border=True):
                st.write(f"이름: {row['name']}")
                st.write(f"나이: {row['age']}, 성별: {row['gender']}")
                st.write(f"직업: {row['job']}")
                st.write(f"소개: {row['bio']}")
                st.write(f"관심사: {', '.join(row['keywords'])}")

                submitted = st.button("대화하기", key=f"btn_talk_{index}")
    else:
        st.write("검색 결과가 없습니다.")
