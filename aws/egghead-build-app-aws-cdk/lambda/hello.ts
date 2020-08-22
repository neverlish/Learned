exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
  console.log('event: ', JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, egghead friends! You've hit ${event.path}`
  }
}