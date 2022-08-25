const { Schema, model } = require('mongoose')
const formatDate = require('../utils/dateFormat')
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
      return formatDate(v)
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [Reaction]
}, {
  id: false,
  virtuals: {
    reactionCount: {
      get() {
        return this.reactions.length
      }
    }
  }
})
thoughtSchema.set('toObject', { getters: true })


const Thought = new model('Thought', thoughtSchema)

module.exports = Thought