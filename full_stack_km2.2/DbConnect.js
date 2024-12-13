const mongoose = require('mongoose');

// ansluta till MongoDB
const connectDb = async () => {
    await mongoose.connect(process.env.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('connected to MongoDb...')) // Om anslutningen lyckas loggas ett meddelande till konsolen
    .catch(err => console.log(err)); // Om ett fel inträffar visa det till konsolen
};

module.exports = connectDb;