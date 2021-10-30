const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

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
    const dbFolder = client.db("Services");
    const database = dbFolder.collection("Travel");
    const database2 = dbFolder.collection("booking");

    // app.getting
    app.get("/Travel", async (req, res) => {
      const cursor = database.find({});
      const findable = await cursor.toArray();
      res.send(findable);
    });

    // app.post
    app.post("/booking", async (req, res) => {
      const book = req.body;
      console.log("hitted");
      const result = await database2.insertOne(book);
      res.json(result);
    });

    // app.getting
    app.get("/booking", async (req, res) => {
      const cursor = database2.find({});
      const findable = await cursor.toArray();
      res.send(findable);
    });
    // app.delete
    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await database2.deleteOne(query);
      res.json(result);
    });

    // app.get
    app.get("/Travel/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const serviceOne = await database.findOne(query);
      res.json(serviceOne);
    });
  } finally {
    // await client.close();
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
