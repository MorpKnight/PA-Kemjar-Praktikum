const express = require('express');
const router = require('express').Router();
const authControllers = require('../controllers/Auth.controllers'); // Adjust the path

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);
router.post('/update', authControllers.editProfile);
router.get('/profile', authControllers.getUserProfile);

module.exports = router;