const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserService = require('./user-service')

class AuthService {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 8)
    user.password = hashedPassword
    const registeredUser = await UserService.add(user)
    const token = signToken({username: user.username})
    return {user: registeredUser, token}
  }
  async login(user, passwordInput) {
    const validUser = await bcrypt.compare(passwordInput, user.password)
    if(!validUser) throw 'No valid user!'

    const token = signToken({username: user.username})
    return {user, token}
  }
  check(token) {
      const decodedToken = jwt.verify(token, 'secretKey')
      if (!decodedToken) throw 'No token available!'
      return decodedToken
  }
}

const signToken = (payload) => {
  const token = jwt.sign({...payload, iat: Date.now()}, 'secretKey', {expiresIn: '1d'})
  return token
}

module.exports = new AuthService()