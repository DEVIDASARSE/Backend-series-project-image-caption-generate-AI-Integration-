//api ke ander kya honga aur kaise honga uske liye kaam me aati hai

const userModel = require('../models/user.model');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//register for the user
async function registerController(req, res) {
    try {
        console.log('Request body:', req.body);
        const { username, password } = req.body;

        const isUserAlreadyExists = await userModel.findOne({ username });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await userModel.create({
            username,
            password: await bcrypt.hash(password, 10) 
        });

        const token = JWT.sign({ id: user._id }, "sec-key");

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

async function loginController(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                id: user._id
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


module.exports = {

    registerController,
    loginController
}



// async function registerController(req, res) {
//     const { username, password } = req.body;

//     const isUserAlreadyExists = await userModel.findOne({ username });

//     if (isUserAlreadyExists) {
//         return res.status(400).json({
//             message: "User already exists"
//         });
//     }

//     const user = await userModel.create({
//         username,
//         password: await bcrypt.hash(password, 10) // password hash
//     });

//     const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

//     res.cookie("token", token);

//     return res.status(201).json({
//         message: "User registered successfully",
//         user
//     });
// }


// async function loginController(req, res) {

//     const { username, password } = req.body;

//     const user = await userModel.findOne({
//         username
//     })

//     if(!user){
//          return res.status(400).json({
//             message:" User Not Found",
//             // user
//          })
//     }

// // const isPasswordValid = user.password === password; 
// const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password with the hash

// if (!isPasswordValid) {
//     return res.status(400).json({
//         message: "Invalid Password"
//     });

// }
//   const token = JWT.sign({id:user._id}, process.env.JWT_SECRET)

//   res.cookie("token", token)

//   return res.status(200).json({
//     message: "User logged in successfully",

//     user:{
//         username:user.username,
//         id: user._id
//     }
//   })

// }