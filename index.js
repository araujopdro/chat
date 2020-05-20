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

  if(user.moderator != 2){
    //socket.broadcast.emit('user connected', user.name);
  }
  
  io.to(socket.id).emit('chat history', {ch: chat_history});

  if(user.moderator != 2){
    //AddToChatHistory(socket.handshake.query.name);
  }
  current_users.push(user);

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

///

app.get('/usuarios_logados', (req, res) => {
  res.send(current_users);
});

app.get('*', (req, res) => {
  res.render("login");
});




app.post('/', (req,res) => {
  const {id, name, company, email} = req.body;
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
        connection.query('INSERT INTO users SET ?',{id, name, company, email}, function (error, results, fields) {
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
  const {email, password} = req.body;
  var user;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length == 1){
        user = results[0];
        if(user.password == password){
          //connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
          connection.query('UPDATE users SET logged = ? WHERE id = ?', [1, user.id], async function (error, results, fields) {
            if (error) {
              res.send({
                "code":400,
                "failed":"error ocurred"
              })
            }
            else{
              console.log("loggado");
              if(user.moderator == 2){
                user.logged = 1;
                res.render("chat-admin", user);
              }else if(user.moderator == 4){
                console.log("super user")
                var _logged = 0;
                connection.query('SELECT * FROM users WHERE moderator = ?',[0], async function (error, results, fields) {
                   if (error) {
                    console.log(error)
                      res.send({
                        "code":400,
                        "failed":"error ocurred"
                      })
                  }else{
                    res.render("report", {data: results});
                  }
                });
              }else{
                user.logged = 1;
                res.render("chat", user);
              }
            } 
          });
        }else{
          console.log("errou a senha");
          res.render("login_pass");
        }
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
















