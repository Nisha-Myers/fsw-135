const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")
const expressJwt = require("express-jwt")


app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(
    "mongodb://localhost:20170/user-authentication",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("connected to database")
);

app.use("/auth", require("./routes/authRouter"));
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}));
app.use("/api/comment", require("./routes/commentRouter"));


app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
});

app.listen(8000, () => {
    console.log("this server is running on local port 8000")
});