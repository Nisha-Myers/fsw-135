const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;



mongoose.connect("mongoDB://localhost:27017/moviesDB"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},


() => console.log("You are connected to the DataBase");


app.listen(PORT, () => {
    console.log(`This app was started on: ${PORT}`)
});