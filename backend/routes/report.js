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
  .catch(() => {
    return res.status(404).send({message:'No report found!'})
  })
  res.send(report)
})

router.get('/locations', async (req, res) => {
  const reports = await ReportService.findAll()
  const reportLocations = reports.map(report => `${report.location}`)
  res.send(reportLocations)
})

router.post('/', async (req, res) => {
  const report = await ReportService.add(req.body)
  await UserService.post(report)
  res.send(report)
})

router.patch('/:id', async (req, res) => {
  await ReportService.update(req.params.id, req.body)
  const updatedReport = await ReportService.find(req.params.id)
  res.send(updatedReport)
})

router.delete('/:id', async (req, res) => {
  const report = await ReportService.del(req.params.id)
  res.send(report)
})

module.exports = router