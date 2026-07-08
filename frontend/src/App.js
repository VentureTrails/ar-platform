import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="auth-wrapper">
        {isRegistering ? (
          <>
            <Register onRegisterSuccess={() => setIsAuthenticated(true)} />
            <div className="auth-toggle">
              Already have an account?{' '}
              <button onClick={() => setIsRegistering(false)}>Sign In</button>
            </div>
          </>
        ) : (
          <>
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            <div className="auth-toggle">
              Don't have an account?{' '}
              <button onClick={() => setIsRegistering(true)}>Sign Up</button>
            </div>
          </>
        )}
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
