const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");
const pauseText = document.querySelector("#pauseText");
const dayWeek = document.querySelector("#dayOfWeek");
const dayMonth = document.querySelector("#dayOfMonth");
const amPm = document.querySelector("#amPm");
const watchFrame = document.querySelector(".watchFrame");
const watchFrame2 = document.querySelector(".watchFrame2");
const lightSwitch = document.querySelector(".lightButton");
const modeSwitch = document.querySelector(".modeButton");
const startSwitch = document.querySelector(".startButton");

const week = ["SNU", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const year = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let lightButtonMode = 1;
let modeButtonMode = 1;
let startButtonMode = 1;
let stopWatchMode = 0;

let stopWatchMsec = 0;
let stopWatchSec = 1;
let stopWatchMin = 0;

let varForInterval;

function toTwoDigits(value) {
  return value < 10 ? `0${value}` : value;
}

function sTime() {
  if (startButtonMode) {
    const currentDate = new Date();
    currentDate.getHours() < 12
      ? (amPm.innerHTML = "AM")
      : (amPm.innerHTML = "PM");
    const dayOfWeek = currentDate.getDay();
    dayWeek.innerHTML = week[dayOfWeek];
    dayMonth.innerHTML = `${year[currentDate.getMonth()]} ${toTwoDigits(
      currentDate.getDate()
    )}`;
    hour.innerHTML = `${toTwoDigits(currentDate.getHours())}:`;
    minute.innerHTML = toTwoDigits(currentDate.getMinutes());
    second.innerHTML = toTwoDigits(currentDate.getSeconds());
  }
}

lightSwitch.addEventListener("click", function () {
  if (lightButtonMode) {
    watchFrame.classList.toggle("night-mode2");
    watchFrame2.classList.toggle("night-mode");
  } else {
    resetTimer();
  }
});

modeSwitch.addEventListener("click", function () {
  if (modeButtonMode) {
    startButtonMode = 0;
    resetTimer();
    modeButtonMode = 0;
    lightButtonMode = 0;
  } else {
    startButtonMode = 1;
    amPm.style.fontSize = "30px";
    pauseText.innerHTML = "";
    modeButtonMode = 1;
    lightButtonMode = 1;
    stopStopwatch();
    sTime();
  }
});

startSwitch.addEventListener("click", function () {
  if (!startButtonMode) {
    if (!stopWatchMode && !startButtonMode) {
      startStopwatch();
      pauseText.innerHTML = "pause";
      dayWeek.innerHTML = "Running";
    } else {
      stopStopwatch();
    }
  }
});

function setTimerMsec() {
  second.innerHTML = toTwoDigits(stopWatchMsec);
  stopWatchMsec += 1;
  varForInterval = setTimeout(setTimerMsec, 100);
  if (stopWatchMsec >= 10) {
    setTimerSec();
    stopWatchMsec = 0;
  }
}

function setTimerSec() {
  if (stopWatchSec >= 60) {
    SetTimerMin();
    stopWatchSec = 0;
  }
  stopWatchSec += 1;
  minute.innerHTML = toTwoDigits(stopWatchSec);
}

function SetTimerMin() {
  if (stopWatchMin >= 60) {
    stopWatchMin = 0;
  }
  stopWatchMin += 1;
  hour.innerHTML = `${toTwoDigits(stopWatchMin)}:`;
}

function startStopwatch() {
  if (!stopWatchMode) {
    stopWatchMode = 1;
    setTimerMsec();
  }
}

function stopStopwatch() {
  clearTimeout(varForInterval);
  stopWatchMode = 0;
  if (!startButtonMode) {
    pauseText.innerHTML = "resume";
    dayWeek.innerHTML = "Paused";
  }
}

function resetTimer() {
  stopStopwatch();
  stopWatchMsec = 0;
  stopWatchSec = 0;
  stopWatchMin = 0;
  dayWeek.innerHTML = "Stopwatch";
  dayMonth.innerHTML = "";
  amPm.style.fontSize = "20px";
  amPm.innerHTML = "reset";
  hour.innerHTML = "00:";
  minute.innerHTML = "00";
  second.innerHTML = "00";
  pauseText.innerHTML = "start";
}

setInterval(sTime, 1000);
