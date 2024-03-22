import React, { useState } from 'react';
import { getPassengersData, storePassengersData } from "../Storage/storage"; // Make sure to import these functions

const ReservationView = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const isSeatAvailable = (seatNumber, passengers) => {
    return !passengers.some(passenger => passenger.seatNumber === seatNumber);
  };

  const handleReservation = () => {
    const passengers = getPassengersData();

    if (!isSeatAvailable(selectedSeat, passengers)) {
      setErrorMessage('Seat is already reserved. Please choose another seat.');
      return;
    }

    const newPassenger = {
      id: Date.now(), // Unique ID for each passenger
      firstName,
      lastName,
      email,
      seatNumber: selectedSeat,
      bookingDate: new Date().toISOString().split('T')[0], 
    };

    // Add the new passenger to the existing passengers array
    const updatedPassengers = [...passengers, newPassenger];

    // Store the updated passengers data in local storage
    storePassengersData(updatedPassengers);

    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setSelectedSeat('');
    setErrorMessage('');

    // Display alert for successful reservation
    alert("Seat Reserved");
  };

  return (
    <div className="reservation-container">
      <h2>Bus Seat Reservation</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="input-group">
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <div className="bus-seat-layout">
        <h3>Bus Seat Layout</h3>
        <div className="seat-section">
          <h4 >Upper Seats (Rs.800)</h4>
          <div>
          {Array.from({ length: 15 }, (_, index) => index + 1).map((seat) => (
            <button
              key={seat}
              onClick={() => handleSeatSelection(seat)}
              className={selectedSeat === seat ? 'selected' : ''}
              disabled={!isSeatAvailable(seat, getPassengersData())}
            >
              {seat}
            </button>
          ))}
          </div>
          
        </div>
        <div className="seat-section">
          <h4 >Lower Seats (Rs.400)</h4>
          {Array.from({ length: 25 }, (_, index) => index + 16).map((seat) => (
            <button
              key={seat}
              onClick={() => handleSeatSelection(seat)}
              className={selectedSeat === seat ? 'selected' : ''}
              disabled={!isSeatAvailable(seat, getPassengersData())}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      <p>Selected Seat: {selectedSeat}</p>

      <button onClick={handleReservation} disabled={!firstName || !lastName || !email || !selectedSeat}>
        Reserve Seat
      </button>
    </div>
  );
};

export default ReservationView;
