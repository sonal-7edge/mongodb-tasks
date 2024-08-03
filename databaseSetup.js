require('dotenv').config();
const mongoose = require('mongoose');
const { type } = require('os');

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

// Data to be inserted
const user = {
    name: 'Sonal',
    email: 'sonal@7edge.com',
    age: 22,
    phone: '947-558-3402',
    addresses: [
        { street: '123 Main St', city: 'Hometown', state: 'CA', zip: '12345' }
    ]
};

const users = [
    {
        name: 'Alice',
        email: 'alice@example.com',
        age: 25,
        phone: '123-456-7890',
        addresses: [
            { street: '123 Main St', city: 'Hometown', state: 'CA', zip: '12345' }
        ]
    },
    {
        name: 'Bob',
        email: 'bob@example.com',
        age: 30,
        phone: '987-654-3210',
        addresses: [
            { street: '456 Elm St', city: 'Hometown', state: 'CA', zip: '12345' },
            { street: '789 Oak St', city: 'Big City', state: 'NY', zip: '67890' }
        ]
    },
    {
        name: 'Charlie',
        email: 'charlie@example.com',
        age: 35,
        phone: '555-555-5555',
        addresses: [
            { street: '101 Pine St', city: 'Smalltown', state: 'TX', zip: '54321' }
        ]
    },
];

// Function to connect to the database and insert the users
async function main() {
    try {
        // Connection to the Database
        await mongoose.connect(uri);
        console.log(`Connected to the database`);


        // Insert One User 
        const insertOneResponse = await new User(user).save();
        console.log(insertOneResponse);


        // Insert Many Users 
        const response = await User.insertMany(users);
        console.log(response);

    } catch (error) {
        console.error(`Failed to connect to Database`);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log(`Connection to Database Closed`);
    }
}

main();
