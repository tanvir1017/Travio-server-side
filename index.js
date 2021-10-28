const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const places = [
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
  { place: "Morocco", price: 4590, days: 3 },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/places", (req, res) => {
  res.send(places);
});

app.listen(port, (req, res) => {
  console.log("listening from port", port);
});
