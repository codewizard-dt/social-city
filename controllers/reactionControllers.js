const { Thought } = require('../models');
const tryCatch = require('../utils/tryCatchHandler');
const { ObjectId } = require('mongoose').Types;

const reactionControllers = {
  createReaction: tryCatch(async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
      $addToSet: { reactions: req.body }
    }, {
      runValidators: true,
      new: true
    })
    res.json(thought)
  }),
  deleteReaction: tryCatch(async (req, res) => {
    console.log(req.body)
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
      $pull: {
        reactions: { reactionId: ObjectId(req.body.reactionId) }
      }
    }, {
      new: true
    })
    res.json(thought)
  }),
}

module.exports = reactionControllers