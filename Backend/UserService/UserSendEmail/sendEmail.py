import smtplib
from email.mime.text import MIMEText
import boto3


def lambda_handler(event, context):
    for record in event['Records']:
        body = record['body'].split(',')
        sendEmail(body[1].strip(), body[0].strip())


def sendEmail(code, receiver):
    subject = "BookClub"
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("nirviks16@gmail.com", "qzambnsrlaguivjl")
    text = "Thanks for signing up to BookClub your code is {} ".format(code)
    message = 'Subject: {}\n\n{}'.format(subject, text)
    s.sendmail("nirviks16@gmail.com", receiver, message, subject)
    s.quit()
