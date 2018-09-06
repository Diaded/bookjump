module.exports= function(app, db){



app.get('/api', function(req, res){
  if(!req.session.username){
      res.json({user: ""});
  }else{
    res.json({user: req.session.username});
  }
});

app.post("/login", function(req, res){
  db.find({username: req.body.user}, function(err, data){
    if(data[0]===undefined){
      res.json({mess: "wrong username or password"});
    }else{
      if(data[0].password===req.body.password){
        req.session.username=req.body.user;
        res.json({mess: "welcome"});
      }else{
        res.json({mess: "wrong username or password"});
      }
    }
  });
});

app.post("/signUp", function(req, res){
  db.find({username: req.body.user}, function(err, data){
    if(data[0]!==undefined){
      res.json({mess: "username already taken"});
    }else if(req.body.password!==req.body.conPassword){
      res.json({mess: "password doesnt match"});
    }else{
      db({username: req.body.user, password: req.body.password, location:{city: req.body.location[0], state: req.body.location[1]}, myBooks:[], yourreq:[] }).save(function(){
        res.json({mess:"Signed up"})
      });
    }
  });
});

app.delete('/logout', function(req, res){
  req.session.destroy(function(){
    res.json({});
  });
});





}
