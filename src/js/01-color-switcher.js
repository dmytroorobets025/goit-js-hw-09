
const refs = {
    body: document.querySelector('body'),
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
};

let timer = null;

refs.stopButton.addEventListener('click', stopClick);
refs.startButton.addEventListener('click', startClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)}`;
}

function startClick() {
    console.log('start');
    timer = setInterval(() => {
        let color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
    }, 1000);
    refs.startButton.disabled = 'disabled';
    refs.stopButton.disabled = '';
}

function stopClick() {
    console.log('stop');
    clearInterval(timer);
    refs.startButton.disabled = '';
    refs.stopButton.disabled = 'disabled';
}