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
    dev: process.env.ENV
}