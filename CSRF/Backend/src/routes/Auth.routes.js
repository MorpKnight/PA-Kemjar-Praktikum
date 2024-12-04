const express = require('express');
const router = require('express').Router();
const authControllers = require('../controllers/Auth.controllers'); // Adjust the path

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);
router.put('/update', authControllers.editProfile);

module.exports = router;