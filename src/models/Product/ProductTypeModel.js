const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductTypeSchema = new Schema({
  _id: Number,
  System_Product_Type_Name: String,
  System_Product_Type_Code: String,
  System_Product_Type_Description: String,
  Status: Boolean,
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

ProductTypeSchema.plugin(AutoIncrement, {
  id: "product_Type_seq",
  inc_field: "_id",
});

const productTypeModel = mongoose.model(
  "System_Product_Type",
  ProductTypeSchema
);

module.exports = productTypeModel;
