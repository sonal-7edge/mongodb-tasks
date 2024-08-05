const mongoose = require('mongoose');
const { uri } = require('./utils/conn');

async function main() {
    try {
        await mongoose.connect(uri);
        const success = await mongoose.connection.dropDatabase();
        if(success){
            console.log(`Database Dropped Successfully`);
        }

    } catch(error) {
        console.error('Database Connection Failed');

    } finally {
        await mongoose.connection.close();
    }
}
main();


