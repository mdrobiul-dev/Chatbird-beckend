const mongoose = require('mongoose');


const dbConnect = () => {
    mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('db Connected!'));
}

module.exports = dbConnect

// chatBird123