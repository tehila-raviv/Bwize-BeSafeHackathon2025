import styles from './Review.module.css';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook
import { useEffect, useState } from 'react';
import FirstButton from '/src/components/common/FirstButton/FirstButton.jsx';

const ChatReviewPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    document.title = 'BWiZE | Review'; // ✅ Dynamically set the title here
  }, []);

  // Function to toggle the popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const navigate = useNavigate(); // Initialize the navigate hook to redirect
  const handleClick = () => {
    // Redirect the user to the chat page (e.g., "/home")
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <img src="/lock.png" alt="lock" className={styles.lockPic} />
      <div className={styles.reviewWind}>
        <div className={styles.titleWrapper}>
          <img src="/level-title.png" alt="level title" className={styles.levelTitlePic} />
          <p>Claim your treasure&nbsp;👇</p>
        </div>
        <div className={styles.chestWrapper}>
          <img
            src="/chest.png"
            alt="chest"
            className={styles.chestPic}
            onClick={togglePopup} // Add click handler to open the popup
          />
        </div>
        <FirstButton className={styles.continueButton} onClick={handleClick}>
          Continue
        </FirstButton>
      </div>

      {/* Popup Window */}
      {isPopupVisible && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div className={styles.popupWindow} onClick={(e) => e.stopPropagation()}>
            <h2>Congratulations!&nbsp;🎉</h2>
            <p>You unlocked 5 Safety Tools!</p>
            <ul className={styles.safetyToolsList}>
              <li>&nbsp; Don&apos;t share pics with strangers</li>
              <li>&nbsp; Keep Personal Info Private</li>
              <li>&nbsp; Think Before You Click</li>
              <li>&nbsp; Be Careful with New Contacts</li>
              <li>&nbsp; People Can Pretend</li>
            </ul>
            <FirstButton onClick={togglePopup} className={styles.popupButton}>
              Close
            </FirstButton>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatReviewPage;
