import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = ({ selectedDates, setEvents }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [duration, setDuration] = useState(60);
  const [color, setColor] = useState("#ff0000");
  const [reservationCreated, setReservationCreated] = useState(false);

  useEffect(() => {
    if (selectedDates.length > 0) {
      const { startDate, endDate } = selectedDates[0];
      setStartDate(startDate + "T09:00");
      setEndDate(endDate + "T10:00");
    }
  }, [selectedDates]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/reservations", {
        startTime: startDate,
        endTime: endDate,
        comment,
        duration,
        color,
      });
      console.log("Reservation created:", response.data);
      const newReservation = {
        title: response.data.comment,
        start: response.data.startTime,
        end: response.data.endTime,
        color: response.data.color,
      };
      setEvents(events => [...events, newReservation]);
      setStartDate("");
      setEndDate("");
      setComment("");
      setDuration(60);
      setColor("#ff0000");
      setReservationCreated(true);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div>
      <h2>Réserver une réservation</h2>
      {reservationCreated ? (
        <p>Réservation créée avec succès!</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>Date de début:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>Date de fin:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label>Commentaire:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <label>Durée (en minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <label>Couleur:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="submit">Réserver</button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;
