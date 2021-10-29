const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

const tour = [
  {
    title: "Ultimate Thailand",
    place: "Thailand",
    price: "1350",
    description:
      "Thailand’s geography is certainly impressive, with every province across the country having some unique geographical feature worth exploring. However, the country’s most impressive natural feature is surely its beaches, with over 1,500 miles of coastline to choose from. Though there are a fair share of beaches that have been overrun with sun soaking tourists, there are many incredible stretches of sand that remain quiet, secluded and stunning. Some of these beaches include Freedom Beach in Phuket and Sunset Beach on the island of Koh Kradan.",
    "Departure/Return Location": "Ko Phangan, Surat Thani 84280, Thailand",
    "Departure Time": "Please arrive by 9:15 AM for a departure at 9:30 AM",
    "Return Time": "Approximately 8:30 PM",
    Included: "Accommodation, Guide, Insurance,Meals",
    img: "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/tour-6-featured-img-768x895.jpg",
  },
  {
    title: "Ultimate Thailand",
    place: "Thailand",
    price: "1350",
    description:
      "Thailand’s geography is certainly impressive, with every province across the country having some unique geographical feature worth exploring. However, the country’s most impressive natural feature is surely its beaches, with over 1,500 miles of coastline to choose from. Though there are a fair share of beaches that have been overrun with sun soaking tourists, there are many incredible stretches of sand that remain quiet, secluded and stunning. Some of these beaches include Freedom Beach in Phuket and Sunset Beach on the island of Koh Kradan.",
    "Departure/Return Location": "Ko Phangan, Surat Thani 84280, Thailand",
    "Departure Time": "Please arrive by 9:15 AM for a departure at 9:30 AM",
    "Return Time": "Approximately 8:30 PM",
    Included: "Accommodation, Guide, Insurance,Meals",
    img: "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/tour-9-featured-img.jpg",
  },
  {
    title: "Ultimate Thailand",
    place: "Thailand",
    price: "1350",
    description:
      "Thailand’s geography is certainly impressive, with every province across the country having some unique geographical feature worth exploring. However, the country’s most impressive natural feature is surely its beaches, with over 1,500 miles of coastline to choose from. Though there are a fair share of beaches that have been overrun with sun soaking tourists, there are many incredible stretches of sand that remain quiet, secluded and stunning. Some of these beaches include Freedom Beach in Phuket and Sunset Beach on the island of Koh Kradan.",
    "Departure/Return Location": "Ko Phangan, Surat Thani 84280, Thailand",
    "Departure Time": "Please arrive by 9:15 AM for a departure at 9:30 AM",
    "Return Time": "Approximately 8:30 PM",
    Included: "Accommodation, Guide, Insurance,Meals",
    img: "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/tour-8-featured-img.jpg",
  },
  {
    title: "Ultimate Thailand",
    place: "Thailand",
    price: "1350",
    description:
      "Thailand’s geography is certainly impressive, with every province across the country having some unique geographical feature worth exploring. However, the country’s most impressive natural feature is surely its beaches, with over 1,500 miles of coastline to choose from. Though there are a fair share of beaches that have been overrun with sun soaking tourists, there are many incredible stretches of sand that remain quiet, secluded and stunning. Some of these beaches include Freedom Beach in Phuket and Sunset Beach on the island of Koh Kradan.",
    "Departure/Return Location": "Ko Phangan, Surat Thani 84280, Thailand",
    "Departure Time": "Please arrive by 9:15 AM for a departure at 9:30 AM",
    "Return Time": "Approximately 8:30 PM",
    Included: "Accommodation, Guide, Insurance,Meals",
    img: "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/tour-7-featured-img-768x895.jpg",
  },
  {
    title: "Ultimate Thailand",
    place: "Thailand",
    price: "1350",
    description:
      "Thailand’s geography is certainly impressive, with every province across the country having some unique geographical feature worth exploring. However, the country’s most impressive natural feature is surely its beaches, with over 1,500 miles of coastline to choose from. Though there are a fair share of beaches that have been overrun with sun soaking tourists, there are many incredible stretches of sand that remain quiet, secluded and stunning. Some of these beaches include Freedom Beach in Phuket and Sunset Beach on the island of Koh Kradan.",
    "Departure/Return Location": "Ko Phangan, Surat Thani 84280, Thailand",
    "Departure Time": "Please arrive by 9:15 AM for a departure at 9:30 AM",
    "Return Time": "Approximately 8:30 PM",
    Included: "Accommodation, Guide, Insurance,Meals",
    img: "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/tour-4-featured-img.jpg",
  },
  {
    title: "Ultimate Thailand",
    place: "Thailand",
    price: "1350",
    description:
      "Thailand’s geography is certainly impressive, with every province across the country having some unique geographical feature worth exploring. However, the country’s most impressive natural feature is surely its beaches, with over 1,500 miles of coastline to choose from. Though there are a fair share of beaches that have been overrun with sun soaking tourists, there are many incredible stretches of sand that remain quiet, secluded and stunning. Some of these beaches include Freedom Beach in Phuket and Sunset Beach on the island of Koh Kradan.",
    "Departure/Return Location": "Ko Phangan, Surat Thani 84280, Thailand",
    "Departure Time": "Please arrive by 9:15 AM for a departure at 9:30 AM",
    "Return Time": "Approximately 8:30 PM",
    Included: "Accommodation, Guide, Insurance,Meals",
    img: "https://wanderers.qodeinteractive.com/wp-content/uploads/2018/03/tour-3-featured-img.jpg",
  },
];

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.14uaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("TourService").collection("Tour");

    app.get("/tour", async (req, res) => {
      const cursor = database.find({});
      const tour = await cursor.toArray();
      res.send(tour);
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/tour", (req, res) => {
  res.send(tour);
});

app.listen(port, (req, res) => {
  console.log("listening from port", port);
});
