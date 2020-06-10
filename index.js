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
var current_users = [];

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
  var user = socket.handshake.query;

  io.to(socket.id).emit('chat history', {ch: chat_history});

  socket.on('chat message', (data) => {
    //ADD MSG LOGGED IN TO CHAT HISTORY
    AddToChatHistory(data);
    io.emit('chat message', data);
  });

  socket.on('kill all', (data) => {
    io.emit('kill all');
  });

  socket.on('clear chat', (data) => {
    chat_history = [];
    io.emit('clear chat');
  });


  socket.on('disconnect', (reason) => {
    console.log(socket.id+' disconnected');
    var index = current_users.findIndex(x => x.id === socket.id);
    //socket.broadcast.emit('user disconnected', current_users[index].name);
    current_users.splice(index);
  });

  console.log(current_users);
});

///

app.get('/', (req,res) => {
  res.render("login");
});

///
app.post('/login', (req,res) => {
  const {email} = req.body;
  let date = new Date();
  var user;
  connection.query('SELECT * FROM vivaz WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log("achou o email q a pessoa digitou pra entrar");
      if(results.length == 1){
        user = results[0]; 
        connection.query('UPDATE vivaz SET data = ? WHERE id = ?', [date, user.id], async function (error, results, fields) {
          if (error) {
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
          }else{
            console.log("loggado e data registrada");
            res.render("chat", user);
          } 
        });
      }else{
        console.log("usuario n passou");
        res.render("login_user");
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















