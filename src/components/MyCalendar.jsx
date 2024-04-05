import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ reservations }) => {
  const [events, setEvents] = useState([]);

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        views={["week"]}
        defaultView="week"
        step={60}
        showMultiDayTimes
        defaultDate={new Date()}
      />
    </div>
  );
};

export default MyCalendar;
