const User = require('../models/user');
const fs = require('fs');

//Get all users of database//
exports.getAllUser = (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}))
};

//Get one of the users//
exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({error}));
};

//Modify a user//
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
    {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//Delete a user//
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(user => {
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            User.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};