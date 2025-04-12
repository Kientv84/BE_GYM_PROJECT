const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductCategorySchema = new Schema({
  _id: Number,
  System_Product_Category_Name: String,
  System_Product_Category_Code: String,
  System_Product_Category_Group: {
    Gender: {
      type: String,
      ref: "system_gender",
      trim: true,
    },
    Type: {
      type: String,
      ref: "system_product_type",
      trim: true,
    },
  },
  System_Product_Category_Description: String,
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

ProductCategorySchema.plugin(AutoIncrement, {
  id: "product_category_seq",
  inc_field: "_id",
});

const productCategoryModel = mongoose.model(
  "System_Product_Category",
  ProductCategorySchema
);

module.exports = productCategoryModel;
