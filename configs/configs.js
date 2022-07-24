const DB_USER = process.env.MONGO_INIT_DB_ROOT_USERNAME;
const DB_PASSWORD = process.env.MONGO_INIT_DB_ROOT_PASSWORD;
const DB_NAME = process.env.MONGO_INITDB_DATABASE;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
    DB_USER, DB_PASSWORD, DB_NAME, DB_HOST,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    MONGO_URL: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
}
