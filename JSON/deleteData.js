
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Bike = require('./../model/Bike'); 
dotenv.config({ path: `${__dirname}/../config.env` });

const CLOUD_DATABASE_PASSWORD = process.env.CLOUD_DATABASE_PASSWORD;
const CLOUD_DATABASE_URI = `mongodb+srv://karan616:${CLOUD_DATABASE_PASSWORD}@natours-cluster.6hd41gg.mongodb.net/Venzo_db?retryWrites=true&w=majority&appName=natours-cluster`;

mongoose.connect(CLOUD_DATABASE_URI, {
}).then(con => {
    console.log('DB connected successfully!');
}).catch(err => {
    console.log('DB connection failed', err);
});

// DELETE DATA FROM DB
const deleteData = async () => {
    try {
        await Bike.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    } catch (err) {
        console.error('Error deleting data:', err);
        process.exit(1);
    }
};

deleteData();
