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

// PostSchema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

// Create the model using the `userSchema` Schema
const User = mongoose.model('User', userSchema);

// Create the model using the `postSchema` Schema
const Post = mongoose.model('Post', postSchema);

module.exports = { uri, User, Post };