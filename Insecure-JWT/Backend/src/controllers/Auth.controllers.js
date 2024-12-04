const authServices = require('../services/Auth.services');

exports.register = async (req, res) => {
    try {
        const result = await authServices.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.loginNotSecure = async (req, res) => {
    try {
        const result = await authServices.loginNotSecure(req.body);
        res.cookie('token', result.token, { httpOnly: false, sameSite: 'none', secure: false });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.loginSecure = async (req, res) => {
    try {
        const result = await authServices.loginSecure(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.decodeToken = async (req, res) => {
    try {
        const token = req.headers.cookies.split('=')[1];
        const result = await authServices.decodeToken(token, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}