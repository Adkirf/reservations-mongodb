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

      const newTableData = {
        tableNumber: tablesResponse.data.data.length,
        capacity: 8,
        group: 1,
      };
      const createTableResponse = await axios.post(
        `${BASE_URL}/tables`,
        newTableData
      );

      // Test GET /api/users
      const usersResponse = await axios.get(`${BASE_URL}/users`);

      const newUserData = {
        email: "lsdkfds",
        name: "tester",
        phone: "21231123123",
      };

      const createUserResponse = await axios.post(
        `${BASE_URL}/users`,
        newUserData
      );

      // Test GET /api/reservations
      const reservationsResponse = await axios.get(`${BASE_URL}/reservations`);

      // Test POST /api/reservations
      const newReservationData = {
        email: "asd",
        name: "testUser",
        peopleCount: 4,
        reservationDate: "2024-04-05T10:00:00.000Z",
      };
      const createReservationResponse = await axios.post(
        `${BASE_URL}/reservations`,
        newReservationData
      );

      setData({
        tables: tablesResponse.data.data.length,
        users: usersResponse.data.data.length,
        reservations: reservationsResponse.data.data.length,
      });
    } catch (error) {
      console.log("Error in testDbComponent:", error);
    }
  };

  const reload = async () => {
    try {
      const reponseReservations = await fetch("/api/reservations");
      const newData = await reponseReservations.json();
      console.log(data);
      setData({
        tables: data.tables,
        users: data.users,
        reservations: newData.data.length,
      });
    } catch (error) {
      console.log(error);
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

      <div onClick={reload}>reload</div>
    </div>
  );
}

export default TestDbComponent;
