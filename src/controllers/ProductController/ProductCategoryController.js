const productCategory = require("../../models/Product/ProductCategoryModel");
const {
  requireProductCategory,
} = require("../../controllers/ProductController/ProductRequire");
const Ck_ConstantCommon = require("../../commons/Constant.Common");
const { checkBeforeCreate } = require("./ProductCategoryValidate");

module.exports.create = async (req, res) => {
  const models = req.body;

  const isRequire = requireProductCategory(models);
  console.log("isRequire", isRequire);

  if (isRequire.success == Ck_ConstantCommon.CK_RESULTS.ERROR) {
    return res.status(400).send({
      success: isRequire.success,
      message: isRequire.message,
    });
  } else {
    const isCheckingBeforeCreate = await checkBeforeCreate(models);
    console.log("isCheckingBeforeCreate", isCheckingBeforeCreate);

    if (isCheckingBeforeCreate.success == Ck_ConstantCommon.CK_RESULTS.ERROR) {
      return res.status(400).send({
        success: isCheckingBeforeCreate.success,
        message: isCheckingBeforeCreate.message,
      });
    } else {
      const newProductCategory = new productCategory(models);

      try {
        const result = await newProductCategory.save();

        if (result) {
          return res.status(200).json({
            success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
            data: result,
          });
        } else {
          return res.status(400).send({
            success: Ck_ConstantCommon.CK_RESULTS.ERROR,
            message: "create product category fail",
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  }
};

module.exports.update = async (req, res) => {};

module.exports.delete = async (req, res) => {};

module.exports.getAllCategory = async function () {};
