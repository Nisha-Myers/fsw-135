const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// set up basic express server 
const app = express();
app.use(cors());
app.use(express.json());



// connect with my MySql server
const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: '',

    // connect to default database
    database: '20Oct2022'
});


// capture errors, if any
db.connect((err) => {
    if (err){
        throw err;
    } 
    console.log("connection to MySQL Server Established Successfully!")
    });



// create an empty database
app.get('/createDB',(req, res) => {
    let myQuery = "CREATE DATABASE 20Oct2022";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("20Oct2022 Database created successfully"); 
    });
});


// create a new table
app.get('/createTable',(req, res) => {
    let myQuery = "CREATE TABLE postings (id INT auto_increment, title VARCHAR(100), message VARCHAR(250), PRIMARY KEY (id))";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("The postings table was created successfully"); 
    });
});


// insert row-1
app.post('/post', (req, res) =>{
    let post = {title: req.body.title, message:req.body.message};
    let myQuery = "INSERT INTO postings SET? ";


    // run SQL command
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("The first row inserted successfully");
    });
});


// insert row-2
app.get('/insertRow2', (req, res) =>{
    let post = {title: 'SECOND post', message: 'This is my second post via a route.'};
    let myQuery = "INSERT INTO the postings SET? ";


    // run SQL command
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("SECOND row inserted successfully");
    });
});


// execute a SELECT query
app.get('/post',(req, res) => {
    let myQuery = "SELECT * FROM postings";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send(result); 
    });
});


// execute a UPDATE query
app.put('/post/:id', (req, res) => {
    let newTitle = req.body.title;
    let myQuery = `UPDATE postings SET title = '${newTitle}' WHERE ID = ${req.params.id}`;

    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        
        // res.send("UPDATE query was executed successfully"); 
    });

    let newMessage = req.body.message;
    let myQuery2 = `UPDATE postings SET message = '${newMessage}' WHERE ID = ${req.params.id}`;

    db.query(myQuery2, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("UPDATE Query executed successfully"); 
    });
});


// execute a DELETE query
app.delete('/post/:id', (req, res) => {
  let myQuery = `DELETE  FROM postings WHERE ID = ${req.params.id}`;

    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("DELETE Query executed successfully"); 
    });
});




// open up port and listen for a connection request
app.listen('9000', () => {
    console.log("Local Web Server is up and Running!");
});