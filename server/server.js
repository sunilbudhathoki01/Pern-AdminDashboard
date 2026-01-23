import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from ApI");
  console.log("server is successfully running");
});
app.listen(port, console.log(`server is running on ${port}`));
