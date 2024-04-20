const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,'User name must be provided']
    },
    email:{
        type:String,
        required:[true,'Email must be provided']
    },
    password:{
        type:String,
        required:[true,'Password must be provided']
    },
    address:{
        type:String,
        default:""
    },
    items:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password") || user.isNew) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
			return next();
		} catch (err) {
			console.log(err)
			return next(err);
		}
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (err) {
        return false;
    }
}

module.exports = mongoose.model('User', userSchema);