const User=require('../database/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//creating token
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '100days' });
    
}


//Registration Controller

const userSignup = async (req, res) => {
    try {
        const {  email, password } = req.body;
        let emptyFields = [];

        if (!email) {
            emptyFields.push('email');
        }

        if (!password) {
            emptyFields.push('password');
        }

        if (emptyFields.length > 0) {
            return res.status(400).json({ message: 'Please fill in all the fields', emptyFields });
        }

        if(!email){
            return res.status(400).json({
                message: `Email is required`,
            });
        }
        if(!password){
            return res.status(400).json({
                message: `Password is required`,
            });
        }

       

        // Check if an admin with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: `User with email: ${email} already exists`,
            });
        }

        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Creating a token
        const token = createToken(newUser._id);

        res.status(200).json({ message: `${email} registered successfully!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login  Controller

const userLogin = async (req,res) => {
    
    try {
        const { email, password } = req.body
  let emptyFields = []

        if (!email) {
    emptyFields.push('email')
        }
        if (!password) {
    emptyFields.push('password')
      
    }
    
    if(!email){
        return res.status(400).json({
            message: `Email is required`,
        });
    }
    if(!password){
        return res.status(400).json({
            message: `Password is required`,
        });
    }

      if(emptyFields.length > 0) {
          return res.status(400).json({ message: 'Please fill in all the fields', emptyFields })
        }

        const user = await User.findOne({email})
        if (!user) {
            res.status(400).json({ message: "Account not Found" })
        }
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = createToken(user._id)
                res.status(200).json({
                    message: `Welcome ${email}`,
                    token
                })
            } else {
                res.status(400).json({ message: "Invalid Credentials" })
            }
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports={userSignup,userLogin}