const express = require('express');
const app = express();

const mysql = require('mysql');

const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ejs = require("ejs");

const bodyParser = require('body-parser');

/////////////////

var connection = mysql.createConnection({
  host: 'webcastlogin.vocsmultimidia.com.br',
  database: 'webcastlogin',
  user: 'webcastlogin',
  password: '120705'
});

connection.connect(function(error){
  if(!error) {
    console.log("Database is connected ... nn");
  } else {
    console.log(error);
    console.log("Error connecting database ... nn");
  }
});

/////////////////


http.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:'+8080);
});

var chat_history = [];
var current_users = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


io.on('connection', (socket) => {
  console.log(socket.id+' connected');
  socket.broadcast.emit('user connected', socket.handshake.query.name);
  io.to(socket.id).emit('chat history', {ch: chat_history});

  AddToChatHistory(socket.handshake.query.name);
  current_users.push({"id":socket.id, "name":socket.handshake.query.name});
  
  socket.on('chat message', (data) => {
    AddToChatHistory(data);
    io.emit('chat message', data);
  });

  socket.on('disconnect', (reason) => {
    console.log(socket.id+' disconnected');
    console.log(current_users);
    var index = current_users.findIndex(x => x.id === socket.id);
    console.log(index);
    socket.broadcast.emit('user disconnected', current_users[index].name);
   // current_users.splice(index);
    console.log(reason);
  });
});

///
app.get('/', (req, res) => {
  res.render("register");
});

app.post('/', (req,res) => {
  const {fname, lname, email} = req.body;

  // connection.execute("INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",[user_name, user_email, hash_pass])
  // .then(result => {
  //     res.send(`your account has been created successfully, Now you can <a href="/">Login</a>`);
  // }).catch(err => {
  //     if (err) throw err;
  // });
});

app.post('/login', (req,res) => {
  const {fname, lname, email} = req.body;
  
  // connection.execute("SELECT * FROM `users` WHERE `email`=?",[email])
  // .then(([rows]) => {
  //     bcrypt.compare(user_pass, rows[0].password).then(compare_result => {
  //         if(compare_result === true){
  //             req.session.isLoggedIn = true;
  //             req.session.userID = rows[0].id;

  //             res.redirect('/');
  //         }
  //         else{
  //             res.render('login-register',{
  //                 login_errors:['Invalid Password!']
  //             });
  //         }
  //     })
  //     .catch(err => {
  //         if (err) throw err;
  //     });


  // })
  // .catch(err => {
  //     if (err) throw err;
  // });
});




/////////////

var latest_user;
app.post("/chat-room", (req, res) => {
  latest_user = req.body.fname + " " + req.body.lname;
  res.render("chat", req.body);
});

///
function AddToChatHistory(e){
    chat_history.push(e);
    if(chat_history.length > 199){chat_history.splice(0)};
}
