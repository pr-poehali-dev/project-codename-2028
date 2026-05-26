import json
import os
import base64
import uuid
import boto3
import psycopg2

def handler(event: dict, context) -> dict:
    """Загружает фото в S3 и сохраняет URL в БД"""
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

    body = json.loads(event.get('body', '{}'))
    data_url = body.get('file', '')

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

    key = f"gallery/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(Bucket='files', Key=key, Body=file_data, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("INSERT INTO photos (url) VALUES (%s)", (cdn_url,))
    conn.commit()
    cur.close()
    conn.close()

    print(f"Saved photo to DB: {cdn_url}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }
