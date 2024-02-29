const User=require('../database/UserModel')
const cloudinary = require('./cloudinary');

//Vehicle Controller

const addVehicle = async (req, res) => {
    try {
       
const userId=req.user._id
        // Check if an admin with the same email already exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({
                message: `User not found`,
            });
        }

        if(existingUser){
            const {carModel,price,phone,city,numPictures,pictures} = req.body;
            let pictureArray=[]
            if(pictures.length>0){
                for(const picture of pictures){
                    let uploadImage;
                    try {
                        uploadImage = await cloudinary.uploader.upload(picture, {
                          upload_preset: 'asim',
                        });
                         pictureArray.push(uploadImage.secure_url)
                      } catch (uploadError) {
                        return res.status(500).json({ message: 'Error uploading image ' });
                      }
                } 
            }

            const newVehicle={
                carModel,price,phone,city,numPictures,pictures:pictureArray
            }

            existingUser.Vehicle.push(newVehicle)
            await existingUser.save()
        }

        
        res.status(200).json({ message: `vehicle added successfully!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getVehicle=async(req,res)=>{

    try {
       
        const userId=req.user._id
                // Check if an admin with the same email already exists
                const existingUser = await User.findById(userId);
                if (!existingUser) {
                    return res.status(400).json({
                        message: `User not found`,
                    });
                }
        
                if(existingUser){
                   const vehicles=existingUser.Vehicle
                res.status(200).json({data:vehicles});
        
                    
                }
        
                
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
}


module.exports={addVehicle,getVehicle}