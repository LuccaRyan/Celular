const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para bloquear a tela
app.post('/lock', (req, res) => {
  exec('rundll32.exe user32.dll,LockWorkStation', (err, stdout, stderr) => {
    if (err) {
      res.status(500).send('Erro ao bloquear a tela');
      return;
    }
    res.send('Tela bloqueada com sucesso');
  });
});

// Configurar a porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
