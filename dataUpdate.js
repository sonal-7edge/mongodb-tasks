const mongoose = require("mongoose");
const { uri, User } = require('./utils/conn');
const { nameFormatedResult } = require('./utils/util');

async function updateFunction() {
    try {
        await mongoose.connect(uri);

        // Retrive a user
        let user_id;
        console.log(`User's age before Updating:\n`);
        const result = await User.find({}, { name: 1, age: 1 }).sort({ name: -1 }).limit(1);
        result.forEach((value) => {
            user_id = value._id.toHexString();
            console.log(`Name:${value.name}\tAge:${value.age}\n`);
        });

        // Update the age of that user
        const updateFilter = await User.updateOne({ _id: user_id }, { $set: { age: 21 } });
        if (updateFilter.modifiedCount == 1 || updateFilter.matchedCount == 1) {
            console.log(`Updated Successfully\n`);
        }

        // Show the updated age
        console.log(`User's age after Updating:\n`);
        const updatedResult = await User.find({}, { name: 1, age: 1, _id: 0 }).sort({ name: -1 }).limit(1);
        updatedResult.forEach((value) => {
            console.log(`Name:${value.name}\tAge:${value.age}`);
        });

    } catch (error) {
        console.error('Database Connection Failed');
    } finally {
        await mongoose.connection.close();
    }
}

async function deleteFunction() {
    try {
        await mongoose.connect(uri);
        // Data to be inserted
        const user = {
            name: 'TestUser',
            email: 'testt@user.com',
            age: 22,
            phone: '947-558-3402',
            addresses: [
                { street: '123 Main St', city: 'Hometown', state: 'CA', zip: '12345' }
            ]
        };

        // Insert a Test User 
        const insertOneResponse = await new User(user).save();
        user_id = insertOneResponse._id;
        console.log(`\nDeleting user: ${insertOneResponse.name}`);

        // Retrive All the names in the ascending order
        const nameFilteredResult = await User.find({}, { name: 1, _id: 0 }).sort({ name: 1 });
        nameFormatedResult(nameFilteredResult);

        // Delete the Test User
        const deleteFilter = await User.deleteOne({ _id: user_id });
        if (deleteFilter.deletedCount == 1) {

            // Retrive All the names in the ascending order
            const nameFilteredResult = await User.find({}, { name: 1, _id: 0 }).sort({ name: 1 });
            nameFormatedResult(nameFilteredResult);

        } else {
            console.log(`Failed to delete the user`);
        }

    } catch (error) {
        console.error('Database Connection Failed');
    } finally {
        await mongoose.connection.close();
    }
}


async function main() {
    await updateFunction();
    await deleteFunction();
}

main();