// pages/api/testDb.js

import clientPromise from "../../utils/mydb"; // Adjust the path as necessary

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Reservation-System"); // Make sure the database name is correct

    // Fetching documents from a collection. Replace 'challenges' with your actual collection name
    console.log("test function");
    console.log(data);

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
}
