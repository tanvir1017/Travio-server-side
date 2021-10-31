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
    const database3 = dbFolder.collection("blog");

    // app.getting
    app.get("/Travel", async (req, res) => {
      const cursor = database.find({});
      const findable = await cursor.toArray();
      res.send(findable);
    });

    // app.post
    app.post("/booking", async (req, res) => {
      const book = req.body;
      book.status = false;
      console.log(book);
      const result = await database2.insertOne(book);
      res.json(result);
    });
    // app.post
    app.post("/blog", async (req, res) => {
      const blog = req.body;
      const result = await database3.insertOne(blog);
      res.json(result);
    });
    app.get("/blog", async (req, res) => {
      const cursor = database3.find({});
      const findable = await cursor.toArray();
      res.send(findable);
    });

    // app.getting
    app.get("/booking", async (req, res) => {
      const cursor = database2.find({});
      const findable = await cursor.toArray();
      res.send(findable);
    });

    // app put
    app.put("/booking", async (req, res) => {
      console.log(req.body);
      const id = req.body._id;
      const checked = req.body.checked;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const data = { $set: { status: checked } };
      const result = await database2.updateOne(query, data, options);
      res.json(result);
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
app.listen(port, (req, res) => {
  console.log("listening from port", port);
});
