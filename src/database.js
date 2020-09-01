const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbjwt',{
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology:true

})
	.then(db => console.log('database is connected'))