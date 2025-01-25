import styles from './Welcome.module.css';
import FirstButton from '/src/components/common/FirstButton/FirstButton.jsx';
import Footer from '/src/components/Footer/Footer.jsx'; // Import Footer\
import AnimatedText from '/src/components/animation/AnimatedText';

const WelcomePage = () => {

    const handleLoginClick = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/auth/google`;
    };
    return (
        <div className={styles.container}>
            <div className={styles.rectangle}>
                <div className={styles.topSection}>
                    {/* Welcome Header */}
                    <AnimatedText />
                    {/* Subtitle */}
                </div>

                {/* Main Content = left section */}
                <p className={styles.mainTxt}>
                    <strong> Think You Can Stay Safe? </strong> <br />
                    Complete the challenge to get your <strong>safety score </strong> <br /> and unlock
                    awesome <strong>safety tools</strong> for staying smart online!
                </p>
                <div className={styles.btnWrapper}>
                    <FirstButton className={styles.loginButton} onClick={handleLoginClick}>
                        Login with Google
                    </FirstButton>
                </div>

                <img
                    className={styles.lockImage}
                    src="/lock.png"
                    onClick={handleLoginClick}
                ></img>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default WelcomePage;
