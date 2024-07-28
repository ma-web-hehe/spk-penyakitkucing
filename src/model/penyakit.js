const mongoose = require('mongoose')
const collectionName = 'penyakit'

const schema = new mongoose.Schema(
    {
        IDPENYAKIT: {
            type: String,
        },
        PENYAKIT: {
            type: String,
        },
        PENYEBAB: {
            type: String
        },
        SOLUSI: {
            type: String
        },
        CREATED_AT: {
            type: Date,
            default: () => new Date()
        },
        UPDATED_AT: {
            type: Date,
            default: () => new Date()
        }
    }
)

module.exports = mongoose.model(collectionName, schema)