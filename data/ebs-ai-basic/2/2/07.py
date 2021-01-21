# 이미지 데이터 겹쳐놓기
# 1. 원본 이미지 파일 읽어오기

import numpy as np
import matplotlib.pyplot as plt
import PIL.Image as pilimg

im1 = pilimg.open('jeju_summer.jpg')
im2 = pilimg.open('baby1.jpg')
im3 = pilimg.open('baby2.jpg')

# 2. 읽어온 두 이미지 합성하기
pix1 = np.array(im1)

# 조카 사진을 이어붙이기 위햏 배경 이미지 크기에 맞추어 변경할 크기 계산하기
# 만약 배경 화면의 가로 크기가 홀수이면 첫 번째 이미지의 가로 크기를 반올림하기
resizeX2 = pix1.shape[1] / 2

if (pix1.shape[1] % 2 > 0):
    resizeX2 = pix1.shape[1] / 2 + 1
else:
    resizeX2 = pix1.shape[1] / 2

# 조카의 사진 2장을 나란히 붙이기 위해 배경 이미지 크기의 절반씩 차지하도록 크기 변경하기
im2 = im2.resize((int(resizeX2), int(pix1.shape[0])))
pix2 = np.array(im2)

im3 = im3.resize((int(resizeX2), int(pix1.shape[0])))
pix3 = np.array(im3)

# 조카 사진 두 개를 가로 방향을 기준으로 나란히 붙이기(axis값을 0으로 하면 세로로 설정됨)
pix4 = np.concatenate((pix2, pix3), axis=1)

# 이미지를 블렌딩하기 위해 각 픽셀의 RGB 값을 (0~1)의 실수 범위로 정규화(normalize)
pix1 = (1/255) * pix1
pix4 = (1/255) * pix4

# 가중치 정하기(배경 이미지를 30%, 조카 이미지 두 개를 70%로 합성)
weight = 0.3

pix5 = pix1 * weight + pix4 * (1-weight)

# 두 원본 이미지의 가중치를 반대로 적용한 이미지 생성하기
pix6 = pix1 * (1-weight) + pix4 * weight

# 3. 합성한 이미지 출력하기

plt.subplot(141)
plt.imshow(pix1)
plt.axis('off')
plt.title('background', fontsize=10)

plt.subplot(142)
plt.imshow(pix4)
plt.axis('off')
plt.title('pictures of baby', fontsize=10)

plt.subplot(143)
plt.imshow(pix5)
plt.axis('off')
plt.title('70% blended', fontsize=10)

plt.subplot(144)
plt.imshow(pix6)
plt.axis('off')
plt.title('30% blended', fontsize=10)

plt.show()

# 4. 합성한 이미지 저장하기
pix5 = pix5*255
im5 = pilimg.fromarray(pix5.astype(np.uint8))
im5.save('BlendedPic_70.png')

pix6 = pix5*255
im6 = pilimg.fromarray(pix6.astype(np.uint8))
im6.save('BlendedPic_30.png')
