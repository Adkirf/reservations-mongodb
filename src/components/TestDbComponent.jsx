// components/TestDbComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function TestDbComponent() {
  const [data, setData] = useState(null);

  const BASE_URL = "http://localhost:3000/api";

  useEffect(() => {
    testEndpoints();
  }, []);

  const testEndpoints = async () => {
    try {
      // Test GET /api/tables
      const tablesResponse = await axios.get(`${BASE_URL}/tables`);
      console.log("GET /api/tables:", tablesResponse.data);

      const newTableData = {
        tableNumber: tablesResponse.data.data.length,
        capacity: 8,
        group: 1,
      };
      const createTableResponse = await axios.post(
        `${BASE_URL}/tables`,
        newTableData
      );
      console.log("POST /api/tables:", createTableResponse.data);

      // Test GET /api/users
      const usersResponse = await axios.get(`${BASE_URL}/users`);
      console.log("GET /api/users:", usersResponse.data);

      const newUserData = {
        email: "lsdkfds",
        name: "tester",
        phone: "21231123123",
      };

      const createUserResponse = await axios.post(
        `${BASE_URL}/users`,
        newUserData
      );
      console.log("POST /api/users:", createUserResponse.data);

      // Test GET /api/reservations
      const reservationsResponse = await axios.get(`${BASE_URL}/reservations`);
      console.log("GET /api/reservations:", reservationsResponse.data);

      // Test POST /api/reservations
      const newReservationData = {
        userId: usersResponse.data.data[0],
        tableId: tablesResponse.data.data[0],
        peopleCount: 4,
        reservationTime: "2024-04-05T10:00:00.000Z",
      };
      const createReservationResponse = await axios.post(
        `${BASE_URL}/reservations`,
        newReservationData
      );
      console.log("POST /api/reservations:", createReservationResponse.data);
    } catch (error) {
      console.log("Error in testDbComponent:", error);
    }
  };

  return (
    <div>
      <h1>Database Connection Test</h1>
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default TestDbComponent;
