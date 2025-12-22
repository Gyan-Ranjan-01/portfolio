if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const Portfolio = require("./models/portfolio");

const app = express();

//mongoose middleware
const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/portfolioContact";
mongoose.connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// view engine
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files(css, js and images)
app.use(express.static(path.join(__dirname, "public")));

// routes for main page
app.get("/", (req, res) => {
  res.render("home");
});

// routes for about page
app.get("/about", (req, res) => {
  res.render("about");
});

// routes for projects page
app.get("/projects", (req, res) => {
  res.render("projects");
});

// routes for skills page
app.get("/skills", (req, res) => {
  res.render("skills");
});

// routes for contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", async (req, res, next) => {
  try{
  const { name, email, subject, message } = req.body;
  const newPortfolio = new Portfolio({ name, email, subject, message });
  await newPortfolio.save();
  req.flash("success", "Message sent successfully!");
  res.redirect("/");
}catch (e) {
    next(e);
  };
});

app.use((req, res, next) => {
  next(new Error("Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  req.flash("error", err.message);
  res.redirect("/"); 
});


// server listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
