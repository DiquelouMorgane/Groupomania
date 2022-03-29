const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//Create a new user with security password hash//
module.exports.signup = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
    }
    try {
        const user = await User.findOne({
            where: {email: req.body.email},
        })
        if (user) {
            console.log("Already registered", user.dataValues)
            return res.status(403).send({error: "Vous êtes déjà inscrit !"})
        } else {
            const user = await User.create(newUser)
            res.status(200).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: jwt.sign({userId: user.id}, process.env.SECRET_JWT, {
                    expiresIn: "24h",
                }),
            })
        }
    } catch (error) {
        return res.status(500).send({error: "Erreur Serveur !"})
    }
};

//Find user in database and check the infos (mail and password) to compare them with infos taped, with a secure secret token//
module.exports.login = (req, res) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email},
        })
        if (user == null) {
            return res.status(403).send({error: "Vous n'êtes pas encore inscrit !"})
        } else {
            console.log("User found !", user.dataValues)
            const valid = await bcrypt.compare(req.body.password, user.password)
            if (!valid) {
                return res.status(401).json({error: "Mot de passe incorrect !"})
            } else {
                res.status(200).json({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    admin: user.admin,
                    token: jwt.sign({userId: user.id}, process.env.SECRET_JWT, {
                        expiresIn: "24h",
                    }),
                })
            }
        }
    } catch (error) {
        return res.status(500).send({error: "Erreur serveur !"})
    }
};