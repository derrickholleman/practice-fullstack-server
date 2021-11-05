const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // origin: "*" to allow all sites to access
  })
);

const usersRouter = require("./users/users.router");

app.use("/users", usersRouter);

app.get('/', (req, res) => {
  res.send('Navigate to /users to see data!')
})

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// General Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

// server handling 
const { PORT = 5000 } = process.env;
const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);

module.exports = app;
