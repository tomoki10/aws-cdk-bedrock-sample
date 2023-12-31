# Bedrock with AWS CDK Sample

This is a sample of deploying the code around Bedrock with AWS CDK.

# Sample Pattern

- Execute Bedrock from AWS Lambda

# Environment

| Software | version |
| -------- | ------- |
| Finch    | 0.7.0   |

| model | type-version |
| ----- | ------------ |
| AI21  | j2-ultra-v1  |

See package.json for other settings.

# Getting Started

## Setup GUI

Configure the AWS console to use Bedrock's AI21 j2-ultra-v1 model

## Deploy Resource

```
Setup to use finch with cdk
% export CDK_DOCKER=finch

Setting Boto3 Layer
% finch vm start
% finch run --entrypoint "" -v "$PWD":/var/task "public.ecr.aws/lambda/python:3.11.2023.09.27.10" /bin/sh -c "mkdir -p /tmp/python && pip3 install boto3 -t /tmp/python && cd /tmp && yum install -y zip && zip -r /var/task/boto3.zip ."
% mkdir src/layer
% mv boto3.zip src/layer/boto3.zip


% npm i
% npm run build
% npx cdk synth
% npx cdk deploy

Lambda re-deploy
% npx cdk deploy --hotswap
```

## Test Invoke

```
% export LAMBDA_NAME=<lambda_name>
% aws lambda invoke --function-name $LAMBDA_NAME \
    --payload $(echo '{"request_message":"What is a cdk?"}' | base64) \
    output.json --region us-east-1
```

# Referemce

[Amazon Bedrock|Running inference on a model](https://docs.aws.amazon.com/bedrock/latest/userguide/api-methods-run-inference.html)
[Amazon Bedrock がリリース！ Lambda から画像を 10 枚生成して S3 に置くまでの流れをやってみた](https://dev.classmethod.jp/articles/bedrock-lambda-stable-diffusion/)
[Actions, resources, and condition keys for Amazon Bedrock](https://docs.aws.amazon.com/ja_jp/service-authorization/latest/reference/list_amazonbedrock.html)
