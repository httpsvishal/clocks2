const alarmForm = document.getElementById("alarm");
const timeOfAlarm = document.getElementById("timeOfAlarm");
let setStopwatch = document.getElementById("startstopwatchTimer");
let stopStopwatch = document.getElementById("stopstopwatchTimer");
let resetStopwatch = document.getElementById("resetwatchTimer");
let stopwatchDisplays = document.getElementsByClassName("stopWatchDisplays");
let timerform = document.getElementById("timerform");
let stopTimer = document.getElementById("stopTimer");
let startTimer = document.getElementById("setTimer");
let resetTimer = document.getElementById("resetTimer");
let timerDuration = document.getElementById("timerDuration");


stopTimer.remove();

const alertUser = () => {
    let audio = document.createElement("audio");
    audio.setAttribute("autoplay", true);
    audio.setAttribute("loop", true)
    audio.setAttribute("controls", true)
    let source = document.createElement("source");
    source.setAttribute("src", "./assets/alarm-audio.mp3");
    audio.append(source);
    alarmForm.append(audio);
    console.log("hey");
}

let setAlarm;
const handleSetAlarm = (e) => {
    e.preventDefault();
    console.log(timeOfAlarm.value);
    const currTime = new Date();
    const alarmTime = timeOfAlarm.value.split(":");
    const alarmHours = alarmTime[0];
    const alarmMinutes = alarmTime[1];
    let hoursLeft = alarmHours - currTime.getHours();
    if (hoursLeft < 0) hoursLeft += 24;
    const MinutesLeft = alarmMinutes - currTime.getMinutes();
    console.log(hoursLeft, MinutesLeft);
    const totalminutes = (hoursLeft * 60) + MinutesLeft; // it works in either cases for ex- curr  = 4:10 and alaram = 5:05 then hour = 5-4  = 1 && min = 5-10 = -5 && now total min = 1*60 + (-5) = 55;
    setAlarm = setTimeout(alertUser, totalminutes * 60000)
}

alarmForm.addEventListener("submit", handleSetAlarm);

let stopwatchTimerMinutes = 0;
let stopwatchTimerHours = 0;
let stopwatchTimerseconds = 0;
let stopwatchTimerms = 0;

let increaseStopwatchTimer = () => {
    stopwatchTimerms++;
    if (stopwatchTimerms == 1000) {
        stopwatchTimerms = 0;
        stopwatchTimerseconds++;
    }
    if (stopwatchTimerseconds == 60) {
        stopwatchTimerseconds = 0;
        stopwatchTimerMinutes++;
    }
    if (stopwatchTimerMinutes == 60) {
        stopwatchTimerMinutes = 0;
        stopwatchTimerHours++;
    }
    showStopwatchTimer();
};

let showStopwatchTimer = () => {
    stopwatchDisplays[0].innerText = stopwatchTimerHours;
    stopwatchDisplays[1].innerText = stopwatchTimerMinutes;
    stopwatchDisplays[2].innerText = stopwatchTimerseconds;
    stopwatchDisplays[3].innerText = stopwatchTimerms;
}

let playTimerStopwatch
let startTimerStopwatch = () => {
    clearInterval(playTimerStopwatch);
    playTimerStopwatch = setInterval(increaseStopwatchTimer, 1);
}

setStopwatch.addEventListener("click", startTimerStopwatch);

let pauseTimerStopatch = () => {
    clearInterval(playTimerStopwatch);
}

stopStopwatch.addEventListener("click", pauseTimerStopatch);

resetStopwatch.addEventListener("click", () => {
    stopwatchTimerMinutes = 0;
    stopwatchTimerHours = 0;
    stopwatchTimerseconds = 0;
    stopwatchTimerms = 0;
    showStopwatchTimer();
})

let remainingDuration;

let alertAboutTimer = () => {
    let p = document.createElement("p");
    p.innerText = "Timer is over buddy!!";
    timerform.append(p);
}

const p = document.createElement("p");
let hourSpan = document.createElement("span");
let minuteSpan = document.createElement("span");
let secondSpan = document.createElement("span");
let timerHours = 0;
let timerMinutes = 0;
let timerSeconds = 0;

let decrement;

let pauseTimer = () => {
    clearInterval(decrement);
    stopTimer.remove();
    timerform.append(startTimer);
}

let decreaseTimer = () => {
    timerSeconds--;
    if (timerSeconds < 0) {
        timerSeconds = 59;
        if (timerMinutes > 0)
            timerMinutes--;
        else {
            timerMinutes = 0
        }
    }
    if (timerMinutes < 0) {
        timerMinutes = 59;
        if (timerHours > 0)
            timerHours--;
        else {
            timerMinutes = 0;
            timerHours = 0;
        }
    }
    if (timerMinutes == 0 && timerHours == 0 && timerSeconds == 0) {
        alertAboutTimer();
        pauseTimer();
    }
    showTimer();
}


let showTimer = () => {
    hourSpan.innerText = timerHours;
    minuteSpan.innerText = timerMinutes;
    secondSpan.innerText = timerSeconds;
    remainingDuration[0] = timerHours.toString().padStart(2,'0');
    remainingDuration[1] = timerMinutes.toString().padStart(2,'0');
    remainingDuration[2] = timerSeconds.toString().padStart(2,'0');
    timerDuration.value = remainingDuration.join(':');
}

let setTimer = (e) => {
    e.preventDefault();
    console.log(timerDuration.value);
    remainingDuration = timerDuration.value.split(':');
    timerHours = (remainingDuration[0] != "00") ? remainingDuration[0] : 0;
    timerMinutes = (remainingDuration[1] != "00") ? remainingDuration[1] :0;
    timerSeconds = (remainingDuration[2] != "00") ? remainingDuration[2] : 0;
    showTimer();
    startTimer.remove();
    timerform.append(stopTimer);
    decrement = setInterval(decreaseTimer, 100);
}

timerform.addEventListener("submit", setTimer)

stopTimer.addEventListener("click", pauseTimer);