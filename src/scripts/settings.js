var focusTime = 1500;
var shortBreakTime = 300;
var longBreakTime = 900;

const focusTimeInput = document.getElementById("focusTimeInput");
const shortBreakTimeInput = document.getElementById("shortBreakTimeInput");
const longBreakTimeInput = document.getElementById("longBreakTimeInput");

var settings = new Vue({
  el: "#settings",
  data: {
    focusTime: focusTime,
    shortBreakTime: shortBreakTime,
    longBreakTime: longBreakTime,
  },
});

function changeValue(type) {
  if (type == 0) {
    var value = document.getElementById("focusTimeInput").value;
    // console.log(value);
    settings.focusTime = value;
    focusTime = value;
    localStorage.setItem("focusTime", value);
  }
  if (type == 1) {
    var value = document.getElementById("shortBreakTimeInput").value;

    // console.log(value);
    settings.shortBreakTime = value;
    shortBreakTime = value;
    localStorage.setItem("shortBreakTime", value);
  }
  if (type == 2) {
    var value = document.getElementById("longBreakTimeInput").value;

    // console.log(value);
    settings.longBreakTime = value;
    longBreakTime = value;
    localStorage.setItem("longBreakTime", value);
  }
  // console.log(focusTime);
  // console.log(shortBreakTime);
  // console.log(longBreakTime);
}

function applyColourScheme() {
  const body = document.getElementById("body");

  const preferredColourScheme = window.matchMedia(
    "(prefers-color-scheme: light)"
  );

  if (preferredColourScheme.matches) {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
  }
}
function loadTimings() {
  // Loads timings from LocalStorage
  focusTime = localStorage.getItem("focusTime");
  shortBreakTime = localStorage.getItem("shortBreakTime");
  longBreakTime = localStorage.getItem("longBreakTime");

  // console.log(localStorage);

  // If the LocalStorage returns null, default values are used and stored in LocalStorage
  if (localStorage.length == 0) {
    console.log("Rebuilding LocalStorage");
    localStorage.setItem("focusTime", 1500);
    localStorage.setItem("shortBreakTime", 300);
    localStorage.setItem("longBreakTime", 900);
  }
}

applyColourScheme();
loadTimings();

// console.log(focusTime);
// console.log(shortBreakTime);
// console.log(longBreakTime);
