const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;



// middleware
app.use(express.json());
app.use(morgan('dev'));

// DB
mongoose.connect('mongodb://localhost:27017/moviesdb')

// routes
app.use('/App', require("./routes/inventoryRouter.js"))


// err handling
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// start the server
app.listen(PORT, () => {
    console.log(`This app was started on: ${PORT}`)
})