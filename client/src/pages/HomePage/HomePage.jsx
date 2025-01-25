import { useNavigate } from 'react-router-dom'; // Import the navigate hook
import styles from './Home.module.css';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate(); // Initialize the navigate hook to redirect

    useEffect(() => {
        document.title = 'BWiZE | Home'; // ✅ Dynamically set the title here
    }, [])

    const handleStartChatClick = () => {
        // Redirect the user to the chat page (e.g., "/chat")
        navigate('/chat');
    };

    // Add the Google Font link to the head of the document
    <head>
        <link
            href="https://fonts.googleapis.com/css2?family=Margarine&display=swap"
            rel="stylesheet" />
    </head>

    return (
        <div className={styles.home}>
            <img className={styles['background-pic']}
                src="/home-bg.jpeg" alt="hoe-page-bg"
            />

            <button onClick={handleStartChatClick}></button>

            <div className={styles.container}>
                <p className={styles.firstLine}>
                    Progress Through the Steps to Stay on the Safe Path
                </p>
                <div className={styles.secLine}>
                    <p>
                        And Don&apos;t Forget to
                    </p>
                    <img className={styles.logoName}
                        src="/logo-name.png"
                    />
                </div>
            </div>
        </div >

    );
};

export default Home;