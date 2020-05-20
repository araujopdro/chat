const express = require('express');
const app = express();

const mysql = require('mysql');

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ejs = require("ejs");

const bodyParser = require('body-parser');

/////////////////

var servidor = '177.38.44.3';
var nomeBanco = 'chat';
var usuario = 'pedro';
var senha = 'oxehHa3N';

const connection = mysql.createConnection(
{
  host: servidor,
  user: usuario,
  password: senha,
  database: nomeBanco
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

/////////////////


http.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:'+8080);
});

var chat_history = [];
//var current_users = [];

let statusInput;
let tokenInput;
let socket;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + '/public'));


io.on('connect', (socket) => {
  console.log(socket.id + " " + socket.handshake.query.name +' connected');
  console.log(socket.id + " " + socket.handshake.query.email +' connected');

  socket.broadcast.emit('user connected', socket.handshake.query.name);
  io.to(socket.id).emit('chat history', {ch: chat_history});
  //ADD NAME LOGGED IN TO CHAT HISTORY
  AddToChatHistory(socket.handshake.query.name);

  //current_users.push({"id":socket.id, "name":socket.handshake.query.name, "email":socket.handshake.query.email});
  
  socket.on('chat message', (data) => {
    //ADD MSG LOGGED IN TO CHAT HISTORY
    AddToChatHistory(data);
    io.emit('chat message', data);
  });

  socket.on('disconnect', (reason) => {
    console.log(socket.id+' disconnected');
    //console.log(current_users);
    //var index = current_users.findIndex(x => x.id === socket.id);
    //socket.broadcast.emit('user disconnected', current_users[index].name);
   // current_users.splice(index);
  });
});

///

///
app.get('/', (req, res) => {
  res.render("login");
});


app.get('/login', (req, res) => {
  res.render("login");
});

app.post('/', (req,res) => {
  const {id, fname, lname, email} = req.body;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        res.send({
          "code":403,
          "failed":"error ocurred"
        });
      }
      else{
        connection.query('INSERT INTO users SET ?',{id, fname, lname, email}, function (error, results, fields) {
          if (error) {
            console.log(error)
          } else {
              res.render("login");
            }
        });
      }
    }
  });  
});

app.post('/login', (req,res) => {
  const {email, name, password} = req.body;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0 && password == "transforma1"){
        res.render("chat", results[0]);
      }else if(password != "transforma1"){
        res.send({
          "code":401,
          "success":"Wrong password"
        });
      }else{
        res.send({
          "code":401,
          "success":"User unknown"
        });
      }
    }
  });
});

/////////////
///
function AddToChatHistory(e){
    chat_history.push(e);
    if(chat_history.length > 199){chat_history.splice(0)};
}
















