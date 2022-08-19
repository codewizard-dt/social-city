import { Thought } from '../models';

const getThought = async (thoughtId) => await Thought.findById(thoughtId)
const reactionControllers = {

}

module.exports = reactionControllers