const router = require('express').Router()
const bcrypt = require('bcryptjs')

const UserService = require('../services/user-service')

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body

    if(await UserService.findByUsername(username)) {
      return res.status(409).send({message:'User already exist!'})
    }

    const hashedPassword = await bcrypt.hash(password, 8)
    const user = await UserService.add({
        email: email,
        username: username,
        password: hashedPassword
    })
    res.send(user)
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await UserService.findByUsername(username)

    if(!user) return res.status(404).send({message:'No user exist!'})
    
    const validUser = await bcrypt.compare(password, user.password)
    if(validUser){
      res.send(user)
    }
    else { 
      res.status(404).send({message:'Username or password is incorrect!'}) }
})

module.exports = router