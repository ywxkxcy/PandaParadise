var express = require("express");
var router  = express.Router();
var Pandabook = require("../models/pandabook");
var middleware = require("../middleware");


//INDEX - show all pandabooks
router.get("/", function(req, res){
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all pandabooks from DB
      Pandabook.find({name: regex}, function(err, allPandabooks){
         if(err){
             console.log(err);
         } else {
            res.render("pandabooks/index",{pandabooks:allPandabooks});
         }
      });
  } else {
    // Get all pandabooks from DB
    Pandabook.find({}, function(err, allPandabooks){
      if(err){
          console.log(err);
      } else {
          res.render("pandabooks/index",{pandabooks:allPandabooks, page: 'pandabooks'});
      }
    });
  }
});

//CREATE - add new pandabook to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to pandabooks array
    var name = req.body.name;
    var location = req.body.location;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newPandabook = {name: name, location: location, image: image, description: desc, author:author};
    // Create a new pandabook and save to DB
    Pandabook.create(newPandabook, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to pandabooks page
            console.log(newlyCreated);
            res.redirect("/pandabooks");
        }
    });
});

//NEW - show form to create new pandabook
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("pandabooks/new"); 
});

// SHOW - shows more info about one pandabook
router.get("/:id", function(req, res){
    //find the pandabook with provided ID
    Pandabook.findById(req.params.id).populate("comments").exec(function(err, foundPandabook){
        if(err){
            console.log(err);
        } else {
            console.log(foundPandabook)
            //render show template with that pandabook
            res.render("pandabooks/show", {pandabook: foundPandabook});
        }
    });
});

// EDIT PANDABOOK ROUTE
router.get("/:id/edit", middleware.checkPandabookOwnership, function(req, res){
    Pandabook.findById(req.params.id, function(err, foundPandabook){
        if (err) {
             res.redirect("/pandabooks");
        } else {
            res.render("pandabooks/edit", {pandabook: foundPandabook});
        }
    });
});

// UPDATE PANDABOOK ROUTE
router.put("/:id",middleware.checkPandabookOwnership, function(req, res){
    // find and update the correct pandabook
    Pandabook.findByIdAndUpdate(req.params.id, req.body.pandabook, function(err, updatedPandabook){
       if(err){
           res.redirect("/pandabooks");
       } else {
           //redirect somewhere(show page)
           req.flash("success", "Panda updated");
           res.redirect("/pandabooks/" + req.params.id);
       }
    });
});

// DESTROY PANDABOOK ROUTE
router.delete("/:id",middleware.checkPandabookOwnership, function(req, res){
   Pandabook.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/pandabooks");
      } else {
          req.flash("success", "Panda deleted");
          res.redirect("/pandabooks");
      }
   });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;

