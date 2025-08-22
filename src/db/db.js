const mongoose = require("mongoose")


function connectDb() {
    
    mongoose.connect(process.env.MONGOOSE_URL)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((error) => {
            console.error("Database connection failed:", error);
        });
}

module.exports = connectDb;
