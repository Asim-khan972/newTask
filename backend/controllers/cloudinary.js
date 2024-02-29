const cloudinaryModule=require('cloudinary')

const cloudinary = cloudinaryModule.v2;

// Configuration 
cloudinary.config({
    cloud_name: "dxgyi17ff",
    api_key: "164356593979646",
    api_secret: "5doloLLkpYfrwV0jJaOCytslmC4"
  });
  
  module.exports=cloudinary
