import config from 'config';
import handlebars from 'handlebars';
import fs from 'fs';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(config.sendgrid.apiKey);

exports.sendMail = function(options) {
  fs.readFile(`${__dirname}/email-templates/${options.html}`, 'utf-8', (err, html) => {
    if (err) {
      console.log('Error when read html content');
      console.log(err);
    } else {
      let fnRenderHtml = handlebars.compile(html);
      sgMail.send({
        from: options.from || config.fromMail,
        to: options.to,
        subject: options.subject,
        html: fnRenderHtml(options.data)
      }, (err) => {
        if (err) {
          console.log(`Error when send email`);
          console.log(err);
        } else {
          console.log(`Sent email success`);
        }
      });
    }
  });
}