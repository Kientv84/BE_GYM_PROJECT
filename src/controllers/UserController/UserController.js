const UserModel = require("../../models/Product/ProductModel");

//// GET ALL USER
exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    console.log("users", users);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
        data: [],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Get all users in to the system",
        data: users,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
