const express = require('express')
const router = express.Router()

const UserService = require('../services/user-service')

router.get('/all', async (req, res) => {
    const users = await UserService.findAll()
    res.render("data", {data: users})
})

router.get('/all/json', async (req, res) => {
    const users = await UserService.findAll()
    res.status(202).send(users)
})

router.get('/:id', async (req, res) => {
    const user = await UserService.findByUsername(req.params.id)
    if (!user) res.status(404)
    res.render('item', { data: user })
})

router.get('/:id/json', async (req, res) => {
    const user = await UserService.findByUsername(req.params.id)
    if (!user) res.status(404)
    res.send(user)
})

router.delete('/:id', async (req, res) => {
    const user = await UserService.del(req.params.id)
    res.send(user)
})

module.exports = router