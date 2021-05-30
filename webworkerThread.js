const app = require("express")();
const Worker = require("webworker-threads");

app.get("/", (req, res) => {
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;

      while (counter < 1e9) {
        counter += 1;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function (message) {
    console.log(message);
    res.send("" + message.data);
  };

  worker.postmessage();
});

app.listen(3000);

/**
 * var Worker = require('webworker-threads').Worker;
 
// You may also pass in a function:
var worker = new Worker(function(){
  postMessage("I'm working before postMessage('ali').");
  this.onmessage = function(event) {
    postMessage('Hi ' + event.data);
    self.close();
  };
});
worker.onmessage = function(event) {
  console.log("Worker said : " + event.data);
};
worker.postMessage('ali');
 */
