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

const requireProductCategory = (dataProductCategory) => {
  const requiredFields = [
    "System_Product_Category_Name",
    "System_Product_Category_Code",
    "System_Product_Category_Group",
  ];

  const missingFields = requiredFields.filter((field) => {
    !dataProductCategory[field];
  });

  if (missingFields) {
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
  } else {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.ERROR,
      message: "Xảy ra lỗi trong quá trình ràng buộc dữ liệu",
    };
  }
};

module.exports = {
  requireProductCategory,
  requireProductFields,
  requireProductTypeFields,
};
