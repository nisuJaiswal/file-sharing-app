const { mongoose } = require('mongoose');

// const dotenv = require('dotenv').config()
const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // console.log(process.env.TEST)
        if (conn) console.log("Connected To Database");
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = connectionDB 