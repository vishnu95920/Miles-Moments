// const mongoose=require("mongoose");
// const data=require("./data.js");
// const Listing=require("../models/listing.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/kakshaSutra";

// main()
//     .then(()=>{
//         console.log("connected to db")
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
//     async function main() {
//         await mongoose.connect(MONGO_URL)
        
//     }

// const initDB = async()=>{

//     await Listing.deleteMany({});
//     await Listing.insertMany({});
//     console.log("data was initialized");
// }
// initDB();
const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/kakshaSutra";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connected to db");
    } catch (err) {
        console.error("DB connection error:", err);
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(data); // Use data from data.js
        console.log("data was initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    } finally {
        mongoose.connection.close(); // Close connection after initialization
    }
};

main().then(() => initDB());