const userModel = require("../../models/UserModel");
const { checkLogin, checkBeforeRegister } = require("./AuthValidate");

module.exports.handleLogin = async function (req, res) {
  const { email, password } = req.body;

  const data = await checkLogin(email, password);

  return res.status(200).json(data);
};

module.exports.handleRegister = async function (req, res) {
  console.log("đã vào handle register");

  const { name, password, email, phone } = req.body;

  const data = await checkBeforeRegister(name, password, email, phone);

  return res.status(200).json(data);
};
