import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./index.css";

function CalendarView() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCompanies = localStorage.getItem('companies-dashboard'); // Use 'companies-dashboard' key
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }
    setLoading(false);
  }, []);

  const generateEvents = useCallback(() => {
    const events = [];

    companies.forEach((company) => {
      if (company.communications && Array.isArray(company.communications)) {
        company.communications.forEach((communication) => {
          events.push({
            title: `${company.name} - ${communication.type}`,
            date: communication.date,
            description: communication.notes || "No description available",
            color: "blue",
          });
        });
      }

      if (company.nextCommunication) {
        events.push({
          title: `${company.name} - Next ${company.nextCommunication.type}`,
          date: company.nextCommunication.date,
          description: `Next communication: ${company.nextCommunication.type}`,
          color: "green",
        });
      }
    });

    return events;
  }, [companies]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"90vh"}
          events={generateEvents()}
        />
      </div>
    </div>
  );
}

export default CalendarView;
