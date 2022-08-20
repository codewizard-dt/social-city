const tryCatch = require('../utils/tryCatchHandler');
const { User, Thought } = require("../models")
const { ObjectId } = require('mongoose').Types;

const userControllers = {
  getUsers: tryCatch(async (req, res) => {
    const users = await User.find()
    return res.json(users)
  }),
  getUserById: tryCatch(async (req, res) => {
    const user = await User.findById(req.params.userId).populate(['thoughts', 'friends'])
    return res.json(user)
  }),
  createUser: tryCatch(async (req, res) => {
    const user = await User.create(req.body)
    return res.json(user)
  }),
  updateUserById: tryCatch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      runValidators: true,
      new: true,
      lean: true
    })
    return res.json(user)
  }),
  deleteUserById: tryCatch(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId)
    const thoughts = await Thought.deleteMany({
      _id: {
        $in: user.thoughts.map(thoughtId => ObjectId(thoughtId))
      }
    })
    return res.json({ user, thoughts })
  }),
  addFriend: tryCatch(async (req, res) => {
    const { userId, friendId } = req.params
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: ObjectId(friendId) }
    }, {
      new: true
    })
    res.json(user)
  }),
  removeFriend: tryCatch(async (req, res) => {
    const { userId, friendId } = req.params
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { friends: ObjectId(friendId) }
    }, {
      new: true
    })
    res.json(user)
  }),
}

module.exports = userControllers

