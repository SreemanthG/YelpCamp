var express = require('express');
var router  = express.Router({mergeParams:true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');
var middleware = require("../middleware");

router.get("/",function(req,res){

    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    })


}); 

router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    var newCampgrounds = {name:name,image:image,description:desc,author:author,price:price}
    // campgrounds.push(newCampgrounds);
    Campground.create(newCampgrounds,function(err,newlyCreated){
        if(err){
            console.log(err);
            
        }else{
            // console.log(newlyCreated);
            
            res.redirect("/campgrounds");
        }
    })
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new") 
});


//SHOW MOREINFO
router.get("/:id", function(req,res){
    //Find the campground with Provided ID
    //render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampgrounds){
        if(err){
            console.log(err);
            
        } else{
            
            // console.log(foundCampgrounds);
            res.render("campgrounds/show",{campground:foundCampgrounds});
        }
    })

});

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    })
})

//UPDATE

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //Find and update the correct campground   

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds")

        }
    })
})

//middleware



module.exports = router;