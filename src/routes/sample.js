const express = require('express')
const router = express.Router()
const controller = require('../controller/controller_sample')

router.post('/create', controller.create)
router.get('/get', controller.getAll)
router.get('/get/:id', controller.getById)
router.post('/get-kriteria', controller.getByIDKriteria)
router.put('/edit/:id', controller.updateOne)
router.delete('/delete/:id', controller.deleteOne)
router.get('/count', controller.getCount)

module.exports = router