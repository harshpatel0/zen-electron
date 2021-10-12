const defaultFocusTime = 1500;
const defaultShortBreakTime = 300;
const defaultLongBreakTime = 900;

const timerWorker = new Worker("scripts/timer.js");

var sentNotification = false;

var timer = new Vue({
  el: "#timerComponent",
  data: {
    // Data
    countdown: "0:00",
    status: "Start a new topic, project or what have you",
    description: "Press one of these button to start the timer",

    // Timings
    focusTime: 1500, // 25 Minutes, default is 1500
    shortBreakTime: 300, // 5 Minutes, default is 300
    longBreakTime: 900, // 15 Minutes, default is 900
  },

  methods: {
    // Type 1 = Focus Timer
    // Type 2 = Short Break
    // Type 3 = Long Break

    startTimer: function (type) {
      if (type == 0) {
        this.status = "Time to focus!";
        this.description =
          "This is the best time to start what you need to get done as you are more focused after breaks or when starting to focus";
        var time = this.focusTime;
      }
      if (type == 1) {
        this.status = "Time to take a short break!";
        this.description =
          "Do some stretches or some exercises, or just cool your mind down";
        var time = this.shortBreakTime;
      }
      if (type == 2) {
        this.status = "Time to take a nice long break!";
        this.description =
          "Sometimes you need a longer break, use this time to get something done, if you are going to use your phone, don't get distracted by it";
        var time = this.longBreakTime;
      }

      timerWorker.postMessage(time);

      countdown = timerWorker.onmessage = function (oEvent) {
        if (time == 0) {
          timerWorker.postMessage(time);
        } else {
          time = time - 1;
          timerWorker.postMessage(time);
        }

        if (oEvent.data == "0:00") {
          // YandereSim Code moment right here

          if (sentNotification == true) {
            var temp = "temp";
          } else {
            if (type == 0) {
              console.log(sentNotification);
              sentNotification = true;
              console.log(sentNotification);

              Push.create("Focus Time is over", {
                body: "Focus time is over, go back to the app to start your short break, if this is your 4th Focus Time, start a long break",
                onclick: function () {
                  window.focus();
                  this.close();
                },
              });
            } else if (type == 1) {
              sentNotification = true;

              Push.create("Short Break is over", {
                body: "Your short break is over, go back to the app to start your Focus Time",
                onclick: function () {
                  window.focus();
                  this.close();
                },
              });
            } else if (type == 2) {
              sentNotification = true;

              Push.create("Long Break is over", {
                body: "Your long break is over, go back to the app to start your Focus Time",
                onclick: function () {
                  window.focus();
                  this.close();
                },
              });
            }
          }
        }

        timer.countdown = oEvent.data;
      };
    },

    changeTimings: function (newTime, type) {},
  },
});

// Timer code ends here

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

applyColourScheme();
