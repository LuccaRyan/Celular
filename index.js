const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let isScreenBlack = false; // Estado inicial

// Servir arquivos estáticos
app.use(express.static('public'));

// WebSocket para sincronização
io.on('connection', (socket) => {
    console.log('Novo cliente conectado.');

    // Envia estado inicial ao cliente
    socket.emit('screenState', isScreenBlack);

    // Escuta mudança de estado
    socket.on('toggleScreen', (state) => {
        isScreenBlack = state;
        io.emit('screenState', isScreenBlack); // Notifica todos os clientes
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
});

// Inicia o servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
