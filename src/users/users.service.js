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
    .insert(user)
    .returning("*")
    .then((newUser) => newUser[0]);
}

// UPDATE
function update(updatedUser) {
  return knex("users")
    .select("*")
    .where({ user_id: updatedUser.user_id })
    .update(updatedUser)
    .returning("*")
    .then((updatedUser) => updatedUser[0]);
}

// DELETE
function destroy(user_id) {
  return knex("users").select("*").where({ user_id }).del();
}

// ORDER BY AGE
function orderByAge() {
  return knex("users")
    .avg("age as average_age")
    .then((res) => {
      const data = Number(res[0].average_age);
      return data.toFixed(0);
    });
}

module.exports = {
  list,
  read,
  create,
  update,
  delete: destroy,
  orderByAge,
};
