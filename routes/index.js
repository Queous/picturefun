
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Picture Fun' });
};

exports.helloworld = function(req, res){
    res.render('helloworld', { title: 'Hello, World!' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs) {
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.newuser = function(req, res) {
    res.render('newuser', { title: 'Add New User' });
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