// All of this is the timer code

function format(time) {
  // Hours, minutes and seconds
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

var timerWorker = new Worker("scripts/timer.js");

var timer = new Vue({
  el: "#timerComponent",
  data: {
    countdown: "00:00",
    status: "Start a new topic, project or what have you",
    description: "Press one of these button to start the timer",
  },

  methods: {
    startFocus: function () {
      const focusTime = 1500;

      var tempTime = focusTime;
      this.status = "Time to focus!";
      this.description =
        "This is the best time to start what you need to get done as you are more focused after breaks or when starting to focus";

      timerWorker.postMessage(1500);
      tempTime = 1500;

      countdown = timerWorker.onmessage = function (oEvent) {
        if (tempTime == 0) {
          timerWorker.postMessage(tempTime);
        } else {
          tempTime = tempTime - 1;
          timerWorker.postMessage(tempTime);
        }

        if (oEvent.data == "0:00") {
          Push.create("Focus Time is over", {
            body: "Focus time is over, go back to the app to start your short break, if this is your 4th Focus Time, start a long break",
            onclick: function () {
              window.focus();
              this.close();
            },
          });
        }

        timer.countdown = oEvent.data;
      };
    },
    startShortBreak: function () {
      const shortBreak = 300;

      var tempTime = shortBreak;
      this.status = "Time to take a short break!";
      this.description =
        "Do some stretches or some exercises, or just cool your mind down";

      timerWorker.postMessage(300);
      tempTime = 300;

      // 300

      countdown = timerWorker.onmessage = function (oEvent) {
        if (tempTime == 0) {
          timerWorker.postMessage(tempTime);
        } else {
          tempTime = tempTime - 1;
          timerWorker.postMessage(tempTime);
        }

        if (oEvent.data == "0:00") {
          Push.create("Short Break is over", {
            body: "Your short break is over, go back to the app to start your Focus Time",
            onclick: function () {
              window.focus();
              this.close();
            },
          });
        }

        timer.countdown = oEvent.data;
      };
    },
    startLongBreak: function () {
      const longBreak = 900;
      this.status = "Time to take a nice long break!";
      this.description =
        "Sometimes you need a longer break, use this time to get something done, if you are going to use your phone, don't get distracted by it";

      timerWorker.postMessage(900);
      tempTime = 900;

      countdown = timerWorker.onmessage = function (oEvent) {
        if (tempTime == 0) {
          timerWorker.postMessage(tempTime);
        } else {
          tempTime = tempTime - 1;
          timerWorker.postMessage(tempTime);
        }

        if (oEvent.data == "0:00") {
          Push.create("Long Break is over", {
            body: "Your long break is over, go back to the app to start your Focus Time",
            onclick: function () {
              window.focus();
              this.close();
            },
          });
        }

        timer.countdown = oEvent.data;
      };
    },
  },
});

// Timer code ends here

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
