const usersService = require("./users.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// LIST
async function list(req, res, next) {
  const data = await usersService.list();
  res.json(data);
}

// READ
async function read(req, res, next) {
  res.json(res.locals.user);
}

// CREATE
async function create(req, res, next) {
  const data = await usersService.create(req.body);
  res.status(201).json(data);
}

// UPDATE
async function update(req, res, next) {
  const { user } = res.locals;
  const updatedUser = {
    ...req.body,
    user_id: user.user_id,
  };
  const data = await usersService.update(updatedUser);
  res.json(data);
}

// DELETE
async function destroy(req, res, next) {
  const { user } = res.locals;
  await usersService.delete(user.user_id);
  res.sendStatus(204);
}

// ORDER BY AGE
async function orderByAge(req, res, next) {
  const data = await usersService.orderByAge();
  res.json({ average_age: data });
}

// VALIDATION
async function userExists(req, res, next) {
  const { userId } = req.params;
  const user = await usersService.read(userId);

  if (user) {
    res.locals.user = user;
    return next();
  } else {
    next({
      status: 404,
      message: "User not found",
    });
  }
}
const hasRequiredProperties = hasProperties("name", "email");

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
  create: [
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(userExists),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(userExists), asyncErrorBoundary(destroy)],
  orderByAge: [asyncErrorBoundary(orderByAge)],
};
