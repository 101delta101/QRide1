import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const EMAIL_VERIFICATION_URL = '/auth/users/activation/';

const VerificationPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleVerification = async () => {
    try {
      await axios.get(EMAIL_VERIFICATION_URL, {
        params: { uid, token },
      });

      // The verification call was successful
      console.log('Email verification successful.');
      navigate('/login');
      setVerificationMessage('Email verification successful.');
    } catch (error) {
      // Handle any errors if necessary
      console.error('Email verification failed:', error);
      setVerificationMessage('Email verification failed.');
    }
  };

  return (
    <div>
      <h2>Email Verification Page</h2>
      <p>{verificationMessage}</p>
      <button onClick={handleVerification}>Verify</button>
    </div>
  );
};

export default VerificationPage;

