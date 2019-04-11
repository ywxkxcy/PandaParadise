var express = require("express");
var router  = express.Router({mergeParams: true});
var Pandabook = require("../models/pandabook");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find pandabook by id
    console.log(req.params.id);
    Pandabook.findById(req.params.id, function(err, pandabook){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {pandabook: pandabook});
        }
    });
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup pandabook using ID
   Pandabook.findById(req.params.id, function(err, pandabook){
       if(err){
           console.log(err);
           res.redirect("/pandabooks");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               pandabook.comments.push(comment);
               pandabook.save();
               console.log(comment);
               req.flash("success", "Successfully added comment");
               res.redirect('/pandabooks/' + pandabook._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {pandabook_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          req.flash("success", "Comment updated");
          res.redirect("/pandabooks/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/pandabooks/" + req.params.id);
       }
    });
});

module.exports = router;