const router = require('express').Router();
const { updateUser, getUserMe } = require('../controllers/users');
const { updateUserValid } = require('../middlewares/validations');

router.get('/users/me', getUserMe);

router.patch('/users/me', updateUserValid, updateUser);
module.exports = router;
