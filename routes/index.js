
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Picture Fun' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs) {
            res.render('userlist', {
                "userlist" : docs,
                "title" : 'Picture Fun'
            });
        });
    };
};

exports.gallery = function(db) {
    return function(req, res) {
        var collection = db.get('galleries');
        collection.find({'name': req.name},{},function(e,docs) {
            res.render('gallery', {
                "gallery" : docs,
                "title" : 'Picture Fun'
            });
        });
    };
};

exports.galleries = function(db) {
    return function(req, res) {
        var collection = db.get('galleries');
        collection.find({},{},function(e,docs) {
            res.render('galleries', {
                "galleries" : docs,
                "title" : 'Picture Fun'
            });
        });
    };
};

exports.addgallery = function(db) {
    return function(req, res) {
        var galleryName = req.body.galleryname;
        
        var collection = db.get('galleries');
        
        collection.insert({
            "name": galleryName
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding.");
            } else {
                res.location("galleries");
                res.redirect("galleries");
            }
        });
    };
};

exports.newuser = function(req, res) {
    res.render('newuser', { title: 'Picture Fun' });
};

exports.adduser = function(db) {
    return function(req, res) {
        var userName = req.body.username;
        var userEmail = req.body.useremail;
        
        var collection = db.get('usercollection');
        
        collection.insert({
            "username": userName,
            "email": userEmail
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding.");
            } else {
                res.location("userlist");
                res.redirect("userlist");
            }
        });
    };
};