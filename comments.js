// Create web server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Connect to db
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.send(comments);
    });
});

app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save().then(() => {
        res.send(comment);
    });
});

app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id).then((comment) => {
        res.send(comment);
    });
});

// Listen
app.listen(3000);