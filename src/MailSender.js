const nodemailer = require('nodemailer');
const config = require('../utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Playlist Apps',
      to: targetEmail,
      subject: 'Playlist Export',
      text: 'The result of the Playlist Export is attached here',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
