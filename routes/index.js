var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Pandabook = require("../models/pandabook");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User(
        {
            username: req.body.username, 
            firstName: req.body.firstName,
            lastNmae: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar,
        });
    // verify if the user is admin
    if(req.body.adminCode === 'admin') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/pandabooks"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/pandabooks",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/pandabooks");
});

// USERS PROFILES
router.get("/users/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser) {
       if(err) {
           req.flash("error", "Something went wrong");
           res.redirect("/");
       };
       Pandabook.find().where('author.id').equals(foundUser._id).exec(function(err, pandabooks) {
           if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("/");
            };
            res.render("users/show", {user: foundUser, pandabooks: pandabooks});
       })
   }); 
});




module.exports = router;