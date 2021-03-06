const router = require('express').Router()
const bcrypt = require('bcryptjs')

const UserService = require('../services/user-service')

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = await UserService.add({
        username: username,
        password: hashedPassword
    })
    res.send(user)
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await UserService.findByUsername(username)
    const validUser = await bcrypt.compare(password, user.password)
    if(validUser){
      res.send(user)
    }
    else { 
      res.status(404).send({message: 'Username or password not valid'}) }
})

module.exports = router