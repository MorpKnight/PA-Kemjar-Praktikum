const express = require('express');
const cors = require('cors');
const { pool } = require('./src/utils/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

pool.connect().then(() => {
    console.log('connected to the database');
}).catch((err) => {
    console.log(err);
});

const authRoutes = require('./src/routes/Auth.routes');
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});