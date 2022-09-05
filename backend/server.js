const path = require("path"); //to build static files for deployment
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { allowedNodeEnvironmentFlags } = require("process");

const app = express();

dotenv.config();

//connection
connectDB();

//supports parsing of raw json post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the IT support-desk app" });
});

//Setting up routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Serve the frontend
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the IT support-desk app" });
  });
}

//error handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
