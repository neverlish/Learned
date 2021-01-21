# 컬러 이미지를 흑백 이미지로 만들기

import numpy as np
import matplotlib.pyplot as plt
import PIL.Image as pilimg

im1 = pilimg.open('baby1.jpg')

pix1 = np.array(im1)
pix1 = (1/255) * pix1
pixSize1 = np.array(pix1.shape)

pix2 = np.empty(pixSize1)

for i in range(pixSize1[0]):
    for j in range(pixSize1[1]):
        grayPix = 0.2126 * pix1[i][j][0] + 0.7152 * \
            pix1[i][j][1] + 0.0722 * pix1[i][j][2]
        pix2[i, j] = (grayPix, grayPix, grayPix)

plt.subplot(141)
plt.imshow(pix1)
plt.axis('off')
plt.title('Original', fontsize=9)

plt.subplot(142)
plt.imshow(pix2)
plt.axis('off')
plt.title('Gray converted', fontsize=9)

plt.show()
