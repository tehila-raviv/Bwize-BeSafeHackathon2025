import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import GoogleCallback from './pages/GoogleCallback';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ChatPage from './pages/ChatPage/ChatPage';
import ChatReviewPage from './pages/ChatReviewPage/ChatReviewPage';
import styles from './styles/App.module.css';
import projectLogo from './assets/project-logo.png';
import { useEffect, useState } from 'react';
import FirstButton from '/src/components/common/FirstButton/FirstButton.jsx'; // Import your FirstButton component
import ProtectedSection from './components/ProtectedSection/ProtectedSection'; // Import the ProtectedSection component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state for authentication check
    const navigate = useNavigate(); // useNavigate hook for redirection

    // This function checks if the user is authenticated
    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/profile`, {
                credentials: 'include', // Send cookies with the request
            });

            if (response.ok) {
                setIsLoggedIn(true);
            } else if (response.status === 401) {
                // User is not logged in
                console.log('User not logged in yet.');
                setIsLoggedIn(false);
            } else {
                console.error('Authentication check failed:', response.status, await response.text());
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false); // Once the check is done, set loading to false
        }
    };

    // This effect runs when the page loads, but only check auth status if the user has attempted to log in
    useEffect(() => {
        if (window.location.pathname.includes('google/callback')) {
            setIsLoggedIn(true); // Assuming Google OAuth callback makes the user logged in
            setLoading(false);
            navigate('/home'); // Redirect to /home after successful login
        } else {
            checkAuthStatus(); // Check auth status for the first visit
        }
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <img src={projectLogo} alt="Logo" className={styles.appLogo} />
                <nav className={styles.appNav}>
                    {isLoggedIn ? (
                        <>
                            <FirstButton
                                className={styles.navButton}
                                onClick={() => {
                                    window.location.href = '/home';
                                }}
                            >
                                Home
                            </FirstButton>

                            <FirstButton
                                className={styles.navButton}
                                onClick={() => {
                                    window.location.href = '/chat';
                                }}
                            >
                                Chat
                            </FirstButton>

                            <FirstButton
                                onClick={async () => {
                                    try {
                                        const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/logout`, {
                                            credentials: 'include',
                                        });

                                        if (response.ok) {
                                            setIsLoggedIn(false);
                                            window.location.href = '/'; // Redirect to welcome page after logout
                                        } else {
                                            console.error('Logout failed:', await response.text());
                                        }
                                    } catch (error) {
                                        console.error('Logout failed:', error);
                                    }
                                }}
                            >
                                Logout
                            </FirstButton>
                        </>
                    ) : null} {/* Only show the other buttons if logged in */}
                </nav>
            </header>
            <main className={styles.main}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            !isLoggedIn ? (
                                <WelcomePage />
                            ) : (
                                <div className={styles.loading}>Redirecting...</div>
                            )
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            isLoggedIn ? (
                                <Home />
                            ) : (
                                <ProtectedSection
                                    message="Please log in to access this page."
                                    loginUrl={`${import.meta.env.VITE_SERVER_API_URL}/auth/google`}
                                />
                            )
                        }
                    />
                    {/* Protect /chat and /chat/review routes */}
                    <Route
                        path="/chat"
                        element={
                            isLoggedIn ? (
                                <ChatPage />
                            ) : (
                                <ProtectedSection
                                    message="Please log in to access the chat page."
                                    loginUrl={`${import.meta.env.VITE_SERVER_API_URL}/auth/google`}
                                />
                            )
                        }
                    />
                    <Route
                        path="/chat/review"
                        element={
                            isLoggedIn ? (
                                <ChatReviewPage />
                            ) : (
                                <ProtectedSection
                                    message="Please log in to access the chat review page."
                                    loginUrl={`${import.meta.env.VITE_SERVER_API_URL}/auth/google`}
                                />
                            )
                        }
                    />
                    <Route path="/auth/google/callback" element={<GoogleCallback />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
