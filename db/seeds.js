const connection = require('../config/connection')
const { User, Thought } = require('../models')
const { userSeeds, randomThought } = require('./data')
const { ObjectId } = require('mongoose').Types;

connection.on('error', err => console.error(err))
connection.once('open', async () => {
  try {
    await connection.dropCollection('users')
    await connection.dropCollection('thoughts')
    let thoughtData = []
    let userData = userSeeds.map(user => {
      let userThoughts = [randomThought(user), randomThought(user), randomThought(user)]
      thoughtData.push(...userThoughts)
      return {
        _id: new ObjectId(),
        ...user,
        thoughts: userThoughts
      }
    })
    for (let user of userData) {
      let friendIds = []
      while (friendIds.length < 5) {
        let friendId = userData[Math.floor(Math.random() * userData.length)]._id
        if (friendId !== user._id && !friendIds.includes(friendId)) friendIds.push(friendId)
      }
      user.friends = friendIds
    }
    const users = await User.insertMany(userData)
    console.log('Seeded users')
    const thoughts = await Thought.insertMany(thoughtData)
    console.log('Thoughts seeded')
  } catch (error) {
    console.error(error)
  }
  process.exit(0)
})