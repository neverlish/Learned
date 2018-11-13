
export default {
  "apiGateway": {
    "ADDRESS": "https://6duvz8mvw7.execute-api.ap-northeast-2.amazonaws.com",
    "STAGE": "dev"
  },
  "services": {
    "PRODUCTS": "products",
    "CART": "cart",
    "CHECKOUT": "checkout"
  },
  "cognito": {
    "USER_POOL_ID": "ap-northeast-2_YXaBTXrJm",
    "APP_CLIENT_ID": "23te4d2t1qqbvoqe485loa84mh",
    "IDENTITY_POOL_ID": "ap-northeast-2:3ef56c6d-1a3a-4d0d-bd69-e555daef1091",
    "REGION": "ap-northeast-2"
  },
  "iot": {
    "REGION": "ap-northeast-2",
    "ENDPOINT": "a5n8ekl1og4d7-ats.iot.ap-northeast-2.amazonaws.com",
    "topics": {
      "COMMENTS": "serverless-store-comments"
    },
    "POLICY_NAME": "iot-policy"
  }
}
