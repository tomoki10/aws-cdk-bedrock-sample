import boto3
import json
bedrock = boto3.client(service_name='bedrock-runtime',region_name='us-east-1')

modelId = 'ai21.j2-ultra-v1'
accept = 'application/json'
contentType = 'application/json'

def handler(event, context):
    request_message = event.get('request_message')
    body = json.dumps({
        "prompt": request_message,
        "maxTokens": 300,
        "temperature": 0.1,
        "topP": 0.9,
    })
    response = bedrock.invoke_model(body=body, modelId=modelId, accept=accept, contentType=contentType)
    # HAK: Response body may vary by model type
    #      If the output is empty, check with the following code
    #      print(json.dumps(response_body))
    response_body = json.loads(response.get('body').read())
    result = response_body.get('completions')[0].get('data').get('text')
    response = {'result': result}
    return response