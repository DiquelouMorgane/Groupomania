const jwt = require('jsonwebtoken');
require("dotenv").config();

//Check if tokens are the same or not to authorize authentification, if it's not, it shows error//
module.exports = (req, res, next) => {
    //Retrieve the token in the header//
    const token = req.headers["authorization"]
    //Check it//
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
    const tokenId = decodedToken.userId
    //Compare with params//
    const userId = req.params("userId")
    console.log("userId : ", userId, "tokenId", tokenId)
    if (userId == tokenId || req.body.users_id == token) {
        console.log("Successfull authentification !")
        next()
    } else {
        if (!token) {
            throw "Il n'y a aucun token à vérifier !"
        }
        if (err) {
            res.json(err + "Problème lors de l'authentification !")
            console.log("Erreur serveur !")
        }
    }
};