MongooseConfig = (function(){
	MongooseConfig.displayName = 'MongooseConfig';
	var creds, mongoURI, prototype = MongooseConfig.prototype, constructor = MongooseConfig;
	creds = {
		'hostname': 'localhost',
		'port': 27017,
		'username': '',
		'password': '',
		'name': '',
		'db': 'sampleMongoDB'
	};
	mongoURI = function(creds){
		if (creds['username'] && creds['password']) {
			return 'mongodb://' + creds['username'] + ':' + creds['password'] + '@' + creds['hostname'] + ':' + creds['port'] + '/' + creds['db'];
		} else {
			return 'mongodb://' + creds['hostname'] + ':' + creds['port'] + '/' + creds['db'];
		}
	};
	console.log(mongoURI(creds));
	prototype.mongoUrl = process.env.MONGODB_URI || mongoURI(creds);
	function MongooseConfig(){}
	return MongooseConfig;
}());
module.exports = MongooseConfig;