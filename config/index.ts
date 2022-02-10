const path = require('path');
require('dotenv').config({ path: path.join(`${__dirname}../../../`, '.env') });

module.exports = {
  /**
   * App Configs
   */
  app: {
    env: process.env.NODE_ENV || 'development',
    port: +process.env.APP_PORT || 3000,
    name: process.env.APP_NAME || 'lesson',
    version: process.env.APP_VERSION || '1.0.0',
  },

  /**
   * Database Configs
   */
  db: {
    name: process.env.DB_NAME || 'lesson',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  },
};
