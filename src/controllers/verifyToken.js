const jwt = require('jsonwebtoken');
const config = require('../config.js');

function verifyToken(req, res, next){

	const token= req.headers['x-access-token'];//guardo loq ue el usuaRO ME ENVIAR MEDIANRTE LAS CABECERAS EL CLIENTE
	if (!token){
		return res.status(401).json({
			auth: false,
			message: 'no token provided'
		})
	}
	const decoded = jwt.verify(token, config.secret);
	//ompruebo si el id deocdificado existe en la base de datos 
	req.userId=decoded.id;
	next();

}
module.exports = verifyToken;