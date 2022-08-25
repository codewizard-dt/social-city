const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
      },
      message: `Valid email required`
    }
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  id: false,
  virtuals: {
    friendCount: {
      get() {
        return this.friends.length
      }
    }
  },
  methods: {
    withMutuals: async function () {
      if (!this.populated('friends')) await this.populate('friends')
      let user = this.toObject()
      let friendIds = user.friends.map(({ _id }) => _id.toString())

      for (let friend of user.friends) {
        let subFriendIds = friend.friends.map(_id => _id.toString())
        let mutuals = friendIds.filter(id => subFriendIds.includes(id))
        friend.mutualFriends = mutuals
        friend.mutualFriendCount = mutuals.length
      }
      return user
    }
  }
})

userSchema.set('toObject', { getters: true })

const User = new model('User', userSchema)

module.exports = User