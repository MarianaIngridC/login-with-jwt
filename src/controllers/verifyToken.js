const jwt = require('jsonwebtoken');
const config = require('../config.js');

function verifyToken(req, res, next){

	const token= req.headers['x-access-token'];//guardo lo que el usuario me va a enviar mediante las 'cabeceras' del navegador
	if (!token){
		return res.status(401).json({
			auth: false,
			message: 'no token provided'
		})
	}
	const decoded = jwt.verify(token, config.secret);
	//compruebo si el id decodificado existe en la base de datos 
	req.userId=decoded.id;
	next();

}
module.exports = verifyToken;