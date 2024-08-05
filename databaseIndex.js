const mongoose = require('mongoose');

const { uri, User } = require('./utils/conn');

async function queryExplain() {
    await mongoose.connect(uri);
    // Analyze the performance of the query
    User.find({ age: { $gte: 30 } }).explain('executionStats')
        .then(explanation => {
            console.log('Query explanation:', explanation.executionStats);
        })
        .catch(err => console.error(err))
        .finally(() => mongoose.connection.close());

}

queryExplain();

