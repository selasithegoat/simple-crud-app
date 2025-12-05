const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes')
require('dotenv').config();

const app = express();
// const API = "http://localhost:3000/"

app.use(cors());
app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('this is the server side');
// })

app.use('/api', employeeRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


