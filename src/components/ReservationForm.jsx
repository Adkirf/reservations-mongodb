import React, { useState } from "react";

const ReservationForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [dateTime, setDateTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    if (!email || !name || peopleCount < 1 || !dateTime) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handlePeopleCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPeopleCount(value);
    } else {
      setPeopleCount("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await fetch("/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            peopleCount,
            reservationDate: dateTime,
          }),
        });

        if (!response.ok) {
          throw new Error("Response not ok");
        }
        const data = await response.json();
        console.log("Reservation submitted:", data);
        // Reset form fields after successful submission if needed
        setEmail("");
        setName("");
        setPeopleCount(1);
        setDateTime("");
      } catch (error) {
        console.error("Error submitting reservation:", error);
        setErrorMessage("Error submitting reservation. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="peopleCount" className="block text-gray-700">
            Number of People:
          </label>
          <input
            type="number"
            id="peopleCount"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={peopleCount === "" ? "" : peopleCount}
            onChange={handlePeopleCountChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateTime" className="block text-gray-700">
            Date & Time:
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Make Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
