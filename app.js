// 1.REQUIRING MODELS
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const morgan = require('morgan');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bikeRouter = require('./routes/bikeRoutes');


// 2. DATABASE CONNECTION
// 2.1 LOCAL DB
/*
const LOCAL_DATABASE_URI = process.env.LOCAL_DATABASE_URI;

mongoose.connect(LOCAL_DATABASE_URI, {
}).then(con => {
    console.log('DB connected successfully!');
}).catch(err => {
    console.log('DB connection failed', err);
});
*/

// 2.2 CLOUD DB
const CLOUD_DATABASE_PASSWORD = process.env.CLOUD_DATABASE_PASSWORD;
const CLOUD_DATABASE_URI = `mongodb+srv://karan616:${CLOUD_DATABASE_PASSWORD}@natours-cluster.6hd41gg.mongodb.net/Venzo_db?retryWrites=true&w=majority&appName=natours-cluster`;

mongoose.connect(CLOUD_DATABASE_URI, {
}).then(con => {
    console.log('DB connected successfully!');
}).catch(err => {
    console.log('DB connection failed', err);
});


// 3. MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(`Time: ${req.requestTime}`);
    next();
});

// 4. ROUTES
app.use('/api/v1/bikes', bikeRouter);


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});