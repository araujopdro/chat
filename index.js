const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var port = process.env.PORT || 3000;
app.listen(port);

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");

http.listen(process.env.PORT || 8080, () => {
  console.log('listening on *:'+8080);
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (data) => {
    console.log(data);
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


///

app.get('/', (req, res) => {
  res.render("login");
});

var user_data;
app.post("/chat-room", (req, res) => {
  console.log(req);
  res.render("chat", req.body);
});

