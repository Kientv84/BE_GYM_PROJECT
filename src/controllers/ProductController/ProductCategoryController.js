const productCategory = require("../../models/Product/ProductCategoryModel");
const productCategoryRequire = require("../../controllers/ProductController/ProductRequire");
const Ck_ConstantCommon = require("../../commons/Constant.Common");
const {
  checkBeforeCreate,
  checkBeforeUpdate,
} = require("./ProductCategoryValidate");

module.exports.create = async (req, res) => {
  const models = req.body;

  const isRequire = productCategoryRequire.requireProductCategory(models);

  if (isRequire.success == Ck_ConstantCommon.CK_RESULTS.ERROR) {
    return res.status(400).send({
      success: isRequire.success,
      message: isRequire.message,
    });
  } else {
    const isCheckingBeforeCreate = await checkBeforeCreate(models);

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

module.exports.update = async (req, res) => {
  const models = req.body;
  const _id = models._id;

  const isCheckingBeforeUpdate = await checkBeforeUpdate(models);

  console.log("isCheckingBeforeUpdate", isCheckingBeforeUpdate);

  if (isCheckingBeforeUpdate.success == Ck_ConstantCommon.CK_RESULTS.ERROR) {
    return {
      success: isCheckingBeforeUpdate.success,
    };
  } else {
    const query = { _id: _id };

    const newValuesUpdate = {
      System_Product_Category_Name: models.System_Product_Category_Name,
      System_Product_Category_Code: models.System_Product_Category_Code,
      System_Product_Category_Group: {
        Gender: models["System_Product_Category_Group.Gender"],
        Type: models["System_Product_Category_Group.Type"],
      },
    };

    const newValue = { $set: newValuesUpdate };

    try {
      const newProductCategory = await productCategory.findOneAndUpdate(
        query,
        newValue,
        { new: true }
      );

      if (!newProductCategory) {
        return res.status(400).send({
          success: Ck_ConstantCommon.CK_RESULTS.ERROR,
          message: "Update product fail",
        });
      } else {
        return res.status(200).json({
          success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
          data: newProductCategory,
        });
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật:", error);
      return res.status(500).json({
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: "Lỗi hệ thống khi cập nhật",
      });
    }
  }
};

module.exports.delete = async (req, res) => {};

module.exports.getAllCategory = async function () {};
