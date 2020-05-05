const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var port = process.env.PORT || 8080;
app.listen(port);

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");

var user;

app.get('/', (req, res) => {
  res.render("login");
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post("/handle-form-data", (req, res) => {
  user.first_name = req.body.fname;
  user.last_name = req.body.lname;

  res.render('testPage', {
    first_name:req.body.fname,
    last_name:req.body.lname
  });
});

http.listen(8080, () => {
	console.log('listening on *:8080');
});