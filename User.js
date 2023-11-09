// User.js 

const mongoose = require('mongoose') 
const Schema = mongoose.Schema 
const passportLocalMongoose = require('passport-local-mongoose'); 
var details = new Schema({ 
	name: { 
		type: String 
	}, 
  email:{
    type:String
  },
	password: { 
		type: String 
	}
  phone:{
    type:String
  }
}) 

details.plugin(passportLocalMongoose); 

module.exports = mongoose.model('details', details)
