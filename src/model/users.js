const mongoose = require('mongoose')
const collectionName = 'user'

const schema = new mongoose.Schema(
    {
        IDUSER: {
            type: String
        },
        NAME: {
            type: String,
        },
        USERNAME: {
            type: String
        },
        PASSWORD: {
            type: String
        },
        ROLE: {
            type: String,
            default: 2
        },
        REFRESH_TOKEN: {
            type: String,
            default: '-'
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