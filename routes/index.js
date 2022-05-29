const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { regValid, authValid } = require('../middlewares/validations');

router.post('/signin', authValid, login);
router.post('/signup', regValid, createUser);

router.use(auth);
router.use('/', require('./users'));
router.use('/', require('./movies'));

module.exports = router;
