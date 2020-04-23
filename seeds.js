var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment     = require("./models/comment");
 //Add a campground
 var data = [
    {
        name: "flowers",
        image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, perferendis optio libero facere atque ducimus commodi nemo aspernatur odit deserunt quibusdam? Nesciunt nobis officiis sapiente nihil eos distinctio dolore molestias." 
    },
    {
        name: "road",
        image: "https://images.pexels.com/photos/237018/pexels-photo-237018.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, perferendis optio libero facere atque ducimus commodi nemo aspernatur odit deserunt quibusdam? Nesciunt nobis officiis sapiente nihil eos distinctio dolore molestias.Hey! Im good" 
    },{
        name: "paste",
        image: "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, perferendis optio libero facere atque ducimus commodi nemo aspernatur odit deserunt quibusdam? Nesciunt nobis officiis sapiente nihil eos distinctio dolore molestias." 
    }
]
function seedDB(){

    Campground.remove({},function(err){
        if(err){
            console.log();
        } else{
            console.log("Removed Campgrounds!");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                        
                    }else{
                        console.log("Added Campground");
                        // Create a comment

                        Comment.create(
                            {
                                text: "This place is great!, I wish there was internet",
                                author: "Homer"
                            }, function(err,comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a new comment");
                                    
                                }
                            }
                        )
                    }
                })
            })
        }
    });

   
    
}

module.exports = seedDB;