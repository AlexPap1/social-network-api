const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  addFriend,
  deleteFriend,
  updateUser,
  deleteUser
} = require('../../controllers/users-controller');

// /api/users/
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
