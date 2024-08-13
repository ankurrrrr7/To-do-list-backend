
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  
  
  let todos = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Read a book", completed: true }
  ]
  
  app.get("/todos", function(req, res){
    res.status(200).json(todos);
  })
  app.get("/todos/:id", function(req, res){
      const id = parseInt(req.params.id);
      const todo = todos.find(function(items){
        return items.id == id;
      })
      if(!todo){
        res.status(404).send("Not Found");
      }
      else{
        res.status(200).json(todo);
      }
      
  })
  app.use(bodyParser.json());
  app.post("/todos", function(req, res){
    console.log('Received a POST request');
    console.log('Request body:', req.body);
   const newtodo ={
     id: Math.floor(Math.random()*1000000),
     title: req.body.title,
     description: req.body.description
   };
      todos.push(newtodo);
      res.status(201).json(newtodo)
  });

  app.put("/todos/:id",function(req, res){
    const id = parseInt(req.params.id);
    const todo = todos.find(function(items){ return items.id == id})
    if(todo){
      todo.title = req.body.title;
      todo.description = req.body.description;
      res.json(todo);
     }
     else{
      res.status(404).send("Synatx error");
     }
  })
  app.delete("/todos/:id", function(req, res){
    const id = parseInt(req.params.id);
    const todo =todos.findIndex(function(items){
      return items.id == id;
    })
    if(todo === -1 ){
      res.status(404).send();
    }
    else{
      let ans = todos.splice(todo ,1);
      res.status(200).send(ans);
    }
  })
  app.listen(3000)


 
  module.exports = app;