const { pool } = require('../utils/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (body) => {
    const { email, password, name, birthdate, gender, address, phone } = body;
    if (!email || !password || !name || !birthdate || !gender || !address || !phone)
        throw new Error('All fields are required');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    if (phone.length < 10) throw new Error('Phone number must be at least 10 characters long');

    const lowerCaseGender = gender.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAlreadyExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userAlreadyExists.rows.length > 0) throw new Error('User already exists');

    const newUser = await pool.query(
        'INSERT INTO users (email, password, name, birthdate, gender, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [email, hashedPassword, name, birthdate, lowerCaseGender, address, phone]
    );
    if (newUser.rows.length === 0) throw new Error('Error creating user');

    return { success: true, message: 'User created successfully' };
}

exports.loginNotSecure = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw new Error('Email and password are required');

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) throw new Error('Invalid password');
    
    const dataToken = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].name,
        birthdate: user.rows[0].birthdate,
        gender: user.rows[0].gender,
        phone: user.rows[0].phone,
        address: user.rows[0].address
    };

    const token = jwt.sign(dataToken, 'secret', { expiresIn: '1h' });
    console.log(token);
    return { success: true, message: 'User logged in successfully', token };
}

exports.loginSecure = async (body) => {
    const { email, password } = body;
    if (!email || !password) throw new Error('Email and password are required');

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) throw new Error('Invalid password');
    
    const dataToken = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].name,
        birthdate: user.rows[0].birthdate,
        gender: user.rows[0].gender,
        phone: user.rows[0].phone,
        address: user.rows[0].address
    };

    const token = jwt.sign(dataToken, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    return { success: true, message: 'User logged in successfully', token };
}


exports.decodeToken = async (token, body) => {
    const { secret } = body;
    if (!secret) throw new Error('Secret is required');
    if (!token) throw new Error('Token is required');

    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new Error('Invalid token');
    return { success: true, message: 'Token decoded successfully', decoded };
}