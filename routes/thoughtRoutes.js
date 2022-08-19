const { thoughtControllers, reactionControllers } = require('../controllers')

const thoughtRoutes = require('express').Router()

// `/api/thoughts

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById
} = thoughtControllers
const {
  createReaction,
  deleteReaction
} = reactionControllers

thoughtRoutes.route('/')
  .get(getThoughts)
  .post(createThought)
thoughtRoutes.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById)
thoughtRoutes.route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction)

module.exports = thoughtRoutes