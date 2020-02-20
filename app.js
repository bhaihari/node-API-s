const express = require('express');
const path= require('path');
const bodyparser= require('body-parser');
const mysql = require('mysql');

const app =express();

app.use(bodyparser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hari'

});
db.connect((err)=>{
    if(!err)
        console.log("DB Connection succeded.");
    else
        console.log('DB connection failed \n Error :' + JSON.stringify(err),undefined,2);
});


// List of all the product


app.get('/Home',(req,res)=>{
    db.query('SELECT * FROM books ',(err,rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }
        else
            console.log(err);
    });


});







// List of particular product

app.get('/Home:id',(req,res)=>{
    let book=req.body;
    db.query('SELECT * FROM books WHERE BookId="'+book.BookId+'"',[req.params.id],(err,rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }
        else
            console.log(err);
    });

});


//delete 


app.delete('/Home:id',(req,res)=>{

    let book = req.body;
    db.query('DELETE FROM books WHERE BookId="'+book.BookId+'"',[req.params.id],(err,rows,fields)=>{
        if(!err){
            
            res.send('Deleted Successfully');
        }
        else
            console.log(err);
    });

});

// create

app.post('/Home',(req,res)=>{
    let book= req.body;
   
    db.query('INSERT INTO books values("'+book.BookId+'","'+book.BookName+'","'+book.Amount+'")',(err,rows,fields)=>{
        if(!err){
            
            res.send(JSON.stringify(rows));
        }
        else
            console.log(err);
    });

});


// update

app.put('/Home',(req,res)=>{
    let book= req.body;

    db.query('UPDATE books set Amount ="'+book.Amount+'" WHERE BookId="'+book.BookId+'"',(err,rows,fields)=>{

        res.send(rows);
        console.log(rows);
    });
});






app.listen(3000);
