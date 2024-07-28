const mongoose = require('mongoose')
const collectionName = 'bobot'

const schema = new mongoose.Schema(
    {
        IDBOBOT: {
            type: String,
        },
        SELISIH: {
            type: Number,
        },
        BOBOT: {
            type: Number,
        },
        KETERANGAN: {
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