import { MongoClient } from 'mongodb';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const uri = "mongodb://host.docker.internal:27017"; // Use 'host.docker.internal' for Docker
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
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
    </div>
  );
}

export default App;
