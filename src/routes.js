module.exports = app => {
  var router = require("express").Router();

  // Controllers
  const UserController = require('./controllers/UserController');

  // Routes
  // users
  router.get('/users', UserController.findAll);
  router.post("/users", UserController.create);
  router.get('/users/:id', UserController.findOne);

  app.use('/api', router);
};