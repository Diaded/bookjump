module.exports= function(app, db){

  app.post('/addBook', function(req, res){
    let time = Date.now();
    let sId= Math.floor((Math.random() * 10000000000) + 1);
    db.find({username: req.session.username}, function(err, data){
      data[0].mybooks.push({title: req.body.title, author: req.body.author, owner:req.session.username, id:data[0]._id+'-'+sId, time: time});
      db.update({username: req.session.username}, data[0], {upsert: true}, function(){
          res.json({});
      });
    });
  });

  app.post('/setTrade', function(req, res){
    db.find({_id: req.body.id.split("-")[0]}, function(err, data){
      for(var i=0; i<data[0].mybooks.length; i++){
        if(req.body.id===data[0].mybooks[i].id){
          res.json({obj: data[0].mybooks[i]});
        }
      }
    });
  });

  app.post('/tradeReq', function(req, res){
    db.find({username: req.session.username}, function(err, data){
      db.find({_id: req.body.notMine.split("-")[0]}, function(err, data1){
         let mine=[];
         let notMine=[];

          mine= data[0].mybooks.filter(m=>m.title===req.body.mine);
          notMine= data1[0].mybooks.filter(m=>m.id===req.body.notMine);
          var obj= {mine: mine[0], notMine: notMine[0], owner:data1[0].username, id:  Math.floor((Math.random() * 10000000000) + 1)}

          data1[0].youreq.push(obj);
          db.update({_id: req.body.notMine.split("-")[0]}, data1[0], {upsert:true}, function(){
            res.json({});
          });


        });
    });
  });

 app.post('/accepTrade', function(req, res){

   db.find({username: req.session.username}, function(err, data){
     let obj= data[0].youreq.filter(you=> you.id==req.body.id);
     obj=obj[0];

       db.find({username: obj.mine.owner}, function(err, data1){
         let book= data1[0].mybooks.filter(book=> book.id==obj.mine.id);
         book=book[0];
         console.log(data1[0].username);
         book.title=obj.notMine.title;
         book.author=obj.notMine.author;
         data1[0].mybooks=data1[0].mybooks.filter(book=> book.id!=obj.mine.id);
         data1[0].mybooks.push(book);
         console.log(data1[0].mybooks);
         db.update({username: obj.mine.owner}, data1[0], {upsert: true}, function(){
           console.log('working');
         });
       });

       db.find({username: obj.notMine.owner}, function(err, data1){
         let book= data1[0].mybooks.filter(book=> book.id==obj.notMine.id);
         book= book[0];
         console.log(data1[0].username);
         book.title= obj.mine.title;
         book.author= obj.mine.author;
         data1[0].mybooks=data1[0].mybooks.filter(book=> book.id!=obj.notMine.id);
         data1[0].mybooks.push(book);
         data1[0].youreq= data1[0].youreq.filter(you=> you.notMine.title!=obj.notMine.title);
         console.log(data1[0]);
         db.update({username: obj.notMine.owner}, data1[0], {upsert: true}, function(){
            console.log('working');
         });
       });





   });
   res.json({mess: ""});
 });

 app.delete('/declineTrade', function(req, res){
   db.find({username: req.session.username}, function(err, data){
     data[0].youreq= data[0].youreq.filter(you=> you.id!=req.body.id);
     db.update({username: req.session.username}, data[0], {upsert: true}, function(){
       db.find({username: req.session.username}, function(err, data1){
         res.json({arr: data1.youreq});
       });
     });
   });
 });




  app.delete('/deleteBook', function(req, res){
    db.find({_id: req.body.id.split("-")[0]}, function(err, data){
      data[0].mybooks=  data[0].mybooks.filter(book=> book.id!==req.body.id);
      db.update({_id: req.body.id.split("-")[0]}, data[0], {upsert: true}, function(){
          res.json({})
      });
    });
  });

}
