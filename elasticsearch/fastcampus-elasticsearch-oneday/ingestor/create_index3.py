import requests
import json

url = "http://localhost:9200/products"

payload = json.dumps({
    "settings": {
        "index": {
            "number_of_shards": 1,
            "number_of_replicas": 1
        },
        "analysis": {
            "analyzer": {
                "analyzer-name": {
                    "type": "custom",
                    "tokenizer": "keyword",
                    "filter": "lowercase"
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "id": {
                "type": "long"
            },
            "content": {
                "type": "text"
            },
            "title": {
                "type": "text"
            },
            "url": {
                "type": "text"
            },
            "image_file": {
                "type": "text"
            },
            "post_date": {
                "type": "date"
            },
            "modified_date": {
                "type": "date"
            },
            "shipped_from": {
                "type": "text"
            },
            "keywords": {
                "type": "text"
            },
            "meta_data": {
                "type": "object"
            },
            "color_ranks": {
                "type": "rank_features"
            },
            "local_confidence": {
                "type": "rank_features"
            }
        }
    }
})
headers = {
    'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)
