require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// app config
const app = express();
const PORT = process.env.PORT || 6000;

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Connect to mongodb
const URI = process.env.MONGO_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

// routes
app.use("/user", require("./routes/userRoute"));
app.use("/api/karyawan", require("./routes/karyawanRoute"));
app.use("/api/jabatan", require("./routes/jabatanRoute"));

// listen
app.listen(PORT, () => {
  console.log("server running on Port : " + PORT);
});
