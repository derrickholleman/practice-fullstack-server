const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env]; // exported from knexfile.js
const knex = require("knex")(config);

module.exports = knex;
