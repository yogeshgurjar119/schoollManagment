const express = require("express");
const app = express();
require("dotenv").config();
const authRoute = require("./src/routes/auth");
const schoolRoute = require("./src/routes/school");


const cors = require("cors");

require("./src/config/connection");


app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(express.json());

// Middleware function to trim req.body
app.use((req, res, next) => {
  // Check if the request has a body
  if (req.body) {
    // Trim each value in req.body
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  console.log("HTTP method is " + req.method + ", URL -" + req.url);
  next(); // Proceed to the next middleware or route handler
});

app.use("/api/v1", authRoute);
app.use("/api/v1", schoolRoute);




 app.listen(process.env.PORT, () => {
  console.log(`Admin Backend server is running on:- ${process.env.PORT}`);
});
