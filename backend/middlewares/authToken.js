const jwt = require('jsonwebtoken');

//Check if tokens are the same or not to authorize authentification, if it's not, it shows error//
module.exports = (req, res, next) => {
    //Retrieve the token in the header//
    try {
        const token = req.headers["authorization"]
        //Check it//
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
        const userId = decodedToken.userId
        //Compare with params//
        if (userId && req.body.user_id && userId !== req.body.user_id){
            res.json("Problème lors de l'authentification !")
        } else {
            next()
        }
    } catch( error ) {
        res.status(401).send('Unauthorized !')
    }
};