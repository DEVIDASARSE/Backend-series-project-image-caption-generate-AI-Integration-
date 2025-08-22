const jwt = require('jsonwebtoken');// token ko varify karta hai 
const userModel = require('../models/user.model');// isme user ki details hoti hai

//check the token
async function authMiddleware (req, res, next) {
    const token = req.cookies.token;// check first

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access, please login first' });
    }
    // ager token hota bhi hai to ham sabse pahle varify karenge ki hamara hi token hai ya nhi aur use check karne badd use decode me save kar lete hai

    // isme ya to sahi ho saktaa hai ya wrong ho sakta hai isiliye hamtry aur catch ka use karte hai
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)// iske liye hame useeModel ko require karna padta hai

        // yaha per user ki id milengi 
        const user = await userModel.findOne({
            _id: decoded.id


        })
        req.user = user;//req me nayi property create karte hai
       next();


    } catch (err) {

        return res.status(401).json({
            message: " Invalid Token, please login again"
        })

    }


}


module.exports = authMiddleware;