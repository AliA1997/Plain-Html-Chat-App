const express = require('express');
const app = express();
const socket = require('socket.io');
const PORT = 10000;

let server = app.listen(PORT, function(){
  console.log('Listening for request at ', PORT);
});

//Static files
 app.use(express.static('public'));


//Socket Setup
let io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id);
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  })

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  })
});
