const mongoose = require('mongoose');

console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB connected successfully"))
    .catch((err) => console.error(" MongoDB connection error:", err));


// user schema
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post1'
    }]
});


const User = mongoose.model('user1', userSchema);
module.exports = User;