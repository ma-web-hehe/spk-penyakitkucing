require('dotenv').config()
const service = require('../services/users_services')
const logger = require('../utils/logger')
const { requestResponse } = require('../utils/index')
const { v4, validate: isUuid } = require("uuid");

let response

const create = async (req, res) => {
    try {
        req.body.IDUSER = v4();
        const data = await service.create(req.body)
        response = { ...data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getAll = async (req, res) => {
    try {
        const attributes = {
            USERNAME: 1,
            NAME: 1,
            ROLE: 1,
            CREATED_AT: 1,
        }
        const data = await service.getAll(attributes)
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getById = async (req, res) => {
    try {
        const attributes = {
            IDUSER: 1,
            NAME: 1,
            EMAIL: 1,
            ALAMAT: 1,
            NO_TELP: 1,
            ROLE: 1,
        }
        const data = await service.getById(attributes, { IDUSER: req.params.id })
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
    updateOne,
    deleteOne,
    getCount
}