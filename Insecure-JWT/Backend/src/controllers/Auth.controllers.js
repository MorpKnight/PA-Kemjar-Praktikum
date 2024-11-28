const authServices = require('../services/Auth.services');

exports.register = async (req, res) => {
    try {
        const result = await authServices.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const result = await authServices.login(req.body);
        res.cookie('token', result.token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}