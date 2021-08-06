const express = require('express');
const app = express();

let newId = 3; 

let users = [
  {
    nome: "gianni",
    cognome: "de luigi",
    id: 0,
    email: "gianni@gmail.com",

  },{
    nome: "aldo",
    cognome: "ceruti",
    id: 1,
    email: "aldo@gmail.com",
  },{
    nome: "franco",
    cognome: "lodigiani",
    id: 2,
    email: "franco@gmail.com",
  },
];


// Middleware Here
app.use(express.json({limit: '50mb'}));

const cors = require('cors');
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'x-auth-token'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.get('/', (req, res) =>{
res.send("Funziona!");
});

app.post('/users', (req, res) =>{
 
  let user = { 
    nome: req.body.nome,
    cognome: req.body.cognome,
    id: newId,
    email: req.body.email ,
  }; 
  users.push(user);
  newId ++;
  return res.send(user);
  });

  app.post('/users/:id', (req, res) =>{ 
    let el= findEl(req.params.id);
    if(!el) return res.status(404).send("elemento inesistente")
    for (let prop in req.body) {
      el [prop] = req.body [prop];
    }
    res.send(el);
    });


app.get('/users', (req, res) =>{
  res.send(users);
  });

  app.get('/users/:id', (req, res) =>{
    let el= findEl(req.params.id);
    if(!el) return res.status(404).send("elemento inesistente")
    res.send(el);
    });

    app.delete('/users/:id', (req, res) =>{
      let el= findEl(req.params.id);
      if(!el) return res.status(404).send("elemento inesistente")
      users.map((user,id)=> {
        if(user.id == el.id) users.splice(id, 1)
      })
      res.send({status:"ok"});

      });
  app.post('/users/:id', (req, res) =>{
    
    });

// server start
app.listen(8080, () => console.log(`ok`));

function findEl(id)
{
  for( let user of users )
    if( user.id== id)
    {
      return user; 
    }
    return null;
}