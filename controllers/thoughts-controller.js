const { Thoughts, Users } = require('../models');

const thoughtsController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1})
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('__v')
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  //post thought
  createThoughts({ body }, res) {
    Thoughts.create(body)
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },

  //put thoughts
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if(!dbThoughtsData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  //REACTIONS
  
  //delete thought
  deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
      .then(dbThoughtsData => {
        if(!dbThoughtsData) {
          res.status(404).json({message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },

  //post reaction
  addReaction({ params}, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({message: 'No though with this id' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  //delete reaction 
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactionId: params.reactionId} },
      { new: true }
    )
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;
