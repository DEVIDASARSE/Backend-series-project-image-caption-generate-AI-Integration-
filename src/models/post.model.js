const mongoose = require('mongoose')
//schema are create new user
const postSchema = new mongoose.Schema({

    image: String,
    caption: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'// kon se collection se belong karta hai
    }

});
//

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;