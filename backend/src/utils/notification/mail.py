from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib

from src.config import settings
from src.utils.notification.mail_content import meeting_notification_content
from src.repositories.auth_repository import AuthRepository


class Mail:

    @staticmethod
    def __send_mail(subject: str, content: str, recipient: str) -> None:
        with smtplib.SMTP_SSL("smtp.mail.ru", 465) as session:
            print(settings.mail.password)
            session.login(settings.mail.mail, settings.mail.password)

            msg = MIMEMultipart()
            msg["From"] = settings.mail.mail
            msg["To"] = recipient
            msg["Subject"] = subject
            msg.attach(MIMEText(content, "html"))

            try:
                session.send_message(msg)

            except smtplib.SMTPRecipientsRefused:
                raise ValueError('invalid mail')

            finally:
                session.quit()

    async def send_meeting_documentation(self, time_start: datetime.time, date_start: datetime.date):
        repo = AuthRepository()
        emails = await repo.all_users_email()
        content = meeting_notification_content.format(time_start=time_start, date=date_start)
        for email in emails:
            try:
                self.__send_mail('Уведомление', content, email)
            except Exception as e:
                print(f"mail error: {e}")