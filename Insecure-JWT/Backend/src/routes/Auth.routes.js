const authControllers = require('../controllers/Auth.controllers');
const router = require('express').Router();

router.post('/register', authControllers.register);
router.post('/login-not-secure', authControllers.loginNotSecure);
router.post('/login-secure', authControllers.loginSecure);
router.post('/decode', authControllers.decodeToken);

module.exports = router;