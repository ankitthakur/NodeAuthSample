var LocalStrategy = require('passport-local').Strategy;
var User  = require('../app/models/user');

module.exports = function(passport){

	// passport session setup

	//used to serialze and unserialize users out of session
	//
	// use to serialize the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	// local signup 

	// we are using named strategies since we have one for login and other for signup.
	// by defaut, if there is no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email.
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true // allows us to pass back the entire request to the callback
	},
	function (req, email, password, done) {
		// body...
		// asynchronous.
		// User.findOne wants to fire unless data is sent back
		process.nextTick(function(){

			// find the user whose email is the same as the forms email.
			User.findOne({'local.email':email}, function(err, user){
				if(err){
					return done(err);
				}
				
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				}
				else{
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function(err){
						if(err)
							throw err;


						return done(null, newUser);
					});
				}
			});
		});
	}));
};