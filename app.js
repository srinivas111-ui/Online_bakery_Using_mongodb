var express=require("express");
var bodyParser=require("body-parser");
//const User = require("./model/details"); 
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})
// User.js 
const Schema = mongoose.Schema 
var details = new Schema({ 
	name: { 
		type: String 
	}, 
  email:{
    type:String
  },
	password: { 
		type: String 
	},
  phone:{
    type:Number
  }
}) 

var User = mongoose.model('details', details)

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/signup', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone,
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('login.html');
})

app.post('/buy', function(req,res){
	var productname = req.body.productname;
	var Quantity =req.body.Quantity;
	var email = req.body.email;
	var village =req.body.village;
	var mandal =req.body.mandal;
	var district = req.body.district;
	var phone =req.body.phone;
	var pin =req.body.pin;
	var country =req.body.country;
	var Tid =req.body.Tid;
	var data = {
		"productname": productname,
		"Quantity": Quantity,
		"email":email,
		"village":village,
		"mandal":mandal,
		"district":district,
		"pin":pin,
		"phone":phone,
		"Transaction Id":Tid,
		"country":country,
		
	}
db.collection('Orders').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('suc.html');
})

app.post("/login", async function(req, res){
	var user = await User.findOne({ email: req.body.email,password:req.body.password}); 
	console.log(user); 
    try { 
        // check if the user exists 
        if (user) { 
            res.redirect("Main.html"); 
          } 
		  else { 
          res.status(400).json({ error: "User doesn't exist" }); 
        } 
      } 
	  catch (error) { 
        res.status(400).json({ error }); 
      } 
}); 
app.get("/login.html", isLoggedIn, function (req, res) { 
    res.redirect("login.html"); 
}); 

app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('Main.html');
}).listen(3000)

function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login.html"); 
} 
console.log("server listening at port 3000");
