import smtplib
from email.mime.text import MIMEText
import boto3
sqs = boto3.client('sqs', region_name="us-west-2", aws_access_key_id="AKIAQXARKCPURJKEVTNY",
                   aws_secret_access_key="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")

queue_url = "https://sqs.us-west-2.amazonaws.com/049428435945/EmailQueue"

response = sqs.receive_message(
    QueueUrl=queue_url,
    AttributeNames=[
        'SentTimestamp'
    ],
    MaxNumberOfMessages=1,
    MessageAttributeNames=[
        'All'
    ],
    VisibilityTimeout=0,
    WaitTimeSeconds=0
)

message = response['Messages'][0]
receipt_handle = message['ReceiptHandle']


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
    sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=receipt_handle)
