const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: true }))
app.use(cors({origin: 'http://localhost:3000'}));

const PORT = process.env.PORT || 4000;

app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT , ()=>{
   console.log(`Running server in port ${PORT}`) 
})
