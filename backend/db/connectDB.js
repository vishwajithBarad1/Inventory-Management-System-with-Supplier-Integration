const mongoose = require("mongoose");
const mongooseUrl  = process.env.mongooseUrl


mongoose.connect(mongooseUrl);
mongoose.connection.on("open",()=>{console.log("mongoose connected successfully")});

module.exports = {mongoose}