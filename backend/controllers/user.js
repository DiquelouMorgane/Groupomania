const User = require("../models/");
const User = db.users;

//Modify a user//
const updateUser = async (req, res) => {
    try {
        let user = await User.findOne({where: {id: req.body.id}})
        console.log("User found : ", user.dataValues)
        if (req.body.email) {
            user.email = req.body.email
            console.log("Old email : ", user.email)
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName
            console.log("Old firstname : ", user.firstName)
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName
            console.log("Old lastname : ", user.lastName)
        }
        try {
            user.save({})
            console.log("New infos user : ", user)
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
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.body.id}})
        console.log("User to delete : ", user.dataValues)
        User.destroy({where: {id: user.id}})
        res.status(200).json({message: "Utilisateur supprimé !"})
    } catch (error) {
        return res.status(500).send({error: "Erreur serveur !"})
    }
};