const mongoose = require('mongoose')

const { Schema } = mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose)

const System_UserSchema = new Schema({
  _id: Number, 
  System_User_Avatar: [],
  System_User_Roles: Number,
  System_User_Code: String,
  System_User_Name: String,
  System_User_Password: String,
  CreateBy: String,
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  UpdateBy: String,
  UpdateDate: {
    type: Date,
    default: Date.now,
  },
  System_User_ChangePassword: Boolean,
  System_UserEmail: String,
  System_UserAddress: String,
  System_User_PhoneNumber: Number,
});

System_UserSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });

const userModel = mongoose.model("System_User", System_UserSchema);

module.exports = userModel;