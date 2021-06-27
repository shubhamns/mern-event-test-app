const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/event");
const app = express();
const port = 5000;

mongoose
  .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
