const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const colors = require("colors");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
// --------
// --------------
// ---------------------
// --------------------------
// -------------------------------
// --------------------------
// ---------------------
// --------------
// --------

// User Middlewares
app.use(logger);
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
connectDB();
colors.enable();
// --------
// --------------
// ---------------------
// --------------------------
// -------------------------------
// --------------------------
// ---------------------
// --------------
// --------

// User routes
app.use("/", require("./routes/root"));
// All Routes of Version One - v1
app.use("/api/v1", require("./routes/members/members.route"));
app.use("/api/v1/vocabulary", require("./routes/vocabulary/vocabulary.route"));
// --------
// --------------
// ---------------------
// --------------------------
// -------------------------------
// --------------------------
// ---------------------
// --------------
// --------

// Not Found Or 404 error Page
app.all("*", (req, res) => {
  console.log(req);
  //   res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "not.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found!" });
  } else {
    res.type("txt".send("404 Not Found!"));
  }
});
// Handle Error
app.use(errorHandler);
// --------
// --------------
// ---------------------
// --------------------------
// -------------------------------
// --------------------------
// ---------------------
// --------------
// --------

// Listen Application
mongoose.connection.once("open", () => {
  console.log(
    colors.red.underline(`📗Connected`),
    colors.yellow.underline(" to Server!")
  );
  app.listen(PORT, () => console.log(`Server running in port no : ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(colors.red("📕", err));
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
