const express = require('express');
const router = express.Router();

const authServices = require('../services/Auth.services');

const registerUser = async (req, res) => {
    const userDetails = req.body;
    try {
        const userId = await userService.registerUser(userDetails);
        res.status(201).json({
            success: true,
            message: "Register success",
            payload: userId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const userDetails = req.body;
    try {
        const user = await userService.loginUser(userDetails);

        if (user.id === -1) {
            return res.status(401).json({
                success: false,
                message: "No email found",
                payload: user
            });
        }
        if (user.id === -2) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password",
                payload: user
            });
        }

        // Generate a mock token or session value (replace this with JWT if needed)
        const token = `mock-token-${user.id}`;

        // Set the token in a cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Protects the cookie from being accessed by client-side scripts
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 24 * 60 * 60 * 1000 // Expires in 1 day
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            payload: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const editProfile = async (req, res) => {
    try {
        const result = await userService.editProfile(req.body);
        res.status(200).json({
            success: true,
            message: "Profile updated",
            payload: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
};

const logoutUser = (req, res) => {
    res.clearCookie('authToken'); // Clear the authToken cookie
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = {
    registerUser,
    loginUser,
    editProfile,
    logoutUser
};