import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateWay from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';

export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: {
        isProduction: 'absolutely not'
      }
    });

    new apiGateWay.LambdaRestApi(this, 'Endpoint', {
      handler: helloLambda
    })

    const logoBucket = new s3.Bucket(this, 'LogoBucket-neverlish', {});
  }
}
