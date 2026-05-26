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

    access_key = os.environ['AWS_ACCESS_KEY_ID']

    # List without prefix first to see all objects
    response = s3.list_objects_v2(Bucket='files')
    all_contents = response.get('Contents', [])
    print(f"All objects in bucket: {[o['Key'] for o in all_contents]}")

    # Filter gallery items in Python
    contents = [o for o in all_contents if o['Key'].startswith('gallery/') and o['Key'] != 'gallery/']
    print(f"Gallery objects: {[o['Key'] for o in contents]}")

    photos = [
        f"https://cdn.poehali.dev/projects/{access_key}/bucket/{obj['Key']}"
        for obj in sorted(contents, key=lambda x: x['LastModified'], reverse=True)
    ]
    print(f"Photos URLs count: {len(photos)}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'photos': photos})
    }
