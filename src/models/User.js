const { Schema, model }=require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
	username: String,
	email: String,
	password: String
});

//añado metodos al userSchema
userSchema.methods.encryptPassword= async (password) =>{
	//genero el salt
	const salt = await bcrypt.genSalt(10)
	//encripto la contraseña con el salt generado
	return bcrypt.hash(password, salt);

}
userSchema.methods.validatePassword= function (password){
	return bcrypt.compare(password, this.password)//comparo la contraseñla de la base de datos con la del req.body
}

module.exports = model('User', userSchema);
