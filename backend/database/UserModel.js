const mongoose = require("mongoose");
const vehicleSchema =require('./VehicleModel')
const userSchema = new mongoose.Schema({
  email:{
type:String
  },
  password:{
    type:String

  },
  Vehicle:[vehicleSchema]
})

const User = mongoose.model("User", userSchema);
module.exports = User
