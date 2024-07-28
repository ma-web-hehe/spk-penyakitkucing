require('dotenv').config()
const service = require('../services/sample_services')
const logger = require('../utils/logger')
const { requestResponse } = require('../utils/index')
const { v4, validate: isUuid } = require("uuid");

let response

const create = async (req, res) => {
    try {
        const dataInput = req.body
        for (let i = 0; i < dataInput.length; i++) {
            const data = await service.create(dataInput[i])
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
        const data = await service.getById({ IDUSER: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getByIDKriteria = async (req, res) => {
    try {
        const data = await service.getByIDKriteria({ IDKRITERIA: req.body })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const updateOne = async (req, res) => {
    try {
        const data = await service.updateOne({ IDUSER: req.params.id }, req.body)
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const deleteOne = async (req, res) => {
    try {
        const data = await service.deleteOne({ IDUSER: req.params.id })
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
    getAll,
    getById,
    getByIDKriteria,
    updateOne,
    deleteOne,
    getCount
}