const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
require('dotenv').config();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model/user');
const Post = require('./model/post');

const cookieParser = require('cookie-parser');
const { log } = require('console');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/', async (req, res) => {


    const token = req.cookies.token;
    if (!token) {
        const posts = await Post.find().populate('user', 'username');
        res.render('index', { token: req.cookies.token, posts });
    }

    else {
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                const posts = await Post.find().populate('user', 'username');
                res.render('index', { token: req.cookies.token, posts });
            }
            req.user = decoded;
            const post = await Post.find().populate('user', 'username');
            //    console.log(post);
            const posts = post.filter(p => p.user._id.toString() !== decoded.user_id);
            // console.log(posts);
            res.render('index', { token: req.cookies.token, posts });
        });
    }
});

app.get('/register', (req, res) => {
    res.render('register', { token: req.cookies.token });
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, name, email, age, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        // console.log(user);
        if (user) { return res.status(400).send("Email already exists"); }




        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return res.status(500).send("Internal Server Error"); }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) { return res.status(500).send("Internal Server Error"); }


                const newUser = await User.create({
                    username: username,
                    name: name,
                    email: email,
                    age: age,
                    password: hash
                });

                jwt.sign({ email, user_id: newUser._id }, 'secret', { expiresIn: '11h' }, (err, token) => {
                    if (err) { return res.status(500).send("Internal Server Error"); }

                    res.cookie("token", token, { httpOnly: true });
                    res.status(201).send("User registered successfully");
                });

            });
        });
    }
    catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.get('/login', (req, res) => {
    res.render('login', { token: req.cookies.token });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) { return res.status(400).send("Invalid Credentials"); }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return res.status(400).send("Invalid Credentials"); }

        jwt.sign({ email, user_id: user._id }, 'secret', { expiresIn: '1h' }, (err, token) => {
            if (err) { return res.status(500).send("Internal Server Error"); }
            res.cookie("token", token, { httpOnly: true });
            res.redirect('/profile')
        });
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).send("Internal Server Error");
    }
});


app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});


app.get('/profile', isAuthenticated, async (res, req) => {

    const user = await User.findOne({ email: res.user.email });
    // console.log("a  " + user);

    const posts = await Post.find({ user: user._id })
    // console.log(posts);

    req.render('profile', { user, posts })
})


app.post('/create-post', isAuthenticated, async (res, req) => {
    try {
        const { post } = res.body;
        const user = await User.findOne({ email: res.user.email });


        let content = (post).replace(/\r\n/g, '\n');
        content = content.replace(/^[ \t]+/, '');

        const posts = await Post.create({
            content: content,
            user: user._id
        })

        // Update the user document to include the new post
        // console.log(posts);
        // console.log(user);
        user.posts.push(posts._id);
        await user.save();
        req.redirect('/profile');

    }
    catch (e) {
        console.log(e);
    }

})

app.post('/delete-post', isAuthenticated, async (res, req) => {
    const postid = res.body.id;
    //   console.log(postid);
    try {

        const deleted = await Post.findByIdAndDelete(postid);
        if (deleted) {
            const user = await User.findOne({ email: res.user.email });
            const posts = await Post.find({ user: user._id })
            req.render('profile', { user, posts })
        }

    }
    catch (e) {
        console.log(e.message);

    }



})



app.post('/api/like', isAuthenticated, async (req, res) => {

    try {

        console.log(req.body);
        const u_id = req.user.user_id;
        const post_id = req.body.post_id;

 const post = await Post.findById(post_id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (post.likes.includes(u_id)) {  
    post.likes = post.likes.filter(id => id.toString() !== u_id.toString());
  } else { 
    post.likes.push(u_id); 
  }

  await post.save();
  res.redirect('/');

// Save and update post

    
  

}catch (e) {
    console.log(e);

}
});

function isAuthenticated(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        res.redirect('/login');
    }

    else {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) { return res.status(401).send("Unauthorized"); }
            req.user = decoded;
            next();
        });

    }

};


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});