import * as cdk from "aws-cdk-lib";
import { AwsCdkBedrockSampleStack } from "../lib/aws-cdk-bedrock-sample-stack";

const app = new cdk.App();
new AwsCdkBedrockSampleStack(app, "AwsCdkBedrockSampleStack", {
  env: { region: "us-east-1" },
});
