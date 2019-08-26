const express = require('express');

module.exports = (app) => {

  app.use('/users', app.controllers.register)
  const protectedRouter = express.Router();

  protectedRouter.use('/users', app.controllers.users);

}