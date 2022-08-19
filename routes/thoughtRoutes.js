const { thoughtControllers } = require('../controllers')

const thoughtRoutes = require('express').Router()

// `/api/thoughts

const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById
} = thoughtControllers

thoughtRoutes.route('/')
  .get(getThoughts)
  .post(createThought)
thoughtRoutes.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById)

module.exports = thoughtRoutes