const { Router} = require('express');
const router = Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const config = require ('../config.js')
const verifyToken = require('./verifyToken.js')

router.post('/signup', async (req, res,next)=>{
	const{ username, email, password }= req.body;
	const user = new User ({
		username: username,
		email: email,
		password: password//se pueden elimina los :username
	})
	user.password = await user.encryptPassword(user.password)//lo encypto y lo vuelvo a guardar en el mismo lugar. y uso el metood desde la instanci adel modelo
	await user.save();
	const token = jwt.sign({id: user._id}, config.secret,{
		expiresIn: 60*60*24
	})

	console.log(user);
	res.json({auth:true, token: token })//puedo eliminar el :token
})
router.post('/signin', async (req, res, next)=>{
	const {email, password} = req.body;
	const user= await User.findOne({email:email})
	if(!user){
		return res.status(404).send('The email doesn´t exists');
	}

	const validPassword= await user.validatePassword(password);//el delm req-body
	if(!validPassword){
		return res.status(401).json({auth:false, token: 'null'});
	}

	const token = jwt.sign({id: user._id}, config.secret,{
		expiresIn: 60*60*24
	})
	console.log(validPassword);
	

	res.json({auth: true, token})
}) 
router.get('/me', verifyToken, async (req, res, next)=>{
		
	const user = await User.findById(req.userId, { password:0});//me trae el obejto de l abase de datos uyo id coindida con este
	if(!user){
		return res.status (404).send('No user found')
	}
	res.json (user);

})
module.exports = router;