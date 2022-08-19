const { Thought, User } = require('../models')
const tryCatch = require("../utils/tryCatchHandler")

const thoughtControllers = {
  getThoughts: tryCatch(async (req, res) => {
    const thoughts = await Thought.find()
    res.json(thoughts)
  }),
  getThoughtById: tryCatch(async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId)
    return res.json(thought)
  }),
  createThought: tryCatch(async (req, res) => {
    const thought = await Thought.create(req.body)
    const user = await User.findOneAndUpdate({ username: req.body.username }, {
      $addToSet: { thoughts: thought._id }
    }, {
      new: true
    })
    if (!user) return res.json('Thought created but username not found')
    res.json({ thought, userThoughtCount: user.thoughts.length })
  }),
  updateThoughtById: tryCatch(async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      runValidators: true,
      new: true
    })
    res.json(thought)
  }),
  deleteThoughtById: tryCatch(async (req, res) => {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId)
    const user = await User.findOneAndUpdate({ username: thought.username }, {
      $pull: { thoughts: thought._id }
    }, {
      new: true
    })
    if (!user) return res.json('Thought deleted but username not found')
    res.json({ thought, userThoughtCount: user.thoughts.length })

  }),
}

module.exports = thoughtControllers