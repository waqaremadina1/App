import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

const initialState = { email: '', password: '' };

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext(); // Use the context's dispatch function
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    setIsProcessing(true);

    try {
      const response = await axios.post('https://backend-hackathon-1.vercel.app/api/v1/login', { email, password });
      const user = response.data; // Assuming the response contains user details

      // Update global auth state
      dispatch({ type: 'LOGIN', payload: { user } });

      window.toastify('User logged in successfully', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      window.toastify(
        'Something went wrong: ' + (error.response?.data?.message || 'Server error'),
        'danger'
      );
    } finally {
      setIsProcessing(false);
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
                  <h3 className="mb-1 text-center">Login</h3>
                </div>
              </div>
              <form onSubmit={handleLogin}>
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
                      className="btn btn-success w-100"
                      disabled={isProcessing}
                      style={{ borderRadius: '20px', fontWeight: 'bolder' }}
                    >
                      {!isProcessing ? 'Login' : <div className="spinner-grow spinner-grow-sm"></div>}
                    </button>
                  </div>
                </div>
              </form>
              <div className="row mt-3">
                <div className="col">
                  <p className="mb-0 text-center text-dark fw-bold">
                    Need an account?{' '}
                    <Link to="/authentication/register" className="text-primary text-decoration-none fw-bold">
                      Register
                    </Link>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                  Home
                </Link>
                <Link to="/authentication/forgot-password" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
