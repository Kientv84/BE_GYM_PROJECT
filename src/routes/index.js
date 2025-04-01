const express = require('express')

module.exports = function(app) {
    console.log('đã vào route index')
    require('../routes/UserRouter')(app)
    require('../routes/AuthenRouter')(app)
    require('../routes/ProductRouter')(app)
}