require('dotenv').config();

module.exports = {
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  API_KEY: process.env.API_KEY
};
