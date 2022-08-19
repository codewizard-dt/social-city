const { userControllers } = require('../controllers')

const userRoutes = require('express').Router()

const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend
} = userControllers

userRoutes.route('/')
  .get(getUsers)
  .post(createUser)
userRoutes.route('/:userId')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)
userRoutes.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

module.exports = userRoutes