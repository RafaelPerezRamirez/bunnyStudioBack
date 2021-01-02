const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: true }))
app.use(cors({origin: 'https://inspiring-albattani-2c7738.netlify.app'}));

const PORT = process.env.port || 4000;

app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(port, '0.0.0.0', ()=>{
   console.log(`Running server in port ${PORT}`) 
})
