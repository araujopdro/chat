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

  current_users.push({
    "id": user.id,
    "socket_id": socket.id
  });

  socket.on('chat message', (data) => {
    //ADD MSG LOGGED IN TO CHAT HISTORY
    AddToChatHistory(data);
    io.emit('chat message', data);
  });

  socket.on('show modal', (data) => {
    io.emit('show modal');
  });

  socket.on('show download', (data) => {
    io.emit('show download');
  });

  socket.on('clear chat', (data) => {
    chat_history = [];
    io.emit('clear chat');
  });


  socket.on('disconnect', (reason) => {
    var index = current_users.findIndex(x => x.socket_id === socket.id);
    console.log("disconnected: "+socket.id)
    //socket.broadcast.emit('user disconnected', current_users[index].name);
    current_users.splice(index);
  });
});

///

app.get('/', (req,res) => {
  res.render("wait");
});

///
app.post('/login', (req,res) => {
  const email = req.body.email.toUpperCase();
  let date = new Date();
  var user;
  connection.query('SELECT * FROM vivaz WHERE UPPER(email) = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length > 0){
        user = results[0]; 
        var index = -1;
        console.log("cur length: "+current_users.length);
        for(var i = 0; i < current_users.length; i++){
          console.log("cur id: "+current_users[i].id);
          console.log("user id: "+user.id);
          if(current_users[i].id == user.id.toString()){
            index = i;
          }
        }
        console.log("index: "+index);
        if(index == -1){
          connection.query('UPDATE vivaz SET data = ? WHERE id = ?', [date, user.id], async function (error, results, fields) {
            if (error) {
              res.send({
                "code":400,
                "failed":"error ocurred"
              })
            }else{
              if(user.email == "admin@vocs.tv"){
                res.render("chat-admin", user);
              }else{
                res.render("chat", user);
              }
            } 
          });
        }else{
          res.render("login_user");
        }
      }else{
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















