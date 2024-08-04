require('dotenv').config()
const service = require('../services/diagnosa_services')
const serviceSample = require('../services/sample_services')
const logger = require('../utils/logger')
const { requestResponse } = require('../utils/index')
const { v4, validate: isUuid } = require("uuid");
const { buildDecisionTree, classify } = require('../utils/c45');

let response

const create = async (req, res) => {
    try {
        const shortId = v4().slice(0, 8)
        req.body.IDDIAGNOSA = shortId;
        const dataSample = await serviceSample.getAll()

        const mappingData = await mapData(dataSample)

        const attributes = Array.from(
            mappingData.reduce((acc, item) => {
                item.DAFTARGEJALA.forEach(gejala => {
                    acc.add(gejala.IDGEJALA);
                });
                return acc;
            }, new Set())
        ).map(IDGEJALA => ({ IDGEJALA }));

        const decisionTree = await buildDecisionTree(mappingData, attributes)

        const result = await classify(decisionTree, req.body)
        console.log(result)
        if (result === "Unknown") {
            response = { ...requestResponse.server_error }
        } else {
            req.body.IDPENYAKIT = result
            const data = await service.create(req.body)
            response = { ...data, result }
        }

    } catch (error) {
        logger.error(error)

    }
    res.json(response)
}

const mapData = (data) => {
    const result = [];

    data.forEach((item) => {
        let penyakit = result.find(p => p.IDPENYAKIT === item.IDPENYAKIT);

        if (!penyakit) {
            penyakit = { IDPENYAKIT: item.IDPENYAKIT, DAFTARGEJALA: [] };
            result.push(penyakit);
        }

        penyakit.DAFTARGEJALA.push({ IDGEJALA: item.IDGEJALA, VALUE: item.VALUE });
    });
    return result
};



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
        const data = await service.getById({ IDDIAGNOSA: req.params.id })
        response = { ...requestResponse.success, data }
    } catch (error) {
        logger.error(error)
        response = { ...requestResponse.server_error }
    }
    res.json(response)
}

const getByIdUser = async (req, res) => {
    try {
        const data = await service.getByIdUser({ IDUSER: req.params.id })
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
        const data = await service.deleteOne({ IDKRITERIA: req.params.id })
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
    getByIdUser,
    updateOne,
    deleteOne,
    getCount
}