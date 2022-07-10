const { Users, Thoughts } = require('../models');

const usersController = {
  // create Users
  createUsers({body}, res) {
    Users.create(body)
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => res.status(400).json(err));
  },

  //get all users
  getAllUsers(req, res) {
    Users.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'  
      })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .seelct('-__v')
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  
  // get one user
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
        })
      .populate({
        path: 'friends',
        select: '__v'
      })
      .select('-__v')
      .then(dbUsersData => {
        if(!dbUsersData) {
          res.status(404).json({ message: 'No user with this id'});
          return;
        }
        res.json(dbUsersData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      });
  },

  //put users
  updateUsers({params, body}, res) {
    Users.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
    .then(dbUsersData => {
      if(!dbUsersData) {
        res.status(404).json({ message: 'No user with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err))
  },

  //delete users
  deleteUsers({params}, res) {
    Users.findOneAndDelete({_id: params.id})
    .then(dbUsersData => {
      if(!dbUsersData) {
        res.status(404).json({message: 'No user with this id' });
        return;
      }
      res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
  },

  //FRIENDS

  //post friend
  addFriend({params}, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'no user with this id' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch(err => res.json(err));
  },

  //delete friend :(
  deleteFriend({params}, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId} },
      { new: true }
    )
    .then(dbUsersData => {
      if(!dbUsersData) {
        res.status(404).json({message: 'no user with this id' });
        return;
      }
      res.json(dbUsersData);
    })
      .catch(err => res.json(err));
  }
};

module.exports = usersController;
