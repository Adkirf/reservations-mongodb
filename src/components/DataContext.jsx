// context/DataContext.js

import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tablesResponse = await fetch("/api/tables");
        const tablesData = await tablesResponse.json();
        setTables(tablesData.data);

        const reservationsResponse = await fetch("/api/reservations");
        const reservationsData = await reservationsResponse.json();
        setReservations(reservationsData.data);

        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();
        setUsers(usersData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ tables, reservations, users }}>
      {children}
    </DataContext.Provider>
  );
};
