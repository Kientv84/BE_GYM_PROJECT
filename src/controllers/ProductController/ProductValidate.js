const mongoose = require("mongoose");
const product = require("../../models/Product/ProductModel");
const Ck_ConstantCommon = require("../../commons/Constant.Common");

module.exports.checkBeforeCreate = async function (code) {
  const query = {};
  query.System_Product_Code = code;

  try {
    const items = await product.find(query);
    if (items.length > 0) {
      return Ck_ConstantCommon.CK_RESULTS.DATA_EXIST;
    } else {
      return Ck_ConstantCommon.CK_RESULTS.SUCCESS;
    }
  } catch (err) {
    return Ck_ConstantCommon.CK_RESULTS.ERROR;
  }
};

module.exports.checkBeforeUpdate = async function (_id) {
  try {
    const items = await product.find({ _id: _id });

    if (items.length == 1) {
      return Ck_ConstantCommon.CK_RESULTS.SUCCESS;
    } else {
      return Ck_ConstantCommon.CK_RESULTS.ERROR;
    }
  } catch (err) {
    return Ck_ConstantCommon.CK_RESULTS.ERROR;
  }
};

// module.exports.checkBeforeGetAllProduct = () => {};
