const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dog', DogSchema);
