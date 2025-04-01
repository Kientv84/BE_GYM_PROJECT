const ProductSchema = require('../../models/ProductModel')
const { checkBeforeGetAllProduct } = require("./ProductValidate");
const { checkBeforeCreate, checkBeforeUpdate } = require('../ProductController/ProductValidate')
const System_Product = require('../../models/ProductModel');
const requireProduct = require('../ProductController/ProductRequire')
const Ck_ConstantCommon = require('../../commons/Constant.Common');


module.exports.getAllProduct = async function (req, res) {

    console.log('đã vào product controller')

    const { limit, page,language  } = req.body
    
      const data = await this.checkBeforeGetAllProduct(limit, page, language);
    

    return res.status(200).json(data)
}

module.exports.create = async function (req, res) {
  const models = req.body

  const validation = requireProduct.requireProductFields(models);

  if (validation.success != Ck_ConstantCommon.CK_RESULTS.SUCCESS ) {
    return res.status(400).send(
      {
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: 'Missing required fields'
      }
    );
  } else {
    
    try {
      const checking = await checkBeforeCreate(models.System_Product_Code)

      if (checking != Ck_ConstantCommon.CK_RESULTS.SUCCESS) {
  
        return res.status(400).send({
          success: Ck_ConstantCommon.CK_RESULTS.DATA_EXIST,
          message: 'Product is existing'
        })
      } else {
        const newProduct = new System_Product(models)
  
        const result = await  newProduct.save()
  
        return res.status(200).json({
          success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
          message: 'create product successfully',
          data: result
        })
      }
    } catch(err) {
      return res.status(400).send({
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: 'Create product failed',
        error: err.message
      })
    }
  }
  
  
}

module.exports.update = async function(req, res) {
  const models = req.body

  const query = {_id: req.body._id}

  const validation = requireProduct.requireProductFields(models);

  if (validation.success != Ck_ConstantCommon.CK_RESULTS.SUCCESS) {
      return res.status(400).send({
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: "Missing required fields"
      })
  } else {


    const checking = await checkBeforeUpdate(models._id)
    console.log('checking',checking)
  
    if ( checking != Ck_ConstantCommon.CK_RESULTS.SUCCESS) {
      return {
        success: Ck_ConstantCommon.ERROR,
        message: 'update product fail'
      }
    } else {
  
      const queryUpdate = {
        System_Product_Name: models.System_Product_Name ,
        System_Product_Price: models.System_Product_Price,
        System_Product_Branch: models.System_Product_Branch,
        System_Product_Price: models.System_Product_Price,
      } 
  
      const newValues = { $set: queryUpdate }
  
      try {
        const updatedItem = await System_Product.findOneAndUpdate(query, newValues, { new: true });
    
        if (!updatedItem) {
          return res.status(404).json({
            success: Ck_ConstantCommon.CK_RESULTS.ERROR,
            message: "Product not found",
          });
        }
    
        return res.status(200).json({
          success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
          data: updatedItem,
        });
      } catch (err) {
        console.log("err", err);
        return res.status(500).send({
          success: Ck_ConstantCommon.CK_RESULTS.ERROR,
          data: err,
        });
      }
  }
  }
}