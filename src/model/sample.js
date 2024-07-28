const mongoose = require('mongoose')
const collectionName = 'sample'

const schema = new mongoose.Schema(
  {
    IDDIAGNOSA: {
      type: String,
    },
    IDPENYAKIT: {
      type: String,
    },
    IDGEJALA: {
      type: String,
    },
    VALUE: {
      type: Number,
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