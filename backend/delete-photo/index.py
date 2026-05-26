import json
import os
import boto3
import psycopg2

def handler(event: dict, context) -> dict:
    """Удаляет фото или обновляет подпись. action=delete|update_caption. Требует пароль администратора."""
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
    password = body.get('password', '')
    url = body.get('url', '')
    action = body.get('action', 'delete')

    if password != os.environ['ADMIN_PASSWORD']:
        return {
            'statusCode': 403,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный пароль'})
        }

    if not url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указан URL фото'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if action == 'update_caption':
        caption = body.get('caption', '')
        cur.execute("UPDATE photos SET caption = %s WHERE url = %s", (caption, url))
        conn.commit()
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': True})
        }

    # Delete from S3
    try:
        key = url.split('/bucket/')[-1]
        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        s3.delete_object(Bucket='files', Key=key)
    except Exception as e:
        print(f"S3 delete error (non-critical): {e}")

    # Delete from DB
    cur.execute("DELETE FROM photos WHERE url = %s", (url,))
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }