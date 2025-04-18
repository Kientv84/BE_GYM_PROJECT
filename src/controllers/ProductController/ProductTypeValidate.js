const Ck_ConstantCommon = require("../../commons/Constant.Common");
const productType = require("../../models/Product/ProductTypeModel");

module.exports.checkBeforeCreate = async function (model) {
  const query = {};
  query.System_Product_Type_Name = model.System_Product_Type_Name;

  try {
    const item = await productType.find(query);

    if (item.length > 0) {
      return {
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: "productType created",
      };
    } else {
      return {
        success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
        message: "productType valid to create",
      };
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports.checkBeforeUpdate = async function (models) {
  try {
    const items = await productType.find({
      _id: models._id,
    });

    if (items.length == 1) {
      return Ck_ConstantCommon.CK_RESULTS.SUCCESS;
    } else {
      return Ck_ConstantCommon.CK_RESULTS.ERROR;
    }
  } catch (err) {
    return Ck_ConstantCommon.CK_RESULTS.ERROR;
  }
};
