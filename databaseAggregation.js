const mongoose = require("mongoose");
const { uri, User } = require('./utils/conn');

async function main() {
    try {
        await mongoose.connect(uri);

        // Aggregation pipeline to calculate the average of all users
        const averageAge = await User.aggregate([{
            $group: {
                _id: null,
                avg_val: { $avg: "$age" }
            }
        }]);

        // Aggregation pipeline to count all users in the `users` collection
        const count = await User.aggregate([
            { $group: { _id: null, myCount: { $sum: 1 } } },
            { $project: { _id: 0 } }
        ]);
        
        
        console.log(`The average Age is : ${averageAge[0].avg_val}`);
        console.log();
        console.log(`The number of users in 'users' collection  : ${count[0].myCount}`);

    } catch (error) {
        console.error('Database Connection Failed');
    } finally {
        await mongoose.connection.close();
    }
}

main();