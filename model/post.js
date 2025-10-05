const mongoose = require('mongoose');

// user schema
const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user1',
        },
        date: { type: Date, default: Date.now },
        content: String,
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user1'
        }]
    
});


const Post = mongoose.model('Post1', postSchema);
module.exports = Post;