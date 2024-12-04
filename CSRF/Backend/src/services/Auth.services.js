const bcrypt = require('bcrypt');
const { pool } = require('../utils/db');

// Hash password
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Verify password
async function checkPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

// Register a new user
async function registerUser(userDetails) {
    const { username, email, password } = userDetails;

    if (!username || !email || !password) {
        throw new Error('All fields are required!');
    }

    // Check if email already exists
    const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExists.rows.length !== 0) {
        throw new Error('Email is unavailable');
    }

    // Hash password and store user in DB
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
        [username, email, hashedPassword]
    );

    return result.rows[0].id;
}

// Login user
async function loginUser(userDetails) {
    const { email, password } = userDetails;
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) return { id: -1 }; // No email found
    const user = result.rows[0];

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) return { id: -2 }; // Wrong password

    return user;
}

// Update user profile
async function editProfile(details) {
    const { userId, username, email, password } = details;
    const queryParams = [];
    let queryText = `UPDATE users SET `;

    if (username) {
        queryText += `username = $${queryParams.length + 1}`;
        queryParams.push(username);
    }
    if (email) {
        queryText += `${queryParams.length ? ',' : ''} email = $${queryParams.length + 1}`;
        queryParams.push(email);
    }
    if (password) {
        const hashedPassword = await hashPassword(password);
        queryText += `${queryParams.length ? ',' : ''} password = $${queryParams.length + 1}`;
        queryParams.push(hashedPassword);
    }
    queryText += ` WHERE id = $${queryParams.length + 1}`;
    queryParams.push(userId);

    await pool.query(queryText, queryParams);
    const updatedUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return updatedUser.rows[0];
}

async function getUserProfile(userId) {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return user.rows[0];
}

module.exports = { 
    registerUser, 
    loginUser, 
    editProfile, 
    getUserProfile
};
