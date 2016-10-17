module.exports = {
    database: process.env.MONGODB_URI,
    databaseOptions: {
        server: {
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 30000
            }
        }
    },
    dev: process.env.ENV,
    postmarkApiToken: process.env.POSTMARK_API_TOKEN,
    senderEmailAddress: process.env.SENDER_EMAIL_ADDRESS,
    recipientEmailAddress: process.env.RECIPIENT_EMAIL_ADDRESS,
    notificationTemplateId: process.env.NOTIFICATION_TEMPLATE_ID,
    confirmationTemplateId: process.env.CONFIRMATION_TEMPLATE_ID
}