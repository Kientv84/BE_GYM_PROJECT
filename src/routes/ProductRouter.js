const express = require("express");
const productController = require("../controllers/ProductController/ProductController");
const productTypeController = require("../controllers/ProductController/ProductTypeController");
module.exports = function (app) {
  console.log("đã vào product router");
  app.get("product/getAll", productController.getAllProduct);
  app.post("/product/create", productController.create);
  app.post("/product/update", productController.update);
  app.delete("/product/delete", productController.delete);

  //// product type
  app.get("productType/getAll", productTypeController.getAllType);
  app.post("productType/create", productTypeController.create);
  app.post("/productType/update", productTypeController.update);
  app.delete("/productType/delete", productTypeController.delete);
};
