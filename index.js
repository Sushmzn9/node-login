import express from "express";
const app = express();
const PORT = 8000;
import path from "path";
import fs, { readFile } from "fs";
const __dirname = path.resolve();
const fn = __dirname + "/userList.csv";

//middlewear
app.use(express.urlencoded());

//root router, home page

app.get("/register", (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + "/regform.html");
});

// app.get("/register", (req, res) => {
//   console.log(req.query);
//   res.send("<h1>Your are in the Login </h1>");
// });

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const str = `${email}, ${password}\n`;
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error.message) : console.log("added to the file");
  });
  res.send(`Registered
  <a href= "/">
  <button>Home</button></a>
  `);
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = `${email}, ${password}`;

  //readfile

  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);
    const userStr = data.toString();
    const userArg = userStr.split("\n");

    if (userArg.includes(str)) {
      res.send("<h1>Login in Successful</h1>");
    } else {
      res.send("<h1>Login Invalid</h1>");
    }
  });
});

app.get("/", (req, res) => {
  console.log("received request to home router");
  res.send(`<h1>Your are in the home page</h1>
  <a href="/register">
  <button>Register Now</button></a>
  

  <a href="/login">
  <button>Login Now</button></a>
  
  
  
  
  `);
});

// make out server avaiabile on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
