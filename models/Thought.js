const { Schema, model } = require('mongoose')
const Reaction = require('./Reaction')

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (v) {
      return `${v}`
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [Reaction]
})

const Thought = new model('Thought', thoughtSchema)

module.exports = Thought