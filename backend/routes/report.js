const router = require('express').Router()

const UserService = require('../services/user-service')
const ReportService = require('../services/report-service')

router.get('/all', async (req, res) => {
  const reports = await ReportService.findAll()
  res.render("data", {data: reports})
})

router.get('/all/json', async (req, res) => {
  const reports = await ReportService.findAll()
  res.send(reports)
})

router.get('/:id/json', async (req, res) => {
  const report = await ReportService.find(req.params.id)
  res.send(report)
})

router.post('/', async (req, res) => {
  const report = await ReportService.add(req.body)
  await UserService.post(report)
  res.send(report)
})

router.delete('/:id', async (req, res) => {
  const report = await ReportService.del(req.params.id)
  res.send(report)
})

module.exports = router