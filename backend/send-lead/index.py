import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_telegram(token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text, 'parse_mode': 'Markdown'}).encode()
    req = urllib.request.Request(url, data=data, method='POST')
    with urllib.request.urlopen(req) as resp:
        resp.read()


def send_email_mailru(to_email: str, to_name: str, subject: str, html: str):
    smtp_user = os.environ['SMTP_USER']
    smtp_pass = os.environ['SMTP_PASS']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"Квадро Ново <{smtp_user}>"
    msg['To'] = f"{to_name} <{to_email}>" if to_name else to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP('smtp.mail.ru', 587) as server:
        server.ehlo()
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())


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
        recipient_email = body.get('recipient_email', '').strip()
        recipient_name = body.get('recipient_name', '').strip()
        sender_name = body.get('sender_name', '').strip()
        amount = body.get('amount', 0)
        phone = body.get('phone', '').strip()

        if not recipient_email or not amount:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'ok': False, 'error': 'Укажите email и сумму'})
            }

        html = f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0B0F12;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#111418;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);">
    <div style="background:linear-gradient(135deg,#1a1f25 0%,#2a2f35 100%);padding:40px;text-align:center;">
      <div style="font-size:48px;margin-bottom:16px;">🎁</div>
      <h1 style="color:#fff;font-size:28px;margin:0 0 8px;">Подарочный сертификат</h1>
      <p style="color:rgba(255,255,255,0.5);margin:0;font-size:14px;">Квадро Ново · Туры на квадроциклах</p>
    </div>
    <div style="padding:40px;text-align:center;">
      {"<p style='color:rgba(255,255,255,0.6);font-size:16px;margin:0 0 24px;'>Специально для <strong style='color:#fff;'>" + recipient_name + "</strong></p>" if recipient_name else ""}
      {"<p style='color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 24px;'>С любовью от <strong style='color:rgba(255,255,255,0.8);'>" + sender_name + "</strong></p>" if sender_name else ""}
      <div style="background:linear-gradient(135deg,#fff 0%,#f0f0f0 100%);border-radius:16px;padding:32px;margin:24px 0;">
        <p style="color:#111;font-size:14px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Номинал сертификата</p>
        <p style="color:#111;font-size:48px;font-weight:800;margin:0;">{int(amount):,} ₽</p>
      </div>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 32px;">
        Выбери любой маршрут и сумма сертификата будет вычтена из стоимости тура.<br>
        Сертификат действует <strong style="color:#fff;">12 месяцев</strong> с момента выдачи.
      </p>
      <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin-bottom:32px;">
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;">Как воспользоваться</p>
        <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">Позвони нам или напиши в Telegram — назови этот email и мы подберём тур</p>
      </div>
      <a href="tel:+79184411331" style="display:inline-block;background:#fff;color:#111;text-decoration:none;font-weight:700;font-size:16px;padding:16px 40px;border-radius:12px;">+7 918 441-13-31</a>
      <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:32px 0 0;">г. Новороссийск · <a href="https://t.me/kvadronovo" style="color:rgba(255,255,255,0.4);">@kvadronovo</a></p>
    </div>
  </div>
</body>
</html>"""

        send_email_mailru(
            to_email=recipient_email,
            to_name=recipient_name or recipient_email,
            subject=f"Подарочный сертификат на {int(amount):,} ₽ — Квадро Ново",
            html=html
        )

        tg_text = (
            f"🎁 *Заказан подарочный сертификат*\n\n"
            f"💰 Сумма: {int(amount):,} ₽\n"
            f"📧 Email получателя: {recipient_email}"
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