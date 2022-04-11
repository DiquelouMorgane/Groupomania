const db = require("../models");
const User = db.users;

//Modify a user//
const updateUser = async (req, res) => {
    try {
        let user = await User.findOne({where: {id: req.body.id}})
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName
        }
        try {
            user.save({})
            res.status(200).json({
                user: user,
                backMessage: "Votre profil a bien été mis à jour !",
            })
        } catch (error) {
            return res 
            .status(500)
            .send({error: "Erreur los de la mise à jour du profil !"})
        }
    } catch (error) {
        return res.status(500).send({error: "Erreur serveur !"})
    }
};

//Delete a user//
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.body.id}})
        User.destroy({where: {id: user.id}})
        res.status(200).json({message: "Utilisateur supprimé !"})
    } catch (error) {
        return res.status(500).send({error: "Erreur serveur !"})
    }
};

module.exports = {
    updateUser,
    deleteUser,
};