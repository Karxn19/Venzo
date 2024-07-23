const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  CREATING SCHEMA
const bikeSchema = new Schema({
    brand: {
        type: String,
        required: [true,'A bike must have a brand'],
        maxlength: [20, 'A bike brand cannot be longer than 20chars'],
        minlength: [3, 'A bike brand should be longer than 3chars']
    },
    model: {
        type: String,
        required: [true,'A bike must have a model'],
        unique:true
    },
    year: {
        type: String,
        required: [true,'A bike must have a launch year'],
        min: [1885, 'Year must be after the invention of motorcycles'],
        max: [new Date().getFullYear() + 1, 'Launch year shouldnt be wayy ahead']
    },
    type: {
        type: String,
        required: [true,'A bike must have a brand'],
    },
    engine_cc: {
        type: Number
    },
    gearbox: {
        type: String,
        required: [true, 'Gearbox is required'],
        enum: {
            values: ['6-speed', '5-speed', '4-speed'],
            message: 'Gearbox must be one of the following values: 6-speed, 5-speed, 4-speed'
        }
    },
    fuel_capacity_liters: {
        type: Number
    },
    mileage_kmpl: {
        type: Number
    },
    maxspeed_kmph:{
        type: Number
    },
    cost_inr: {
        type: Number,
        min: [10000, 'Cost must be at least 10,000 INR'],
        max: [10000000, 'Cost cannot exceed 10,000,000 INR']
    },
    imageURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
        maxlength: [1000, 'Description cannot be more than 1000 characters long']
    },
    insert_date: {
        type: Date,
        default: Date.now,
        select: false
    }
});


const Bike = mongoose.model('Bike',bikeSchema);
module.exports = Bike;