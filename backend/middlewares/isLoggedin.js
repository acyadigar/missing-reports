const AuthService = require('../services/auth-service')

const isLoggedin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = AuthService.check(token)
    req.userData = decodedToken
    next()
  } catch(err) {
    return res.status(401).send({
      message: 'Auth failed'
  })
  }
}

module.exports = isLoggedin