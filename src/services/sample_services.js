const model = require('../model/sample')
const { requestResponse } = require('../utils/index')

const create = async (data) => {
    const dataPenyakit = await model.findOne({ IDPENYAKIT: data.IDPENYAKIT, IDGEJALA: data.IDGEJALA })
    // console.log(dataPenyakit)

    // console.log(data)
    if (!dataPenyakit) {
        await model.create(data)
        // console.log('================================')
        return { ...requestResponse.success, data: model }
    }
    const update = await model.deleteOne({ IDPENYAKIT: data.IDPENYAKIT, IDGEJALA: data.IDGEJALA })
    // console.log(update)
    return { ...requestResponse.success, data: update }
}

const getAll = async () => {
    return model.find()
}

const getById = async (condition) => {
    return model.findOne(condition)
}

const getByIDKriteria = async ({ IDKRITERIA }) => {
    return await model.aggregate([
        {
            $match: {
                IDKRITERIA: {
                    $in: IDKRITERIA.idKriteria
                }
            }
        },
        {
            $lookup: {
                from: "pelamars",
                localField: "IDPELAMAR",
                foreignField: "_id",
                as: "dataUser"
            }
        },
        {
            $unwind: {
                path: '$dataUser',
                preserveNullAndEmptyArrays: true
            }
        }
    ]);
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
    getByIDKriteria,
    deleteOne,
    getCount
}