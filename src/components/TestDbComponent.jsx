// components/TestDbComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function TestDbComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      reload();
    }
  });

  const reload = async () => {
    try {
      console.log("reloading");
      const tablesResponse = await fetch("/api/reservations");
      const usersResponse = await fetch(`/api/users`);
      const reservationsResponse = await fetch(`/api/reservations`);

      const tables = (await tablesResponse.json()).data;
      const users = (await usersResponse.json()).data;
      const reservations = (await reservationsResponse.json()).data;

      setData({
        tables: tables ? tables.length : "NaN",
        users: users ? users.length : "NaN",
        reservations: reservations ? reservations.length : "NaN",
      });
    } catch (error) {
      console.log("error while reloading testComponent", error);
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
