var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Chenyang Xu",
//     image: "http://www.futureprize.org/Uploads/img/20180910/5b96304899805.jpg",
//     description: "This is a good person"
// }, function(err, compground){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("newly created campground");
//         console.log(compground);
//     }
// });

// var campgrounds = [
//         {name: "Chenyang Xu", image:"http://www.futureprize.org/Uploads/img/20180910/5b96304899805.jpg"},  
//         {name: "XU Chenyang", image:"https://img.purch.com/rc/300x200/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA3Ny83MzUvb3JpZ2luYWwvbGF1Z2hpbmctZW1vamkuanBlZw=="},
//         {name: "Chen Xuyang", image:"https://img.purch.com/rc/300x200/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA3Ny83MzUvb3JpZ2luYWwvbGF1Z2hpbmctZW1vamkuanBlZw=="}
//     ]
    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // res.render("campgrounds", {campgrounds:campgrounds});
    // get all campgrounds form DB
    Campground.find({}, function(err, allcompgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allcompgrounds});
        }
    });
});

// CREATE-add new campground to DB
app.post("/campgrounds", function(req, res){
//   res.send("You hit the post route")  it is only used in test
   // get data form form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc}
//   campgrounds.push(newCampground);  no need it anymore
   // creat new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds")
       }
   }) 
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the dcampground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campground
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});