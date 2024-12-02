const express = require('express');
const router = express.Router();

const authServices = require('../services/Auth.services');

const registerUser = async (req, res) => {
    try {
        const userId = await authServices.registerUser(req.body);
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully", 
            payload: userId 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await authServices.loginUser(req.body);
        if (user.id === -1) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }
        if (user.id === -2) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        res.status(200).json({ success: true, message: "Login successful", payload: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const editProfile = async (req, res) => {
    try {
        const updatedUser = await authServices.editProfile(req.body);
        res.status(200).json({ 
            success: true, 
            message: "Profile updated successfully", 
            payload: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('authToken');
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    registerUser, 
    loginUser, 
    editProfile, 
    logoutUser 
};