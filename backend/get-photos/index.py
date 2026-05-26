import json
import os
import boto3

def handler(event: dict, context) -> dict:
    """Возвращает список фото галереи из S3"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    response = s3.list_objects_v2(Bucket='files', Prefix='gallery/')
    contents = response.get('Contents', [])
    print(f"S3 objects count: {len(contents)}, keys: {[o['Key'] for o in contents]}")

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    photos = [
        f"https://cdn.poehali.dev/projects/{access_key}/bucket/{obj['Key']}"
        for obj in sorted(contents, key=lambda x: x['LastModified'], reverse=True)
        if obj['Key'] != 'gallery/'
    ]
    print(f"Photos URLs: {photos}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'photos': photos})
    }