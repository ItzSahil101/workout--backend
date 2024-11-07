const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

require("dotenv").config();

//middlewares
const corsOptions = {credentials: true}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//importing or requring routes
const authRoutes = require('./routes/auth');

//Routes
app.use("/api/auth", authRoutes);

//mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    //start server
    app.listen(process.env.PORT || 5000, () => {
      console.log("DB $ Server connected Sucessfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
