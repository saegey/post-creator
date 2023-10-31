import * as cdk from "aws-cdk-lib";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
import { Bucket, CfnAccessPoint as S3AccessPoint } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { CfnAccessPoint as S3ObjectLambdaAccessPoint } from "aws-cdk-lib/aws-s3objectlambda";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
//import * as iam from 'aws-cdk-lib/aws-iam';
//import * as sns from 'aws-cdk-lib/aws-sns';
//import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
//import * as sqs from 'aws-cdk-lib/aws-sqs';

export class cdkStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });

    const dependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          {
            category: "function", // api, auth, storage, function, etc.
            resourceName: "routeAccessPoint", // find the resource at "amplify/backend/<category>/<resourceName>"
          } /* add more dependencies as needed */,
          {
            category: "storage", // api, auth, storage, function, etc.
            resourceName: "routeFiles", // find the resource at "amplify/backend/<category>/<resourceName>"
          } /* add more dependencies as needed */,
        ]
      );

    const bucketName = cdk.Fn.ref(dependencies.storage.routeFiles.BucketName);
    const functionArn = cdk.Fn.ref(dependencies.function.routeAccessPoint.Arn);

    const hello = Function.fromFunctionArn(
      this,
      "routeAccessPoint",
      functionArn
    );

    const s3AccessPoint = new S3AccessPoint(
      this,
      "s3-object-lambda-sample-access-point",
      {
        bucket: bucketName,
        name: "access-point",
      }
    );

    const accessPointName = "s3-object-lambda-access-point";
    new S3ObjectLambdaAccessPoint(this, "s3-object-lambda-access-point", {
      name: accessPointName,
      objectLambdaConfiguration: {
        supportingAccessPoint: `arn:aws:s3:${this.region}:${this.account}:accesspoint/${s3AccessPoint.name}`,
        transformationConfigurations: [
          {
            actions: ["GetObject"],
            contentTransformation: {
              AwsLambda: {
                FunctionArn: functionArn,
              },
            },
          },
        ],
      },
    });

    hello.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3-object-lambda:WriteGetObjectResponse"],
        resources: [
          `arn:aws:s3-object-lambda:${this.region}:${this.account}:accesspoint/${accessPointName}`,
        ],
      })
    );
  }
}
