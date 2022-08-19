const { faker } = require("@faker-js/faker");
const { ObjectId } = require('mongoose').Types;

const loremText = (max = 280) => faker.lorem.paragraph().slice(0, max)

const data = {
  userSeeds: [
    {
      username: 'david',
      email: 'david@example.com',
    },
    {
      username: 'khaled',
      email: 'khaled@example.com',
    },
    {
      username: 'sally',
      email: 'sally@example.com',
    },
    {
      username: 'malik',
      email: 'malik@example.com',
    },
    {
      username: 'cassie',
      email: 'cassie@example.com',
    },
    {
      username: 'pdiddy',
      email: 'pdiddy@example.com',
    },
    {
      username: 'yonce',
      email: 'yonce@example.com',
    },
    {
      username: 'bae',
      email: 'bae@example.com',
    },
    {
      username: 'goatman',
      email: 'goatman@example.com',
    },
    {
      username: 'yeti',
      email: 'yeti@example.com',
    },

  ],

  randomThought: (user) => ({
    _id: new ObjectId(),
    thoughtText: loremText(),
    username: user.username,
    reactions: [
      data.randomReaction(),
      data.randomReaction(),
      data.randomReaction(),
    ]
  }),

  randomReaction: () => ({
    reactionBody: loremText(100),
    username: data.userSeeds[Math.floor(Math.random() * data.userSeeds.length)].username
  })
}

module.exports = data