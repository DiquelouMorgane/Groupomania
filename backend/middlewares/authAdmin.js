module.exports = async (req, res, next) => {
    const userId = req.body.userId
    const admin = req.body.admin
    const author_userId = req.body.userId
  
    if (userId === author_userId || admin === 1) {
      next()
    } else {
      res.send(401).json("Vous n'êtes pas habilité à réaliser cette action !")
    }
}