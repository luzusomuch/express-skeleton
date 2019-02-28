import config from 'config';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(config.sendgrid.apiKey);

exports.sendMail = function(options) {
  sgMail.send({
    from: options.from || config.fromMail,
    to: options.to,
    subject: options.subject || 'test email',
    html: options.html || '<b>test email content</b>'
  }, function(err) {
    if (err) {
      console.log(`Error when send email`);
      console.log(err);
    } else {
      console.log(`Sent email success`);
    }
  });
}