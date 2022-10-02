const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const err = new Error('Not found');
const port = 3000;
App.listen(port);
console.log("express was started on port:"+port);


//connecting to mongoose...
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/moviesdb');
    console.log("Connected to the DB")
}

app.use(express.json());
app.use(morgan('dev'));
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

app.use("/movies", require("./routes/movieRoute.js"));
app.use("user", require("./routes/usersRoute.js"));
app.use(err, (req, res, next) => {
    console.log(err);
    return res.send({errMsg: err.message})
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});