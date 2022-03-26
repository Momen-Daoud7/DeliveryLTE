const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name:{
		type: String,
		required:[true,"Name is required."]
	},
	email: {
		type:String,
		required:[true,"Email is required."],
		unique:true,
		match:[
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      		'Please add a valid email'
		]
	},
	role: {
		type: String,
		enum: ['manager','employee','captin','client'],
		default:'client',
		required:[true,"Role is required."]
	},
	address:{
		type: String,
		required:[true,"Address is required."]
	},
	phone:{
		type: Number,
		required:[true,"Phone is required."]
	},
	useStatus: {
		type: Boolean,
		default:false,
	},
	password: {
		type:String,
		required:[true,"Password is required."],
		minLength:6,
	},
	createdAt:{
		type:Date,
		default:Date.now()
	}

})


// Encrpty user password
UserSchema.pre('save',async function(next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
  	this.password = await bcrypt.hash(this.password, salt);
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user',UserSchema);

module.exports = User;