const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new Schema({
  _id: Number,
  System_Product_Name: String,
  System_Product_Code: String,
  System_Product_Category: String,
  System_Product_Branch: String,
  System_Product_Original: String,
  System_Product_Rating: Number,
  System_Product_Price: Number,
  System_Product_Pre_Price: Number,
  System_Product_Discount: Number,
  System_Product_Color: String,
  System_Product_Description: String,
  Status: Boolean,
  System_Product_Image: Array,
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  UpdateDate: {
    type: Date,
    default: Date.now,
  },
  UpdateBy: String,
  CreatedBy: String,
});

ProductSchema.plugin(AutoIncrement, { id: "product_seq", inc_field: "_id" });

const productModel = mongoose.model("System_Product", ProductSchema);

module.exports = productModel;
