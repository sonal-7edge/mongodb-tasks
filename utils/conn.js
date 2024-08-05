// This File contains the connection URI and the User Schema 
require('dotenv').config();
const mongoose = require('mongoose');


// Get the URI
const uri = process.env.DATABASE_URI;

// AddressSchema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});

// UserSchema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    phone: String,
    addresses: [addressSchema],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    isActive: { type: Boolean, default: true }
});

// Create the model using the Schema
const User = mongoose.model('User', userSchema);

module.exports = {uri, User};