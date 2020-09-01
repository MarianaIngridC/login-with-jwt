const { Schema, model }=require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
	username: String,
	email: String,
	password: String
});
userSchema.methods.encryptPassword= async (password) =>{
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt);

}
userSchema.methods.validatePassword= function (password){
	return bcrypt.compare(password, this.password)//comapro al contraseñla de loa base de datos con LA CONSRASSEÑA QUE ME VAN A PASAR
}

module.exports = model('User', userSchema);
