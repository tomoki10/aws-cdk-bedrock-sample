import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LayerVersion, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import {
  PolicyStatement,
  Effect,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";

import * as path from "path";

export class AwsCdkBedrockSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // MEMO: Setup to use the latest version of boto3,
    //      which will not be necessary once Lambda's boto3 is up-to-date.
    const layerVersion = new LayerVersion(this, "Boto3LayerVersion", {
      code: Code.fromAsset(path.join(__dirname, "../src/layer/boto3.zip")),
      compatibleRuntimes: [Runtime.PYTHON_3_11],
    });

    const bedrockAccessPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["bedrock:InvokeModel"], // See: https://docs.aws.amazon.com/ja_jp/service-authorization/latest/reference/list_amazonbedrock.html
      resources: ["*"],
    });

    const bedrockAccessRole = new Role(this, "BedrockAccessRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    });
    bedrockAccessRole.addToPolicy(bedrockAccessPolicy);

    new PythonFunction(this, "BedrockFunction", {
      entry: path.join(__dirname, "../src"),
      runtime: Runtime.PYTHON_3_11,
      index: "handler.py",
      handler: "handler",
      layers: [layerVersion],
      role: bedrockAccessRole,
      timeout: cdk.Duration.seconds(30),
    });
  }
}
