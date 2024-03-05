const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./server/routes");
const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin:rRMvqrXEpW76Xw3X@dev-aws-portfolio.mzca5m7.mongodb.net/sportsPicksDB?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose database is connected!!!");
});

// use API routes
app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
