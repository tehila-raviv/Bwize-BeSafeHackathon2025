// src/pages/GoogleCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // After the user is redirected to /auth/google/callback, we need to check if the user is authenticated
    const checkAuthStatus = async () => {
      try {
        // Check if the user is authenticated by querying the /profile endpoint
        const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/profile`, {
          credentials: 'include',  // Include credentials (cookies) in the request
        });

        if (response.ok) {
          // If authenticated, redirect to home (or any other protected page)
          navigate('/');
        } else {
          console.error('Authentication failed');
          navigate('/');  // Handle authentication failure (optional: show error page)
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        navigate('/');  // Handle error (optional: show error page)
      }
    };

    checkAuthStatus();
  }, [navigate]);

  return (
    <div>
      <h2>Loading...</h2>
      <p>Redirecting...</p>
    </div>
  );
}

export default GoogleCallback;
