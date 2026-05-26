import json
import os
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram"""
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
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()
    tariff = body.get('tariff', '').strip()

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '8944868733'

    text = f"📋 *Новая заявка с сайта*\n\n👤 Имя: {name}\n📞 Телефон: {phone}"
    if tariff:
        text += f"\n🏷 Тариф: {tariff}"
    if message:
        text += f"\n💬 Комментарий: {message}"

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode()

    req = urllib.request.Request(url, data=data, method='POST')
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }