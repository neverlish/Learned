import * as apiGateWay from '@aws-cdk/aws-apigateway';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';
import { TodoBackend } from './todo-backend';

export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoBackend = new TodoBackend(this, 'TodoBackend');

    new apiGateWay.LambdaRestApi(this, 'Endpoint', {
      handler: todoBackend.handler,
    })

    const logoBucket = new s3.Bucket(this, 'LogoBucket-neverlish', {
      publicReadAccess: true
    });

    new s3Deployment.BucketDeployment(this, 'DeployLogo', {
      destinationBucket: logoBucket,
      sources: [s3Deployment.Source.asset('./assets')]
    })

    new cdk.CfnOutput(this, 'LogoPath', {
      value: `https://${logoBucket.bucketDomainName}/egghead-logo.png`
    });
  }
}
