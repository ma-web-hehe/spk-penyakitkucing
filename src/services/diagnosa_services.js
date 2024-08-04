const model = require('../model/diagnosa')
const { requestResponse } = require('../utils/index')

const create = async (data) => {
    // console.log(data)
    await model.create(data)
    return { ...requestResponse.success, data: model }
}

const getAllHistory = async (attributes) => {
    return await model.find({}, attributes)
}

const getAll = async () => {
    return await model.aggregate([
        {
            $lookup: {
                from: 'penyakits',
                localField: 'IDPENYAKIT',
                foreignField: 'IDPENYAKIT',
                as: 'DATA_PENYAKIT'
            },
        },
        {
            $unwind: {
                path: '$DATA_PENYAKIT',
                preserveNullAndEmptyArrays: true
            }
        }
    ])
}

const getById = async (condition) => {
    return model.findOne(condition)
}

const getByIdUser = async ({ IDUSER }) => {
    // console.log(IDUSER)
    return await model.aggregate([
        {
            $match: {
                IDUSER: IDUSER
            }
        },
        {
            $lookup: {
                from: 'penyakits',
                localField: 'IDPENYAKIT',
                foreignField: 'IDPENYAKIT',
                as: 'DATA_PENYAKIT'
            },
        },
        {
            $unwind: {
                path: '$DATA_PENYAKIT',
                preserveNullAndEmptyArrays: true
            }
        }
    ])
    // return model.find({ IDUSER: IDUSER })
}

const updateOne = async (condition, body) => {
    return model.updateOne(condition, body)
}

const deleteOne = (condition) => {
    return model.deleteOne(condition)
}

const getCount = () => {
    return model.countDocuments()
}

module.exports = {
    create,
    getAll,
    updateOne,
    getById,
    getByIdUser,
    deleteOne,
    getCount,
    getAllHistory
}