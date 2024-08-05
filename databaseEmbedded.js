const mongoose = require('mongoose');
const { uri, User } = require('./utils/conn');

async function main() {
    await mongoose.connect(uri);
    try {
        const users = await User.find({},{name:1,addresses:1,_id:0});
        users.forEach((value)=>{
            console.log(`User : ${value.name}\nAddress :${value.addresses}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
    }

}

main();