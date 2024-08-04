const router = require('express').Router()
const users = require('./users')
const gejala = require('./gejala')
const penyakit = require('./penyakit')
const diagnosa = require('./diagnosa')
const sample = require('./sample')

router.use('/user', users)
router.use('/gejala', gejala)
router.use('/penyakit', penyakit)
router.use('/diagnosa', diagnosa)
router.use('/sample', sample)

module.exports = router