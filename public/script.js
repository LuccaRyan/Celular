const socket = io();
const button = document.getElementById('toggleButton');

// Atualiza estado inicial
socket.on('screenState', (isScreenBlack) => {
    if (isScreenBlack) {
        enterBlackoutMode();
    } else {
        exitBlackoutMode();
    }
});

// Alterna o estado ao clicar no botão
button.addEventListener('click', () => {
    const isBlackout = document.body.classList.contains('blackout');
    const newState = !isBlackout;
    socket.emit('toggleScreen', newState);
    if (newState) {
        enterBlackoutMode();
    } else {
        exitBlackoutMode();
    }
});

// Entra no modo blackout
function enterBlackoutMode() {
    document.body.classList.add('blackout');
    button.textContent = 'Ligar Tela do PC';
    button.classList.add('off');
    document.documentElement.requestFullscreen();
}

// Sai do modo blackout
function exitBlackoutMode() {
    document.body.classList.remove('blackout');
    button.textContent = 'Desligar Tela do PC';
    button.classList.remove('off');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}
