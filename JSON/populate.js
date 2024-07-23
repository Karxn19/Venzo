
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Bike = require('./../model/Bike');

dotenv.config({ path: `${__dirname}/../config.env` });
// 1.for local
/**
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
}).then(con => {
    console.log('DB connected successfully!');
}).catch(err => {
    console.log('DB connection failed', err);
});
 */

// 2. For cloud
const CLOUD_DATABASE_PASSWORD = process.env.CLOUD_DATABASE_PASSWORD;
const CLOUD_DATABASE_URI = `mongodb+srv://karan616:${CLOUD_DATABASE_PASSWORD}@natours-cluster.6hd41gg.mongodb.net/Venzo_db?retryWrites=true&w=majority&appName=natours-cluster`;

mongoose.connect(CLOUD_DATABASE_URI, {
}).then(con => {
    console.log('DB connected successfully!');
}).catch(err => {
    console.log('DB connection failed', err);
});



// READ JSON FILE
const bikes = JSON.parse(fs.readFileSync(`${__dirname}/bikes-data.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Bike.create(bikes);
        console.log('Data successfully loaded');
        process.exit();
    } catch (err) {
        console.error('Error importing data:', err);
        process.exit(1);
    }
};

importData();
