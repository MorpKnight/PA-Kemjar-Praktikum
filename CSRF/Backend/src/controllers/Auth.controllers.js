const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authServices = require('../services/Auth.services');

const registerUser = async (req, res) => {
    try {
        //console.log(req.body);
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
        console.log(req.body);
        const user = await authServices.loginUser(req.body);
        if (user.id === -1) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }
        if (user.id === -2) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        // res.cookie('authToken', 'dummyToken', {
        //     secure: false, // Allow cookies over both HTTP and HTTPS
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });
        const authToken = jwt.sign(
            { userId: user.id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration
        );

        // Set authToken in cookies
        res.cookie('authToken', authToken, {
            httpOnly: true, // Prevent client-side JS access
        });
        res.status(200).json({ success: true, message: "Login successful", payload: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const editProfile = async (req, res) => {
    try {
        // Extract authToken from cookies
        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication token not provided.",
            });
        }

        // Decode the authToken to get userId
        let userId;
        try {
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET); // Use your secret key
            userId = decoded.userId;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired authentication token.",
            });
        }

        // Add userId to the request body
        const userDetails = { ...req.body, userId };

        // Pass userDetails to the service
        const updatedUser = await authServices.editProfile(userDetails);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            payload: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
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

const getUserProfile = async (req, res) => {
    try {
        console.log("Hey") ;
        // Extract authToken from cookies
        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication token not provided.",
            });
        }

        // Decode the authToken to get userId
        let userId;
        try {
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET); // Use your secret key
            userId = decoded.userId;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired authentication token.",
            });
        }

        const user = await authServices.getUserProfile(userId);
        res.status(200).json({ success: true, payload: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    registerUser, 
    loginUser, 
    editProfile, 
    logoutUser ,
    getUserProfile
};