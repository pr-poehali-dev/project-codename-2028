import json
import os
import urllib.request
import urllib.parse


def send_telegram(token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text, 'parse_mode': 'Markdown'}).encode()
    req = urllib.request.Request(url, data=data, method='POST')
    with urllib.request.urlopen(req) as resp:
        resp.read()



def handler(event: dict, context) -> dict:
    """Отправляет заявку или подарочный сертификат. action=lead — заявка в Telegram, action=gift — сертификат на email через Brevo + уведомление в Telegram."""
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
    action = body.get('action', 'lead')

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '8944868733'

    if action == 'gift':
        recipient_name = body.get('recipient_name', '').strip()
        sender_name = body.get('sender_name', '').strip()
        amount = body.get('amount', 0)
        phone = body.get('phone', '').strip()

        if not amount:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'ok': False, 'error': 'Укажите сумму'})
            }

        tg_text = (
            f"🎁 *Заказан подарочный сертификат*\n\n"
            f"💰 Сумма: {int(amount):,} ₽"
            + (f"\n👤 Получатель: {recipient_name}" if recipient_name else "")
            + (f"\n🎀 От кого: {sender_name}" if sender_name else "")
            + (f"\n📞 Телефон: {phone}" if phone else "")
        )
        send_telegram(token, chat_id, tg_text)

    else:
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        message = body.get('message', '').strip()
        tariff = body.get('tariff', '').strip()

        tg_text = f"📋 *Новая заявка с сайта*\n\n👤 Имя: {name}\n📞 Телефон: {phone}"
        if tariff:
            tg_text += f"\n🏷 Тариф: {tariff}"
        if message:
            tg_text += f"\n💬 Комментарий: {message}"
        send_telegram(token, chat_id, tg_text)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }