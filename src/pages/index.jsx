import React, { useContext } from "react";

import { DataContext } from "../components/DataContext";

import MyCalendar from "@/components/MyCalendar";
import TestDbComponent from "@/components/TestDbComponent";
import ReservationForm from "@/components/ReservationForm";

const App = () => {
  return (
    <div className="w-screen h-screen bg-blue-200">
      <TestDbComponent />
      <ReservationForm />
    </div>
  );
};

export default App;
