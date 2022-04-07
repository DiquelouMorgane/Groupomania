const db = require("../models");
const Post = db.posts;
const User = db.users;
const fs = require('fs');

//Create a post//
const createPost = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ["firstName", "lastName", "id"],
            where: {id: req.body.user_id},
        })
        if (user !== null) {
            console.log("user : ", user)
            let imageUrl
            if (req.file) {
                console.log("filename : ", req.file.filename)
                imageUrl = `http://localhost:5000/api/upload/${req.file.filename}`
            } else {
                imageUrl = null
            }
            const post = await Post.create({
                users_id: req.body.user_id,
                text_content: req.body.text_content,
                imageUrl: imageUrl,
            })
            res.status(201).json({post: post})
        } else {
            res.status(400).json({réponse: "L'utilisateur n'existe pas !"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: "Erreur serveur !"})
    }
};

//Get all posts of database//
const getAllPosts = async (req, res) => {
    try {
        Post.findAll({
            attributes: ["id", "text_content", "imageUrl", "createdAt", "users_id"],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.users,
                    as: "users",
                    attributes: ["firstName", "lastName", "id"],
                },
                {
                    model: db.comments,
                    include: [
                        {model: db.users, as: "users", attributes: ["firstName", "lastName"]},
                    ],
                    as: "comments",
                    attributes: ["id", "content", "post_id", "users_id", "createdAt"],
                },
            ],
        }).then(posts => {
            console.log("Posts : ", posts)
            res.json(posts)
        })
    } catch (error) {
        return res.status(500).send({
          error: "Une erreur est survenue lors de la récupération des posts !",
        })
    }
};

//Delete a post//
const deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({where: {id: req.body.id}})
        console.log("Post found : ", post)
        if (post.imageUrl) {
            const filename = post.imageUrl.split("/upload")[1]
            console.log("Filename to Delete: ", filename)
            fs.unlink(`upload/${filename}`, () => {
                Post.destroy({where: {id: req.body.id}})
                res.status(200).json({message: "Post et image supprimés !"})
            })
        } else {
            Post.destroy({where: {id: post.id}}, {truncate: true})
            res.status(200).json({message: "Post supprimé"})
        }
    } catch (error) {
        return res.status(500).send({error: "Erreur serveur !"})
    }
};

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
};