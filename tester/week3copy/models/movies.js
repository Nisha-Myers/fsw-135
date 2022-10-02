const mongoose = require("mongoose");
const Schems = mongoose.Schema;



const movieSchema = new Schema ({
    id:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model("Movie", movieSchema)