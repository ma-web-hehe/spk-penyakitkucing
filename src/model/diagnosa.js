const mongoose = require('mongoose')
const collectionName = 'diagnosa'

const schema = new mongoose.Schema(
    {
        IDPENYAKIT: {
            type: String,
        },
        IDUSER: {
            type: String,
        },
        NAMAKUCING: {
            type: String,
        },
        DAFTARGEJALA: [
            {
                IDGEJALA: String,
                VALUE: Number
            }
        ],
        IDDIAGNOSA: {
            type: String,
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