const router = require('express').Router()

const AuthService = require('../services/auth-service')
const UserService = require('../services/user-service')
const isLoggedin = require('../middlewares/isLoggedin')

router.post('/register', async (req, res) => {
  if(await UserService.findByUsername(req.body.username)) {
    return res.status(409).send({message:'User already exist!'})
  }

  const user = await AuthService.register(req.body)
  res.send(user)
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  
  const user = await UserService.findByUsername(username)
  if(!user) return res.status(404).send({message:'No user exist!'})
  
  const validUser = await AuthService.login(user, password)
  if(!validUser) return res.status(404).send({message:'Username or password is incorrect!'})
  res.send(validUser)
})

router.post('/otologin', isLoggedin, async (req, res) => {
  res.send(req.userData)
})

module.exports = router