### 로깅


```
$ aws lambda invoke \
--invocation-type RequestResponse \
--function-name FUNCTION_NAME \
--log-type Tail \
--payload '{"key1": "lambda", "key2": "is", "key3": "awesome!"}' \
output.txt

$ aws logs describe-log-groups \
--log-group-name-prefix '/aws/lambda/'

$ aws logs describe-log-streams \
--log-group-name '/aws/lambda/FUNCTION_NAME'

$ aws logs get-log-events \
--log-group-name '/aws/lambda/FUNCTION_NAME' \
--log-stream-name 'LOG_STREAM_NAME'

```
