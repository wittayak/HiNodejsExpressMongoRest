const mongoose = require('mongoose');
const express = require('express');
const customersRouter = require('./routes/customers');
const coinsRouter = require('./routes/coins');

const app = express();

// connect database
connectDB();

app.use(express.json());
app.use('/api/customers', customersRouter);
app.use('/api/coins', coinsRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/alpha-bank');
        console.log('Connected to MongoDB...')
    } catch(err) {
        console.log('Could not connect to MongoDB: ', err);
    }
}
