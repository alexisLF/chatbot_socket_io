const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


const io = require('socket.io')(server, {
    cors: {
      origin: "http://127.0.0.1:3000",
      methods: ["GET", "POST"]
    }
})
  
// Établissement de la connexion à Socket.io
io.on('connection', (socket) =>{
   
  socket.on('send-message', (msg) =>{
    
    io.in(msg.conference._id).emit('receive-message', msg);
  });

  socket.on('join', (room) => {

    socket.join(room._id);

  });
})

server.listen(port);

function msgObjectUpdated(type, item) {
  switch (type) {
    case "add":
      fetch(`${server}/api/messages`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then(res => res.json())
      .then(json => item._id = json.response);
      break;
    case "edit":
      fetch(`${server}/api/messages/${item.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      break;
    case "delete":
      fetch(`${server}/api/visits/${item.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      break;
    default:
      break;
  }
}