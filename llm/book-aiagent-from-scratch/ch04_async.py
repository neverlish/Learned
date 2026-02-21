import asyncio

# 비동기 함수 선언
async def say_hello(n):
    await asyncio.sleep(1)
    print(f"{n}번 인사")

# 메인 함수 선언
async def main():
    await asyncio.gather( # 비동기 함수 실행
        say_hello(1),
        say_hello(2),
    )
    print("완료!")

# 메인 함수 실행
asyncio.run(main()) 