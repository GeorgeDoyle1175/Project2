// Importing the Sequelize library and loading environment variables from a .env file
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Checking if a JAWSDB_URL environment variable exists. If the JAWSDB_URL environment variable exists, create a Sequelize instance using the URL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
