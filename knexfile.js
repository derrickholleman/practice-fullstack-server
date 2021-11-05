// create this file with npx knex init

require("dotenv").config(); // npm install dotenv
const path = require("path"); // path for migrations

const { NODE_ENV = "development", DATABASE_URL } = process.env;
const URL = NODE_ENV === "production" ? DATABASE_URL : DATABASE_URL;

module.exports = {
  development: {
    client: "postgresql",
    connection: URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
  production: {
    client: "postgresql",
    connection: URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};

// create a connection.js file in db folder

// npx knex migrate:latest - run all migrations
// npx knex seed:run - run all the seed files
