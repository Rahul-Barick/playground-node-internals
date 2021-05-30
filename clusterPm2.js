const app = require("express")();
const crypto = require("crypto");

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("Hello Rahul here");
  });
});

app.get("/fast", (req, res) => {
  res.send("This was fast");
});

app.listen(3000);

/**
 * This File should be managed by Pm2 App - cluster management Solution with the help
 * of logical cores of the CPU and not the physical core.
 *
 * Logical cores = Physical cores * no. of threads
 */
