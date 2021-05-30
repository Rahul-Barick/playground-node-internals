const cluster = require("cluster");

function doSomething(duration) {
  const start = Date.now();

  while (Date.now() - start < duration) {
    console.log("I am blocked on event loop ****");
  }
}

//Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();

} else {
  // I am a child and I am going to act as server
  const app = require("express")();

  app.get("/", (req, res) => {
    doSomething(5000);
    res.send("Hi I am up!");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast");
  });

  app.listen(3000);
}
