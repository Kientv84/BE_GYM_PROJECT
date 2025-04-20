const productCategory = require("../../models/Product/ProductCategoryModel");
const Ck_ConstantCommon = require("../../commons/Constant.Common");

module.exports.checkBeforeCreate = async (model) => {
  try {
    const item = await productCategory.find({
      System_Product_category_Code: model.System_Product_Category_Code,
    });

    console.log("item", item);

    if (item.length > 0) {
      return {
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: "Product category created",
      };
    } else {
      return {
        success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
        message: "Product category does not create",
      };
    }
  } catch {}
};

module.exports.checkBeforeUpdate = async (models) => {
  const item = await productCategory.find({ _id: models._id });

  if (item.length > 0) {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
    };
  } else {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.ERROR,
    };
  }
};
