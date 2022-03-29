const db = require("../models");
const Comment = db.comments;
const User = db.users;

//Create a comment//
exports.createComment = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ["firstName", "lastName", "id"],
            where: {id: req.body.users_id},
        })
        console.log("User found !", user.dataValues)
        const comment = await Comment.create({
            content: req.body.content,
            users_id: req.body.users_id,
            post_id: req.body.users_id,
        })
        comment.dataValues.users = user.dataValues
        console.log("Comment created !", comment.dataValues)
        res.status(201).json({comment: comment})
    } catch {
        res.status(500).send({error: "Erreur serveur !"})
    }
};

//Delete a comment//
exports.deleteComment = async (req, res) => {
    const comment = await Comment.destroy({where: {id:req.body.id}})
    res.status(200).json({comment, message: "Commentaire supprimé !"})
};