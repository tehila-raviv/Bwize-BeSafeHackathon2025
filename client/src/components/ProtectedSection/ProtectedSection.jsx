import PropTypes from 'prop-types'; // Import PropTypes for props validation
import FirstButton from '/src/components/common/FirstButton/FirstButton.jsx'; // Import your FirstButton component
import styles from './ProtectedSection.module.css'; // Create this CSS file for styling if needed

const ProtectedSection = ({ message, loginUrl }) => {
  return (
    <div className={styles.protected}>
      <p>{message}</p>
      <FirstButton
        onClick={() => {
          window.location.href = loginUrl; // Redirects to the Google login URL
        }}
      >
        Login with Google
      </FirstButton>
    </div>
  );
};

// Add PropTypes for props validation
ProtectedSection.propTypes = {
  message: PropTypes.string.isRequired,
  loginUrl: PropTypes.string.isRequired,
};

export default ProtectedSection;
