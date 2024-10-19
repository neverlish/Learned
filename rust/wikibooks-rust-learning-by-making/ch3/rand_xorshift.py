import time

SEED = 0


def rand(start, end):
    global SEED

    if SEED == 0:
        SEED = int(time.time() * 1000)

    SEED ^= (SEED << 13) & 0xFFFFFFFF
    SEED ^= (SEED >> 17) & 0xFFFFFFFF
    SEED ^= (SEED << 5) & 0xFFFFFFFF

    return SEED % (end - start + 1) + start


for _ in range(100):
    print(rand(1, 6))
