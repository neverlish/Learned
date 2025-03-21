import ast
import datetime
import hashlib
import json
import mysql.connector
import requests
import kg.kg_loader as kg_loader
import flower_classifier.tf_classifier as classifier
import flower_classifier.raw_color as raw_color

# SQL 에 연결하여 제품 페이지들을 추출하여 ProductPost array 로 돌려주는 함수입니다
def getPostings():
    wp_attachments_prefix = '../www/wp-content/uploads/'
    wp_attachments_url_prefix = 'http://localhost:8000/wp-content/uploads/'
    kg_source = 'kg/kowiki-20210701-pages-articles-multistream-extracted.xml'
    wiki_kg = kg_loader.loadWikimedia(kg_source)
    cnx = mysql.connector.connect(user='root',
                                password='my_secret_pw',
                                host='localhost',
                                port=9906,
                                database='flowermall')
    cursor = cnx.cursor()
    # 2. Flower model 을 train 합니다.
    # class_names, model = classifier.build_flower_model()

    query = ('SELECT posts.ID AS id, posts.post_content AS content, posts.post_title AS title, posts.guid AS post_url, posts.post_date AS post_date, posts.post_modified AS modified_date, metadata.meta_value AS meta_value, image_data.meta_value AS image FROM wp_posts AS posts JOIN wp_postmeta AS image_metadata ON image_metadata.post_id = posts.ID JOIN wp_postmeta AS image_data ON image_data.post_id = image_metadata.meta_value JOIN wp_postmeta AS metadata ON metadata.post_id = posts.ID WHERE posts.post_status = "publish" AND posts.post_type = "product" AND metadata.meta_key = "_product_attributes" AND image_metadata.meta_key = "_thumbnail_id" AND image_data.meta_key = "_wp_attached_file"')
    cursor.execute(query)

    posting_list = []
    for (id, content, title, url, post_date, modified_date, meta_value, image) in cursor:
        print("Post {} found. URL: {}".format(id, url))
        meta_data = {}
        keywords = []
        image_url = wp_attachments_url_prefix + image
        image_file = wp_attachments_prefix + image
        dominant_color = raw_color.get_dominant_rgb(image_file)
        keywords.append(dominant_color)
        r_rate, g_rate, b_rate = raw_color.get_rgb_ratio(image_file)
        raw_colors = {'red': r_rate, 'green': g_rate, 'blue': b_rate}

        # 3. flower classification 을 통해 추가 데이터를 추출해 냅니다.
        image_class, confidence = classifier.predict_class(title, image_url, class_names, model)
        if (confidence > 0.8):
            print(image_url + ' is most likely ' + image_class)
            keywords.append(image_class)
        for n_gram in title.split():
            if n_gram in wiki_kg:
                print("found entry for " + n_gram)
                meta_data = {**meta_data, **wiki_kg[n_gram]}
                subspecies = maybeGetSubspecies(wiki_kg[n_gram])
                if subspecies != None:
                    keywords.append(subspecies)
        shipping_location = assumeShippingLocation(meta_value)
        ships_local = 0.1
        ships_intl = 0.1
        if (shipping_location == '국내'):
            ships_local = 1.0
        else:
            ships_intl = 1.0
        local_confidence = { 'KR': ships_local, 'intl': ships_intl }
        product = ProductPost(id, content, title, url,
                              post_date, modified_date, shipping_location, image, meta_data, " ".join(keywords), raw_colors, local_confidence)
        posting_list.append(product)

    cursor.close()
    cnx.close()
    return posting_list

# Subspecies field 가 해당 wiki data 에 존재하면 돌려줍니다. 아니면 None 을 돌려줍니다
def maybeGetSubspecies(wiki_page):
    sub_species_key = u'과'
    if sub_species_key in wiki_page:
        return wiki_page[sub_species_key]
    return None

# 엘라스틱서치에 출력하는 함수입니다.
def postToElasticSearch(products):
    putUrlPrefix = 'http://localhost:9200/products/_doc/'
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    for product in products:
        id = getUniqueIndexId(product.url)
        print(id)
        r = requests.put(putUrlPrefix + id, data=json.dumps(product.__dict__,
                         indent=4, sort_keys=True, default=json_field_handler), headers=headers)
        if r.status_code >= 400:
            print("There is an error writing to elasticsearch")
            print(r.status_code)
            print(r.json())

# 아주 naive 한 출고지 extraction subroutine
def assumeShippingLocation(raw_php_array):
    if u'국내' in raw_php_array:
        return '국내'
    return '해외'

# Custom handlers for marshalling python object into JSON 
def json_field_handler(x):
    if isinstance(x, datetime.datetime):
        return x.isoformat()
    raise TypeError("Unable to parse json field")

# 엘라스틱서치에서 사용될 문서의 고유 아이디를 생성합니다.
def getUniqueIndexId(url):
    return hashlib.sha1(url.encode('utf-8')).hexdigest()

# 제품 페이지를 표헌하는 class 입니다.
class ProductPost(object):
  """
    Represents semantic data for a single product post
  """

  def __init__(self, id, content, title, url, post_date, modified_date, shipped_from, image_file, meta_data, keywords, color_ranks, local_confidence):
    self.id = id
    self.content = content
    self.title = title
    self.url = url
    self.post_date = post_date
    self.modified_date = modified_date
    self.shipped_from = shipped_from
    self.image_file = image_file
    self.meta_data = meta_data
    self.keywords = keywords
    self.color_ranks = color_ranks
    self.local_confidence = local_confidence

p = getPostings()
postToElasticSearch(p)
