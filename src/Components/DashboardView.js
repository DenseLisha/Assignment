import React, { useState, useEffect } from 'react';

const DashboardView = () => {
  const [passengers, setPassengers] = useState([]);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedSeat, setEditedSeat] = useState('');

  useEffect(() => {
    // Retrieve passengers data from local storage
    const storedPassengers = JSON.parse(localStorage.getItem('passengers')) || [];
    setPassengers(storedPassengers);
  }, []);

  // Function to handle deleting a passenger
  const handleDelete = (id) => {
    const updatedPassengers = passengers.filter(passenger => passenger.id !== id);
    setPassengers(updatedPassengers);
    localStorage.setItem('passengers', JSON.stringify(updatedPassengers));
  };

  // Function to handle editing a passenger
  const handleEdit = (passenger) => {
    setEditingPassenger(passenger.id);
    setEditedEmail(passenger.email);
    setEditedSeat(passenger.seatNumber);
  };

  // Function to save edited passenger data
  const saveEditedPassenger = (id) => {
    const updatedPassengers = passengers.map(passenger => {
      if (passenger.id === id) {
        return {
          ...passenger,
          email: editedEmail,
          seatNumber: editedSeat
        };
      }
      return passenger;
    });
    setPassengers(updatedPassengers);
    localStorage.setItem('passengers', JSON.stringify(updatedPassengers));
    setEditingPassenger(null);
  };

  return (
    <div>
      <h2>Passenger Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Seat Number</th>
            <th>Date of Booking</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.id}>
              <td>{`${passenger.firstName} ${passenger.lastName}`}</td>
              <td>
                {editingPassenger === passenger.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  passenger.email
                )}
              </td>
              <td>
                {editingPassenger === passenger.id ? (
                  <input
                    type="text"
                    value={editedSeat}
                    onChange={(e) => setEditedSeat(e.target.value)}
                  />
                ) : (
                  passenger.seatNumber
                )}
              </td>
              <td>{passenger.bookingDate}</td>
              <td>
                {editingPassenger === passenger.id ? (
                  <button onClick={() => saveEditedPassenger(passenger.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(passenger)}>Edit</button>
                )}
                <button onClick={() => {
                if (window.confirm("Are you sure you want to remove this passenger?")) {
                handleDelete(passenger.id);
                }
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardView;
