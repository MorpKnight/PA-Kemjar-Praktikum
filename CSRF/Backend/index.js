const express = require('express');
const cors = require('cors');
const { pool } = require('./src/utils/db');
const cookieParser = require('cookie-parser'); // Import cookie-parser
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware for cookies
app.use(cookieParser());

app.use(cors({
    origin: "*",
   // origin: "http://your-frontend-domain.com", // Replace with frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent with requests
}));

const userRoutes = require('./src/routes/Auth.routes'); 
app.use('/auth', userRoutes); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});