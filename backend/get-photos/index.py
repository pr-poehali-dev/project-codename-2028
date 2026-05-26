import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Возвращает список фото из БД"""
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

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("SELECT url, caption FROM photos ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    photos = [{'url': row[0], 'caption': row[1] or ''} for row in rows]
    print(f"Photos from DB: {len(photos)}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'photos': photos})
    }