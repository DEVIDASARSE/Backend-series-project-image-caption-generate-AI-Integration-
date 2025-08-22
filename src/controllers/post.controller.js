const postModel = require('../models/post.model');
const { generateCaption } = require("../service/ai.service");

async function createPostController(req, res) {
    try {
        const file = req.file;
        console.log("File received:", file);
//check the file 
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Convert the uploaded image to Base64
        const base64Image = Buffer.from(file.buffer).toString('base64');

        // Generate caption using AI service
        const caption = await generateCaption(base64Image);

        console.log("Generated caption:", caption);
      

        // Save post to DB (optional if you want to store)
        const newPost = await postModel.create({
            image: base64Image,
            caption,
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        console.error("Error in createPostController:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    createPostController
};
