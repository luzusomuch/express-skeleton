const host = process.env.DB_HOST || 'localhost';

module.exports = {
  server: {
    port: 9000
  },
  database: {
    url: `mongodb://${host}/node-express-skeleton-dev`,
    properties: {
      useMongoClient: true
    }
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInMinutes: 2880
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10
  },
  mailgun: {
    auth: {
      api_key: '4771bade43460861d836f07ec1dc80fb-7caa9475-1cafa14d',
      domain: 'sandboxb33dfa79ddac4632b456e127b5c64f9c.mailgun.org'
    }
  },
  fromMail: 'luzusomuch@gmail.com',
  sendgrid: {
    apiKey: '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',
    senderName: 'Vinh Nguyen',
    emailTemplates: {
      signUp: 'd-725d9f44be304715a828b028546eec7c'
    }
  },
  frontendURL: 'localhost:3000'
};
