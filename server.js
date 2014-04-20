//server.js

  // set up 
  var express     = require('express');
  var app         = express();
  var mongoose    = require('mongoose');

  mongoose.connect('mongodb://localhost/todo');

  app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
  });


  app.listen(8000);
  console.log("App listening on port 8000");


  var Todo = mongoose.model('Todo', {
    text: String
  });


  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
      if (err) {
        return res.send(err);
      }

      res.json(todos);
    });
  });

  app.post('/api/todos', function(req, res) {
    console.log('req.body.text: ' + req.body.text);
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err, todo) {
      if(err) {
        return res.send(err);
      }

      Todo.find(function(err, todos) {
        if(err) {
          return res.send(err);
        }

        res.json(todos);
      });
    });
  });

  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if(err) {
        return res.send(err);
      }
      Todo.find(function(err, todos) {
        if(err) {
          return res.send(err);
        }

        res.json(todos);
      });
    });
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });