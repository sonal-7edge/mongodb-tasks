const mongoose = require("mongoose");
const { uri,User ,Post } = require('./utils/conn');


async function main() {
    try {
        await mongoose.connect(uri);

        // Mapping the users
        const users = await User.find(); 


        const posts = [
            { title: 'A Day in the Life of Alice', content: 'Alice shares her daily routine...', userId: users[0]._id },
            { title: 'Bob\'s Favorite Recipes', content: 'Bob reveals his top 5 recipes...', userId: users[1]._id },
            { title: 'Tech Innovations by Charlie', content: 'Charlie discusses the latest in tech...', userId: users[2]._id },
            { title: 'Gardening Tips from Dana', content: 'Dana offers tips for a thriving garden...', userId: users[3]._id },
            { title: 'Eve\'s Travel Adventures', content: 'Eve talks about her recent travels...', userId: users[4]._id },
            { title: 'Nero\'s book: Code, Crisis and Life', content: 'A life in programming and daisy life...', userId: users[5]._id },
        ];
        
        const success = await Post.insertMany(posts);
        success.forEach((value)=>{
            console.log(`Successfully inserted: ${value.title}\nId: ${value._id}\n`);
        });

    } catch(error) {
        console.error('Database Connection Failed');

    } finally {
        await mongoose.connection.close();
    }

}

main();