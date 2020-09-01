const mongoose = require('mongoose');

//conecto a la base datos
mongoose.connect('mongodb://localhost/dbjwt',{
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology:true

})
	.then(db => console.log('database is connected'))