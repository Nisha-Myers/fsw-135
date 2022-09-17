const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema ({
    id:{
        type: String,
        required: true
    },
    fullName: {
        type: Int,
        required: true
    },
    age: {
        type: Int,
        required: true
    },
    birthdate: {
        type: Int,
        required: true
    }
});



module.exports = mongoose.model("User", usersSchema)