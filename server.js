const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true } });
app.use(express.static(path.join(__dirname)));
app.get('/health', (_req, res) => res.json({ ok: true, app: 'The Legends Voice' }));
const rooms = new Map();
io.on('connection', socket => {
  socket.on('voice:join', ({ name, room }) => {
    if (!room || typeof room !== 'string') return;
    socket.data.voiceRoom = room; socket.data.voiceName = String(name || 'Legend').slice(0,24);
    const members = rooms.get(room) || new Map();
    const peers = [...members.entries()].map(([id, p]) => ({ id, name: p.name }));
    socket.join(room); socket.emit('voice:peers', peers);
    members.set(socket.id, { name: socket.data.voiceName }); rooms.set(room, members);
    socket.to(room).emit('voice:new-peer', { id: socket.id, name: socket.data.voiceName });
  });
  socket.on('voice:signal', ({ to, signal }) => {
    if (typeof to === 'string' && signal) io.to(to).emit('voice:signal', { from: socket.id, signal, name: socket.data.voiceName });
  });
  const leave = () => { const room=socket.data.voiceRoom; if(!room)return; const members=rooms.get(room); if(members){members.delete(socket.id);socket.to(room).emit('voice:peer-left',{id:socket.id});if(!members.size)rooms.delete(room)}socket.leave(room);socket.data.voiceRoom=null; };
  socket.on('voice:leave', leave); socket.on('disconnect', leave);
});
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`The Legends is running on port ${port}`));
