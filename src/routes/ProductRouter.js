const express = require('express')
const productController = require('../controllers/ProductController/ProductController')

module.exports = function(app) { 
    console.log('đã vào product router')
    app.get("/getAllProduct", productController.getAllProduct)
    app.post("/product/create", productController.create)
    app.post("/product/update", productController.update)
}