const requireProductType = require("../ProductController/ProductRequire");
const {
  checkBeforeCreate,
  checkBeforeUpdate,
} = require("../ProductController/ProductTypeValidate");
const Ck_ConstantCommon = require("../../commons/Constant.Common");
const productType = require("../../models/Product/ProductTypeModel");

module.exports.getAllType = async function () {};

module.exports.create = async function (req, res) {
  console.log("đã vào product type create");
  const models = req.body;

  const ProductTypeValidate =
    requireProductType.requireProductTypeFields(models);

  if (ProductTypeValidate.success == Ck_ConstantCommon.CK_RESULTS.SUCCESS) {
    const checking = await checkBeforeCreate(models);

    if (checking.success == Ck_ConstantCommon.CK_RESULTS.ERROR) {
      return res.status(400).json({
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: checking.message,
        errors: checking.errors,
      });
    } else {
      try {
        const newProductType = new productType(models);
        const result = await newProductType.save();

        return res.status(200).json({
          success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
          data: result,
        });
      } catch (error) {
        console.error("Lỗi khi tạo productType:", error);
        return res.status(500).json({
          success: Ck_ConstantCommon.CK_RESULTS.ERROR,
          message: "Internal server error",
        });
      }
    }
  } else {
    return res.status(400).json({
      success: Ck_ConstantCommon.CK_RESULTS.ERROR,
      message: ProductTypeValidate.message,
      errors: ProductTypeValidate.errors,
    });
  }
};

module.exports.update = async function (req, res) {
  const models = req.body;

  const query = { _id: models._id };

  const ProductTypeValidate =
    requireProductType.requireProductTypeFields(models);

  if (ProductTypeValidate.success == Ck_ConstantCommon.CK_RESULTS.ERROR) {
    return res.status(200).send({
      success: ProductTypeValidate.success,
      message: ProductTypeValidate.message,
    });
  } else {
    const isCheckBeforeUpdate = await checkBeforeUpdate(models);

    if (isCheckBeforeUpdate == Ck_ConstantCommon.CK_RESULTS.SUCCESS) {
    }
  }
};

module.exports.delete = async function () {};
