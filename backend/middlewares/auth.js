const jwt = require('jsonwebtoken');

//Check if tokens are the same or not to authorize authentification, if it's not, it shows error//
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, 'Token');
        const userId = decodedToken.userId;
        /*if (req.body.userId && req.body.userId !== userId) {
           throw 'User ID non valable !'; 
        } else {
            next();
        }*/
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};