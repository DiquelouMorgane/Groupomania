const Post = require('../models/post');
const fs = require('fs');

//Create a post//
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        //Copy the request fields, except the Id which will be generated with the database//
        ...postObject,
        //Create the picture URL//
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//Get all posts of database//
exports.getAllPost = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
};

//Get one of the posts//
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));
};

//Modify a post//
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//Delete a post//
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};