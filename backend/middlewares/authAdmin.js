module.exports = async (req, res, next) => {
    const user_id = req.body.user_id
    const isAdmin = req.body.isAdmin
    const author_user_id = req.body.user_id
  
    if (user_id === author_user_id || isAdmin === 1) {
      next()
    } else {
      res.send(401).json("Vous n'êtes pas habilité à réaliser cette action !")
    }
}