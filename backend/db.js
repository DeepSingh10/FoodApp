const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/foodapp'
const mongoURI = 'mongodb+srv://DeepSingh1022:1022Deep@cluster0.mnhaycq.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const mongoDB = async () => {
    await mongoose.connect(mongoURI, options, async (err, result) => {
        if (err) console.error("---", err);
        else {
            console.log("database connection");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {

                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData){
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            
            })
        }
    })
}

module.exports = mongoDB;
