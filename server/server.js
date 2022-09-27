const express = require('express');
const cors = require('cors');
const { catRouter } = require('./routes/cat.routes'); 
// Environment vars
const socketio = require('socket.io');
const port = 8000;
//back end
// requiring / importing runs the file!
// This file doesn't need to export anything though, so we need a var.
require('./config/mongoose.config');

// app is a function but it also has key value pairs on it like an object.
const app = express()

/*  
app.use is adding 'middleware':
stuff that happens in the middle of the the request and response.
*/
// req.body undefined without this line
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// avoid CORS error since our front-end is running on a different port
// so our requests are 'cross origin' port 3000 -> 8000
app.use(cors())

//lines 20, 21, and 25 NEED to be before any app.use statements for your routers
//need to add general properties before you add specific routes (otherwise routes)
//wont receive those properties

// Adds all the produdct routes with this url prepended to them.
// If we had another model, we'd do the same with that model's routes.
app.use('/api/cats', catRouter); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<CHANGE HERE


//added const when added io
const server = app.listen(port, () =>
    console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);

//socket io code
console.log("server: ", server)
let connectedClients = 0;
const io = socketio(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders:["*"]
    }
});
console.log(io);
//connection is a reserved word for socket.io
io.on("connection", socket=>{
    connectedClients++;
    console.log("New client arrived!")
    socket.broadcast.emit("new_connection", {msg: "someone new has arrived!"});
})