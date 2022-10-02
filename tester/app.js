const express = require("express");
const app = express();


app.get('/', (req, res) => {
    res.send("Goood Morning");
});


app.listen(3000, () => {
    console.log("The app is listening on port 3000!")
});