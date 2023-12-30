import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout1 from '../Layout1/layout1';

const BusTicketBooking = () => {
  const navigate = useNavigate();
  const [currentBus, setCurrentBus] = useState({
    id: '123',
    route: 'New York to Washington D.C.',
    departureTime: '10:00 AM',
    price: '$45.00'
  });

  const handlePayment = () => {
    console.log('Proceeding to payment for bus', currentBus.id);
    navigate('/payment');
  };

  // Define some basic styles
  const containerStyles = {
    maxWidth: 'auto',
    margin: '2rem auto',
    padding: '1rem',
    border: '3px solid #c9e9e1',
    borderRadius: '0.5rem',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };
  
  const headerStyles = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem'
  };

  const buttonStyles = {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0.25rem',
    color: 'white',
    backgroundColor: '#50C878',
    marginTop: '20px'
  };

  const busDetailsStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    borderRadius: '0.25rem',
    boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)'
  };

  const strongText = {
    fontWeight: 'bold'
  };

  return (
    <Layout1>
    <div style={containerStyles}>
      <h1 style={headerStyles}>Bus Ticket Booking</h1>
      
      <div style={busDetailsStyle}>
        <h3>Bus Details</h3>
        <p><span style={strongText}>Route:</span> {currentBus.route}</p>
        <p><span style={strongText}>Departure Time:</span> {currentBus.departureTime}</p>
        <p><span style={strongText}>Price:</span> {currentBus.price}</p>
      </div>
      
      <button onClick={handlePayment} style={buttonStyles}>
        Pay for Ticket
      </button>
    </div>
    </Layout1>
  );
};

export default BusTicketBooking;
