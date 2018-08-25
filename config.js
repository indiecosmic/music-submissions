var dotenv = require('dotenv');
dotenv.load();

module.exports = {
    database: process.env.MONGODB_URI,
    dev: process.env.ENV,
    postmarkApiToken: process.env.POSTMARK_API_TOKEN,
    senderEmailAddress: process.env.SENDER_EMAIL_ADDRESS,
    recipientEmailAddress: process.env.RECIPIENT_EMAIL_ADDRESS,
    notificationTemplateId: process.env.NOTIFICATION_TEMPLATE_ID,
    thankYouEmailTemplateId: process.env.THANKYOUEMAIL_TEMPLATE_ID,
    gaTrackingId: process.env.GA_TRACKING_ID
}