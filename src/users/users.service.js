const knex = require("../db/connection");

// LIST
function list() {
  return knex("users").select("*").orderBy("user_id");
}

// READ
function read(user_id) {
  return knex("users").select("*").where({ user_id }).first();
}

// CREATE
function create(user) {
  return knex("users")
    .insert(user, "*")
    .then((newUser) => newUser[0]);
}

// UPDATE
function update(updatedUser) {
  return knex("users")
    .where({ user_id: updatedUser.user_id })
    .update(updatedUser, "*")
    .then((updatedUser) => updatedUser[0]);
}

// DELETE
function destroy(user_id) {
  return knex("users").select("*").where({ user_id }).del();
}

module.exports = {
  list,
  read,
  create,
  update,
  delete: destroy
};
