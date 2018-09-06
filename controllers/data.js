module.exports= function(app, db){

  app.get('/user', function(req, res){
    db.find({}, function(err, data){
        res.json({users: data});
    });
  });

  app.get('/books', function(req, res){
    db.find({}, function(err, data){
      let arr=[];
      for(var i=0; i<data.length; i++){
        for(var j=0; j<data[i].mybooks.length; j++){
          if(data[i].username===req.session.username){
            data[i].mybooks[j].me=true;
          }else{
            data[i].mybooks[j].me=false;
          }
          arr.push(data[i].mybooks[j]);
        }
      }
      if(arr.length===0){
        res.json({books: []});
      }else{
        arr.sort(function(a, b){ return a.time- b.time });
        res.json({books: arr});
      }
    });

  });


app.get('/getReq', function(req, res){
  db.find({username: req.session.username}, function(err, data){
    res.json({arr: data[0].youreq});
  });

});

app.get('/myBooks', function(req, res){
   console.log('requesting my books');
  db.find({username: req.session.username}, function(err, data){
    res.json({books: data[0].mybooks});
  });
});

app.get('/tradeB', function(req, res){
  db.find({username: req.session.username}, function(err, data){
    res.json({myBooks: data[0].mybooks});
  });
});





}
