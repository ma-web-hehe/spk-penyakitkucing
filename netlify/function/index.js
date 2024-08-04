require('dotenv').config()

const http = require('http')
const logger = require('./src/utils/logger')
const app = require('./src/app')
const server = http.createServer(app)

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    server.listen(process.env.PORT, () => {
      logger.info(`SERVER RUNNING IN PORT ${process.env.PORT}`);
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: `Server running on port ${process.env.PORT}` })
      });
    });
  });
};
