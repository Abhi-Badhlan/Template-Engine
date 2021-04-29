const path=require('path');
const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');
const hbs = require('hbs');
const app=express();

const conn=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"crud_db"
});

conn.connect((err)=>{
 	if(err) throw err;
 console.log("connected!");
});

//set views 
app.set('views',path.join(__dirname,'views'));

//set engine
app.set('view engine','hbs');

//use bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//use public folder as asset
app.use('/assets',express.static(__dirname+'/public'));

//route for homepage
app.get('/',(req,res)=>{
let sql="select * from product";
let query=conn.query(sql,(err,result)=>{
	if(err) throw err;
	res.render('product_view',{
	results:result
});
});
});


app.listen(9000,()=>{
	console.log("port 9000");
});