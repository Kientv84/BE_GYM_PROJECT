const userModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

module.exports.checkLogin = async function (email, password) {
  const user = await userModel.findOne({ System_UserEmail: email });

  if (!user) {
    return {
      success: 0,
      message: "Invalid user into the system!",
    };
  } else {
    const isCheckingPassword = await bcrypt.compare(
      password,
      user.System_User_Password
    );

    if (!isCheckingPassword) {
      return {
        success: 1,
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
        success: 1,
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
      success: 1,
      message: "Create user successfully",
      results,
    };
  } catch (er) {
    console.log("err", er);
  }
};
