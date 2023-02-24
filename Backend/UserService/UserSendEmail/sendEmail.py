import smtplib
from email.mime.text import MIMEText


def lambda_handler(event, context):
    req_body = event["body"]
    receiver = req_body['Receiver']
    code = req_body['Code']
    sendEmail(code, receiver)


def sendEmail(code, receiver):
    subject = "BookClub"
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("sharmanirvik1@gmail.com", "lbyfxgdjvblkypbw")
    text = "Thanks for signing up to BookClub your code is {} ".format(code)
    message = 'Subject: {}\n\n{}'.format(subject, text)
    s.sendmail("sharmanirvik1@gmail.com", receiver, message, subject)
    s.quit()
