const express = require("express");
const AuthenController = require("../controllers/AuthenController/AuthenController");

module.exports = function (app) {
  ////GET AUTH METHOD

  app.post("/login", AuthenController.handleLogin);
  app.post("/register", AuthenController.handleRegister);
};
