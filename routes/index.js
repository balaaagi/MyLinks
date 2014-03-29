
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'My Links' });
};

exports.helloworld =function(req,res){
	res.render('helloworld',{title:'Hello, World!'});
};

exports.linklist=function(db){
	return function(req,res){
/*        db.collection('links').find({},{},function(err,result){
            res.render('linklist',
                {"linklist":result});
        });*/
		//var collection=db.get('links');
		db.collection('links').find().toArray(function(e,docs){
			res.render('linklist',{
				linklist:docs
			});

		});

	};
};

exports.newuser=function(req,res){
	res.render('newuser',{title: 'New User'});
};

exports.newlink=function(req,res){
    res.render('newlink',{title:'Add New Link'});
};

exports.showtags=function(db){
    return function(req,res){
        db.collection('links').distinct('tag',function(err,items){
            res.json(items);
        })
    }

};

exports.addlink=function(db){
    return function(req,res){
        var url=req.body.link;
        var tags=[];
        tags=req.body.tags.split(",");

        var collection=db.get('links');

        collection.insert({
            "link":url,
            "tag":tags
        },function(err,doc){
            if(err){
                res.send("There was some problem during insertions of linkes");
            }
           else{
                res.location("/linklist");
                res.redirect("linklist");
           } 
        });
    }
}

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;


        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("/userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}
