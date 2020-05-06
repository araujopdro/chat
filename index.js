const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const ejs = require("ejs");
const bodyParser = require('body-parser');

http.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:'+8080);
});

var chat_history = [];
var current_users = [];

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");

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
  res.render("login");
});

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
