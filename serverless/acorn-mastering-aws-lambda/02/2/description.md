## 버전 관리 및 별칭

```
$ aws lambda create-function --function-name FUNCTION_NAME --zip-file fileb://calculator.js.zip --role ROLE_ARN --handler calculator.handler --runtime nodejs10.x --publish
```

```
$ aws lambda list-versions-by-function --function-name calculator
```

```
$ aws lambda publish-version --function-name calculator --description "A second version created by CLI"
```

```
$ aws lambda create-alias --function-name calculator --name PROD --function-version 1 --description "PROD alias for my function"
```

```
$ aws lambda list-aliases --function-name calculator
```

```
$ aws lambda update-alias --function-name calculator --name PROD --function-version 2
```