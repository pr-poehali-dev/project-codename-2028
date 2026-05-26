import json
import os
import base64
import uuid
import boto3

def handler(event: dict, context) -> dict:
    """Загружает фото тура в S3 и возвращает публичный URL"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    print(f"body length: {len(event.get('body', '') or '')}")
    body = json.loads(event.get('body', '{}'))
    data_url = body.get('file', '')
    print(f"data_url length: {len(data_url)}, starts with: {data_url[:50] if data_url else 'EMPTY'}")

    if not data_url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'No file provided'})
        }

    header, encoded = data_url.split(',', 1)
    content_type = header.split(':')[1].split(';')[0]
    ext = content_type.split('/')[1]
    file_data = base64.b64decode(encoded)
    print(f"content_type: {content_type}, file_data size: {len(file_data)}")

    key = f"gallery/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(Bucket='files', Key=key, Body=file_data, ContentType=content_type)
    print(f"uploaded to S3: {key}")

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }