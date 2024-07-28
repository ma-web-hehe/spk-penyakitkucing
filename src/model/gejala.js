const mongoose = require('mongoose')
const collectionName = 'gejala'

const schema = new mongoose.Schema(
    {
        IDGEJALA: {
            type: String,
        },
        GEJALA: {
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