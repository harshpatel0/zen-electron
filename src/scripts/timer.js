function format(time) {
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = "";
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

// Code stolen from https://code.labstack.com/HVdZZYqH

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

// It gets the time from the main function, waits for one second, formats the time and sends it
onmessage = function (oEvent) {
  time = oEvent.data;
  wait(1000);

  formattedTime = format(time);
  this.postMessage(formattedTime);
};
