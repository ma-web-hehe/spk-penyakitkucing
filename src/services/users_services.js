const model = require('../model/users')
const { requestResponse } = require('../utils/index')

let response

const create = async (data) => {
    const checkData = await model.findOne({ USERNAME: data.USERNAME }, { _id: false }, { lean: true })
    if (checkData !== null) {
        response = { ...requestResponse.unprocessable_entity }
        response.message = 'USERNAME TELAH TERDAFTAR'
        return response
    }

    if (data.PASSWORD !== data.CONFPASSWORD) {
        response = { ...requestResponse.unprocessable_entity }
        response.message = 'TOLONG KONFIRMASI PASSWORD ANDA'
        return response
    }

    await model.create(data)
    return { ...requestResponse.success, data: model }
}

const getAll = async (attributes) => {
    return await model.find({}, attributes, { _id: false }, { lean: false },)
}

const getById = async (attributes, condition) => {
    return model.findOne(condition, attributes)
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
    deleteOne,
    getCount
}