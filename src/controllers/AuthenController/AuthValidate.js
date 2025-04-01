const userModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const Ck_ConstantCommon = require('../../commons/Constant.Common')
module.exports.checkLogin = async function (email, password) {
  const user = await userModel.findOne({ System_UserEmail: email });

  if (!user) {
    return {
      success: Ck_ConstantCommon.CK_RESULTS.DATA_EXIST,
      message: "Invalid user into the system!",
    };
  } else {
    const isCheckingPassword = await bcrypt.compare(
      password,
      user.System_User_Password
    );

    if (!isCheckingPassword) {
      return {
        success: Ck_ConstantCommon.CK_RESULTS.ERROR,
        message: "Wrong information of member",
      };
    } else {
      //////create jwb
      const payload = {
        email: user.System_UserEmail,
        name: user.System_User_Name,
      };

      const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return {
        success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
        access_token: access_token,
        data: {
          name: user.System_User_Name,
          email: user.System_UserEmail,
        },
      };
    }
  }
};

module.exports.checkBeforeRegister = async function (
  name,
  password,
  email,
  phone
) {
  console.log("đã vào hàm checkBeforeRegister");

  const hashPassword = await bcrypt.hash(password, saltRounds);
  console.log("hashPassword", hashPassword);

  try {
    let results = await userModel.create({
      System_User_Name: name,
      System_UserEmail: email,
      System_User_Password: hashPassword,
      System_User_PhoneNumber: phone,
      // System_User_birthday: birthday,
    });

    return {
      success: Ck_ConstantCommon.CK_RESULTS.SUCCESS,
      message: "Create user successfully",
      results,
    };
  } catch (er) {
    console.log("err", er);
  }
};
