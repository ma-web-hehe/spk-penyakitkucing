const model = require('../model/penyakit')
const { requestResponse } = require('../utils/index')

const create = async (data) => {
    await model.create(data)
    return { ...requestResponse.success, data: model }
}

const getAll = async () => {
    return await model.find({}, { _id: false }, { lean: false },)
}

const getById = async (condition) => {
    return model.findOne(condition)
}

const updateOne = async (condition, body) => {
    return model.updateOne(condition, body)
}

const deleteOne = async (condition) => {
    const deleteAspek = await model.deleteOne(condition)
    return { ...deleteAspek, deleteManyKriteria }
}

const getCount = (condition) => {
    return model.countDocuments(condition)
}

module.exports = {
    create,
    getAll,
    updateOne,
    getById,
    deleteOne,
    getCount
}