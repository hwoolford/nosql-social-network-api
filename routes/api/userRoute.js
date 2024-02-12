const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(removeUser);

module.exports = router;