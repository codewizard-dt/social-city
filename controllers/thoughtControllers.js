const { Thought, User } = require('../models')
const tryCatch = require("../utils/tryCatchHandler")

const thoughtControllers = {
  getThoughts: tryCatch(async (req, res) => {
    const thoughts = await Thought.find().select('-__v')
    res.json(thoughts.map(thought => thought.toObject()))
  }),
  getThoughtById: tryCatch(async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId)
    thought ? res.json(thought.toObject()) : res.json('Thought not found')
  }),
  createThought: tryCatch(async (req, res) => {
    const thought = await Thought.create(req.body)
    const user = await User.findOneAndUpdate({ username: req.body.username }, {
      $addToSet: { thoughts: thought._id }
    }, {
      new: true
    })
    if (!user) return res.json('Thought created but username not found')
    res.json({ thought: thought.toObject(), userThoughtCount: user.thoughts.length })
  }),
  updateThoughtById: tryCatch(async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      runValidators: true,
      new: true
    })
    thought ? res.json(thought.toObject()) : res.json('Thought not found')
  }),
  deleteThoughtById: tryCatch(async (req, res) => {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId)
    if (!thought) return res.json('Thought not found')
    const user = await User.findOneAndUpdate({ username: thought.username }, {
      $pull: { thoughts: thought._id }
    }, {
      new: true
    })
    if (!user) return res.json('Thought deleted but username not found')
    res.json({ thought: thought.toObject(), userThoughtCount: user.thoughts.length })

  }),
}

module.exports = thoughtControllers