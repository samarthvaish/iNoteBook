const mongoose = require("mongoose");

const mongoUrl =
  "mongodb://localhost:27017/inotesbook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const conectToMongo = () =>{
    mongoose.connect(mongoUrl , () => {console.log("Successfully connected to MongoDB")})
}

module.exports = conectToMongo