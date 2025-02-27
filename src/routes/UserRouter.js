const express = require("express");
const UserHandler = require("../controllers/UserController/UserController");

module.exports = function (app) {
  ////GET USER METHOD
  app.get("/user", UserHandler.getAllUser);
};
