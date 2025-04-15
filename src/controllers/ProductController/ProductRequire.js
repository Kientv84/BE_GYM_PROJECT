const Ck_ConstantCommon = require("../../commons/Constant.Common");

const requireProductFields = (productData) => {
  const requiredFields = [
    "System_Product_Name",
    "System_Product_Code",
    "System_Product_Price",
  ];

  const missingFields = requiredFields.filter((field) => !productData[field]);

  if (missingFields.length > 0) {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.ERROR,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    };
  } else {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
    };
  }
};

const requireProductTypeFields = (productTypeData) => {
  const requiredFields = [
    "System_Product_Type_Name",
    "System_Product_Type_Code",
  ];

  const missingFields = requiredFields.filter(
    (field) => !productTypeData[field]
  );

  if (missingFields.length > 0) {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.ERROR,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    };
  } else {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
    };
  }
};

module.exports = {
  requireProductFields,
  requireProductTypeFields,
};
