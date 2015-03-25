module.exports = function(app, passport){

	// HOME PAGE with login links
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	// login form
	app.get('/login', function(req, res){
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// sign up
	app.get('/signup', function(req, res){
		res.render('signup.ejs',{message:req.flash('signupMessage')});
	});

	// profile
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs',{user:req.user});
	});

	// logout
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	// process the sign up form
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect:'/profile', // redirect to the secure profile section
		failureRedirect:'/signup', // redirect back to the signup page, if there is an error
		failureFlash:true // allow flash messages
	}));

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){

	// if the user is authenticated in the session, carry on
	if(req.isAuthenticated()){
		return next();
	}

	// if they are not, redirect them to the home page.
	res.redirect('/');
}