const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db')

const app = express();


dotenv.config();

//connect to database
connectDB();

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Employee Management API is running!")
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));