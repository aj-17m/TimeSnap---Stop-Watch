let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay(time) {
    display.textContent = formatTime(time);
}

function startStop() {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            updateDisplay(Date.now() - startTime + elapsedTime);
        }, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('stop');
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    lapNumber = 0;
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    updateDisplay(elapsedTime);
    lapsList.innerHTML = '';
}

function addLap() {
    if (!running) return;

    if (lapNumber < 10) {
        lapNumber++;
        const lapTime = formatTime(Date.now() - startTime + elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapsList.scrollTop = lapsList.scrollHeight; // Auto-scroll to latest
    } else {
        alert('Maximum of 10 laps reached.');
    }
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

// Initialize display
updateDisplay(elapsedTime);
