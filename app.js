const express = require('express');
const path= require('path');
const bodyparser= require('body-parser');
const mysql = require('mysql');

const app =express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extende:true}));
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();

  });

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


app.get('/Home',(req,res,next)=>{
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

app.get('/Home/:id',(req,res,next)=>{
    let book=req.params;
    console.log(book);
    db.query('SELECT * FROM books WHERE BookId=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }
        else
            console.log(err);
    });

});


//delete 


app.delete('/Home/delete/:id',(req,res,next)=>{

    console.log(req.params)
    db.query('DELETE FROM books WHERE BookId='+ req.params.id);

});

// create



app.post('/Home',(req,res,next)=>{
        
    console.log(req.body.name);
    db.query('INSERT INTO books values("'+req.body.id+'","'+req.body.name+'","'+req.body.amount+'")');

});



// update

app.put('/Home',(req,res,next)=>{
    let book= req.body;
    console.log(req.body);
    db.query('UPDATE books set Amount = ? , BookName= ? WHERE BookId= ? ',[req.body.amount,req.body.name,req.body.id],(err,rows,fields)=>{
        if(err) throw err;
        res.send(rows);
        console.log(rows);
    });
});




//delete 


app.delete('/Home/:id',(req,res,next)=>{
    console.log(req.body.id);
     
        db.query('DELETE FROM books WHERE BookId="'+req.body.id+'"',[req.params.id],(err,rows,fields)=>{
            if(!err){
                
                res.send('Deleted Successfully');
                console.log("executed");
            }
            else
                console.log(err);
        });
    
    });




app.listen(3000);
