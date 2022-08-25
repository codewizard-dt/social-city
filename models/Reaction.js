const { Schema, Types, model } = require('mongoose')
const formatDate = require('../utils/dateFormat')

const Reaction = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (v) {
      return formatDate(v)
    }
  }
}, {
  _id: false
})

module.exports = Reaction