const mongoose = require('mongoose')
require("dotenv").config();

const CONNECTION_URL = process.env.CONNECTION_URL

async function ConnectDB() {
    try {
     await mongoose.connect(CONNECTION_URL);
      console('Kết nối đến database thành công') 
    } catch (err) {
        console.log("Kết nối đến database thành công");
    }
}

module.exports = { ConnectDB }