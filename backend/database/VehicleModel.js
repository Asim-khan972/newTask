const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    carModel:{
        type:String
    },
    price:{
        type:Number

    },
    phoneNumber:{
        type:String

    },numPictures:{
        type:Number

    },
    pictures:{
        type:[String]
    },
    city:{
        type:String
    }
  
});

module.exports = vehicleSchema;
