import React, { useContext } from "react";

import { DataContext } from "../components/DataContext";

import MyCalendar from "@/components/MyCalendar";

const App = () => {
  const { tables, reservations, users } = useContext(DataContext);
  console.log(tables);
  console.log(reservations);
  console.log(users);

  return (
    <div className="w-screen h-screen bg-blue-200">
      <MyCalendar reservations={[]} />
    </div>
  );
};

export default App;
