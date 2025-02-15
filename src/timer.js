// https://www.geeksforgeeks.org/how-to-create-stopwatch-using-html-css-and-javascript/
// https://www.tutorialspoint.com/how-to-create-stopwatch-using-html-css-and-javascript

let timer;
let seconds = 0;
let isRunning = false;

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(seconds);
    saveTimerToLocalStorage();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }
}

function stopTimer(reset = false) {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        if (reset) {
            seconds = 0;
        }
        updateTimer();
    }
    else {
        if (reset) {
            seconds = 0;
            updateTimer();
        }
    }
}

function resetTimer() {
    stopTimer(true);
}

function saveTimerToLocalStorage() {
    //console.debug("Saving timer to local storage");
    localStorage.setItem('timerSeconds', seconds);
    localStorage.setItem('timerIsRunning', isRunning);
}

function loadTimerFromLocalStorage() {
    //console.debug("Loading timer from local storage");
    const savedSeconds = localStorage.getItem('timerSeconds');
    const savedIsRunning = localStorage.getItem('timerIsRunning');

    if (savedSeconds !== null) {
        seconds = parseInt(savedSeconds, 10);

        if (savedIsRunning === 'true') {
            startTimer();
        } else {
            updateTimer();
        }
    }
}