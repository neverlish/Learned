from PIL import Image
import numpy as np

def get_dominant_rgb(image_file):
    im = Image.open(image_file)
    pix = im.load()
    width = im.size[0]
    height = im.size[1]
    rgb_counters = { 'red': 0, 'green': 0, 'blue': 0}
    for y in range(0, height):
        for x in range(0, width):
            r,g,b = im.getpixel((x, y))
            rgb_counters[get_dominant_raw_color(r, g, b)] += 1
    highest_count = np.max(list(rgb_counters.values()))
    for k, v in rgb_counters.items():
        if v == highest_count:
            print(k)
            return k

def get_dominant_raw_color(r,g,b):
    max_value = np.max([r,g,b])
    if r == max_value:
        return 'red'
    if g == max_value:
        return 'green'
    return 'blue'

def get_rgb_ratio(image_file):
    im = Image.open(image_file)
    pix = im.load()
    width = im.size[0]
    height = im.size[1]
    rgb_counters = {'red': 0, 'green': 0, 'blue': 0}
    for y in range(0, height):
        for x in range(0, width):
            r, g, b = im.getpixel((x, y))
            rgb_counters['red'] += r
            rgb_counters['green'] += g
            rgb_counters['blue'] += b
    total_color_count = rgb_counters['red'] + \
        rgb_counters['green'] + rgb_counters['blue']
    return (rgb_counters['red'] * 100 / total_color_count,
            rgb_counters['green'] * 100 / total_color_count,
            rgb_counters['blue'] * 100 / total_color_count)
