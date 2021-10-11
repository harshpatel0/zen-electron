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

onmessage = function (oEvent) {
  time = oEvent.data;
  wait(1000);

  time = time - 1;

  formattedTime = format(time);

  this.postMessage(formattedTime);
};
