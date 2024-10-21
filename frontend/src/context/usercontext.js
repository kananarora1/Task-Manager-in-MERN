import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/users/currentUser', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 401) {
            throw new Error('Token expired or invalid');
          }

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          console.log('Fetched user data:', data);
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Unable to fetch user data. Please login again.');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
