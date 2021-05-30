process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");
const crypto = require("crypto");

//Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
} else {
  // I am a child and I am going to act as server
  const app = require("express")();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi I am up!");
    });
  });

  app.listen(3000);
}
