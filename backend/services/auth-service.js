const bcrypt = require('bcryptjs')
const UserService = require('./user-service')

class AuthService {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 8)
    user.password = hashedPassword
    const registeredUser = await UserService.add(user)
    return registeredUser
  }
  async login(user, passwordInput) {
    const validUser = await bcrypt.compare(passwordInput, user.password)
    if(validUser) return validUser
  }
}

module.exports = new AuthService()