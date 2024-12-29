import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';

const initialState = { fullName: '', email: '', password: '' };

export default function Register() {
  const { dispatch } = useAuthContext();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = state;

    setIsProcessing(true);

    try {
      // Call the backend API to register a user
      const response = await axios.post('https://backend-hackathon-1.vercel.app/api/v1/register', { fullName, email, password });

      const user = response.data; // Assuming the backend returns user data
      console.log('User registered successfully:', user);

      // Add user data to MongoDB (Ensure this endpoint exists and works correctly)
      await addDocument(user);

      window.toastify('User registered successfully', 'success');
    } catch (err) {
      // Improved error handling
      console.error('Error during registration:', err.response?.data?.message || err.message);
      window.toastify(
        'Something went wrong: ' + (err.response?.data?.message || 'Server error'),
        'danger'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const addDocument = async (user) => {
    try {
      // Assuming the backend handles user document creation in MongoDB
      const response = await axios.post('https://backend-hackathon-1.vercel.app/api/users', {
        uid: user.uid,
        firstName: user.fullName.split(' ')[0] || '',
        lastName: user.fullName.split(' ')[1] || '',
      });

      if (response.status === 201) {
        console.log('User document created in MongoDB');
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        throw new Error('Failed to create user document in MongoDB');
      }
    } catch (err) {
      console.error('Error creating user document:', err.response?.data?.message || err.message);
      window.toastify('Error creating user document', 'danger');
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card p-2 p-md-3 py-lg-4" style={{ borderRadius: '20px' }}>
              <div className="row">
                <div className="col">
                  <h3 className="mb-1 text-center">Register</h3>
                </div>
              </div>
              <form onSubmit={handleRegister}>
                <div className="row mb-1">
                  <div className="col">
                    <label htmlFor="fullName"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      name="fullName"
                      onChange={handleChange}
                      required=""
                      style={{ borderRadius: '20px' }}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col">
                    <label htmlFor="email"></label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      name="email"
                      onChange={handleChange}
                      required=""
                      style={{ borderRadius: '20px' }}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      name="password"
                      onChange={handleChange}
                      required=""
                      style={{ borderRadius: '20px' }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-danger w-100"
                      disabled={isProcessing}
                      style={{ borderRadius: '20px', fontWeight: 'bolder' }}
                    >
                      {!isProcessing ? 'Register' : <div className="spinner-grow spinner-grow-sm"></div>}
                    </button>
                  </div>
                </div>
              </form>
              <div className="row mt-3">
                <div className="col">
                  <p className="mb-0 text-center text-dark fw-bold">
                    Already have an account?{' '}
                    <Link to="/authentication/login" className="text-primary text-decoration-none fw-bold">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Link to="/" className="text-primary text-decoration-none fw-bold">
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
