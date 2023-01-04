const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/btliot', { 
            //please note the mongoose can not understand "localhost",  we use 127.0.0.1 instead
            useNewUrlParser: true , 
            useUnifiedTopology: true
        });
        console.log('Connect to MongoDB successfully!');
    } catch (error) {
        console.log('Connect failed: '+error);
    }
}

module.exports = { connect };