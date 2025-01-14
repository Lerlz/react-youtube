import { MongoClient } from 'mongodb';

async function fetchData() {
  const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("REACTJS-TODOLIST"); // Replace with your DB name
    const collection = database.collection("TO_DO_LIST"); // Replace with your collection
    const data = await collection.find({}).toArray();
    console.log(data);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

fetchData();
