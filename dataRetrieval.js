const mongoose = require('mongoose');
const { uri, User } = require("./conn");
const { formatFindResult, emailFormatedResult, ageFormatedResult, nameFormatedResult } = require("./util");

async function main() {
    try {
        await mongoose.connect(uri);

        // Retrive All the documents from the "users" collection
        const result = await User.find();
        formatFindResult(result);

        // Retrive All the users with Age Greater than or Equal to 30
        const agefilteredResult = await User.find({ age: { $gte: 30 } }, { name: 1, age: 1, _id: 0 });
        ageFormatedResult(agefilteredResult);

        // Retrive Users with specific email domain (@google.com)
        // Regex Email Filter
        const emailRegex = /^[a-zA-Z0-9._-]+@google\.[a-zA-Z]{2,4}$/;
        const emailFilteredResult = await User.find({ email: emailRegex }, { name: 1, email: 1, _id: 0 });
        emailFormatedResult(emailFilteredResult);

        // Retrive All the names in the ascending order
        const nameFilteredResult = await User.find({}, { name: 1, _id: 0 }).sort({ name: 1 });
        nameFormatedResult(nameFilteredResult);

    } catch (error) {
        console.error('Database Connection Failed');
    } finally {
        await mongoose.connection.close();
    }
}

main();


