require('dotenv').config()
const service = require('../services/gejala_services')
const logger = require('../utils/logger')
const xlsx = require('xlsx')
const { v4, validate: isUuid } = require("uuid");
const { requestResponse } = require('../utils/index')

let response

const create = async (req, res) => {
    try {
        const shortId = v4().slice(0, 8)
        req.body.IDGEJALA = shortId;
        const data = await service.create(req.body)
        response = { ...data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const createExcel = async (req, res) => {
    try {
        const file = req.file

        if (!file) {
            return res.status(400).send("Masukkan File")
        }

        const workbook = xlsx.read(file.buffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        const dataJson = xlsx.utils.sheet_to_json(sheet)
        // const processedData = dataJson.map(row => {
        //     const newRow = {
        //         NAME: row.NAME,
        //         EMAIL: row.EMAIL,
        //         AGE: row.AGE,
        //         ADDRESS: row.ADDRESS,
        //         id: v4()
        //     };

        //     Object.keys(row).forEach(key => {
        //         if (!['NAME', 'EMAIL', 'AGE', 'ADDRESS'].includes(key)) {
        //             const [category, subKey] = key.split('.');
        //             if (!newRow[category]) {
        //                 newRow[category] = {};
        //             }
        //             newRow[category][subKey] = row[key];
        //         }
        //     });

        //     return newRow;
        // });

        for (let i = 0; i < dataJson.length; i++) {
            const data = await service.create(dataJson[i])
            response = { ...data }
        }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getAll = async (req, res) => {
    try {
        const data = await service.getAll()
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getById = async (req, res) => {
    try {
        const data = await service.getById({ IDGEJALA: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const updateOne = async (req, res) => {
    try {
        const data = await service.updateOne({ IDGEJALA: req.params.id }, req.body)
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const deleteOne = async (req, res) => {
    try {
        const data = await service.deleteOne({ IDGEJALA: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getCount = async (req, res) => {
    try {
        const data = await service.getCount()
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

module.exports = {
    create,
    createExcel,
    getAll,
    getById,
    updateOne,
    deleteOne,
    getCount
}