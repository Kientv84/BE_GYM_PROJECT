const productCategory = require("../../models/Product/ProductCategoryModel");
const Ck_ConstantCommon = require("../../commons/Constant.Common");

module.exports.checkBeforeCreate = async (model) => {
  const code = model.System_Product_category_Code;
  try {
    const item = await productCategory.find({
      System_Product_category_Code: code,
    });

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
