const model = require('../model/bobot')
const { requestResponse } = require('../utils/index')

const create = async (data) => {
    await model.create(data)
    return { ...requestResponse.success, data: model }
}

const getAll = async () => {
    return await model.find()
}

const getById = async (condition) => {
    return model.findOne(condition)
}

const getByIdAspek = async ({ IDASPEK }) => {
    return model.find({ IDASPEK: IDASPEK })
}

const updateOne = async (condition, body) => {
    return model.updateOne(condition, body)
}

const deleteOne = (condition) => {
    return model.deleteOne(condition)
}

const getCount = (condition) => {
    return model.countDocuments(condition)
}

module.exports = {
    create,
    getAll,
    updateOne,
    getById,
    getByIdAspek,
    deleteOne,
    getCount
}