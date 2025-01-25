﻿import styles from './Chat.module.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [choices, setChoices] = useState([]);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [score, setScore] = useState(0);
    const [emotion, setEmotion] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showCloue, setShowClue] = useState(false);
    const [clue, setClue] = useState('');

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const currentState = 'greeting';
        document.cookie = `currentState=${currentState}; path=/`;
        document.title = 'BWiZE | Chat';
        handleChoiceSelect({
            text: '',
            score: 0
        });
    }, []);

    const navigate = useNavigate(); // ����� �-hook �� navigate
    const handleReviewClick = () => {
        navigate('/chat/review');
    };

    const handleRefresh = () => {
        window.location.href = '/chat';
    };       

    const [showTooltip, setShowTooltip] = useState(false);

    const handleIconClick = () => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 1000); // Hide tooltip after 2 seconds
    };

    const handleChoiceSelect = async (choice) => {
        setSelectedChoice(choice);

        if (choice.text) {
            setMessages([...messages, ` ${choice.text}`]);
        }
        if (choice.score) {
            setScore((prevScore) => prevScore + 1);
        }

        const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/InputHandling`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userResponse: choice.text }),
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            document.cookie = `currentState=${data.nextState}; path=/`;
            setShowClue(false);
            if (data.message === 'Something went wrong!') {
                setEmotion("basic");

                setShowPopup(true);
            } else {
                if (data.clue != 'no clue') {
                    setClue(data.clue);
                    setTimeout(() => { setShowClue(true); }, 3000);
                }
                else {
                    setShowClue(false);
                }
                setEmotion(data.emotion);  // Set emotion first
                setTimeout(() => {
                    setMessages(messages => [...messages, data.message]);
                    setChoices(data.userChoices || []);
                }, 2000);
            }
        } else {
            console.error('Error fetching choices');
        }

    };
    console.log(styles)
    return (

        <div className={styles.Chat}>

            <div className={styles.wrapperIcons}>
                <img
                    className={styles.helpIcon}
                    src="/help.svg"
                    onClick={handleIconClick}
                />
                {showTooltip && <div className={styles.tooltip}>You can choose from the options provided in the chat to guide your conversation. <br/>
                Hover over the hint button on the left side for key points on safe web behavior.</div>}
                <img
                    className={styles.refreshIcon}
                    src="/refresh.svg"
                    alt="Refresh"
                    onClick={handleRefresh}
                />

            </div>

            {/*  <button onClick={() => setShowPopup(true)}>Submit</button>*/}
            <div className={`${styles.popup} ${showPopup ? styles.open : ''}`}>
                <div className={styles.wrapper}>
                    <img src="/congratulations.gif" className={styles.gif} alt="gif" />
                    <div className={styles['inline-container']}>
                        <img src="/left_gif.gif" className={styles.gif1} alt="left gif" />
                        <h2 key={showPopup} className={styles['typing-demo']} >Your safe score:</h2>
                        <img src="/right_gif.gif" className={styles.gif2} alt="right gif" />
                    </div>
                    <div className={styles.highlightedScore}>{score}</div>
                </div>
                <button onClick={handleReviewClick}>Review</button>
            </div>

            <div className={styles.chatBox}>
                <div className={styles['chat-left-side']}>
                    <div className={styles['chats-title-box']}>
                        <h2 className={styles['chats-title']}>Chats</h2>
                    </div>
                    <div className={styles['bot-box']}>
                        <img src="/michael-pic.png" className={styles['bot-photo']} />
                        <h2 className={styles['bot-name']}>Michael</h2>
                    </div>
                </div>
                <div ref={messagesEndRef} className={styles.messages}>
                    {messages.filter((_, index) => index >= 1).map((msg, index) => (
                        <div key={index} className={`${styles.message} ${index % 2 === 1 ? styles['user-message'] : styles['bot-message']}`}>
                            <p>{msg}</p>
                            {index === 2 && (
                                <img src="/boot_send.jpg" className={styles['bot-photo-message']} alt="Bot sent this image" />
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles['emotions-box']}>
                    <div className={styles['bot-box']}>
                        <h2 className={styles['mood-title']}>Mood Zone</h2>
                    </div>
                    <video
                        src={`/3d-model/${emotion || 'basic'}.mp4`}
                        className={styles['test-emotion']}
                        alt="3d-emotion-display"
                        autoPlay
                        loop
                        muted
                    />
                </div>
            </div>

            <div className={styles.choices}>
                {showCloue && (
                    <div className={styles["button-icon"]}>
                        <div className={styles["icon"]}>
                            <svg viewBox="0 0 1024 1024">
                                <path d="M602.587685 727.095869c7.981294-58.263445 57.465316-115.728761 73.427903-131.691348 94.977397-91.784879 97.371785-242.631333 5.586906-337.60873s-243.429462-97.371785-338.406859-5.586906-97.371785 243.429462-5.586905 338.406859l5.586905 5.586906c15.962588 15.164458 65.44661 72.629774 73.427904 131.691348 1.596259 17.558846 3.192518 35.117693 2.394388 51.87841h180.377241c0.798129-17.558846 1.596259-35.117693 3.192517-52.676539z" fill="#FFECBA"></path><path d="M600.193297 795.734996H419.017927c-3.990647 0-7.981294-1.596259-11.173812-4.788776-3.192518-3.192518-4.788776-7.183164-4.788776-11.173812 0-16.760717-0.798129-33.521434-2.394388-50.282151-7.183164-51.87841-51.87841-105.353079-68.639127-122.113796l-5.586906-5.586905c-47.887763-48.685892-73.427903-113.334373-71.831644-181.9735s28.732658-131.691348 77.41855-179.579111 113.334373-73.427903 181.973499-71.831645c67.840998 0.798129 131.691348 28.732658 179.579112 77.41855s73.427903 113.334373 71.831645 181.9735c-0.798129 67.840998-28.732658 131.691348-77.418551 179.579111-15.962588 15.164458-61.455963 69.437256-68.639127 122.113796-1.596259 16.760717-3.192518 33.521434-2.394388 50.282151 0 3.990647-1.596259 7.981294-4.788776 11.173812-3.990647 3.192518-7.981294 4.788776-11.971941 4.788776z m-165.212783-31.925175h149.250195c0-12.77007 1.596259-25.54014 2.394388-38.310211 10.375682-74.226033 77.41855-139.672642 78.21668-140.470771 43.098987-41.502728 67.042868-97.371785 67.840998-157.231489 0.798129-59.859704-21.549493-116.52689-63.052222-158.827748-41.502728-43.098987-97.371785-67.042868-157.231488-67.840997C453.33749 199.532346 396.670304 221.879969 354.369447 263.382697c-43.098987 41.502728-67.042868 97.371785-67.840998 157.231489-0.798129 59.859704 21.549493 116.52689 63.052221 158.827747l4.788777 4.788776c0.798129 0.798129 67.840998 67.042868 78.216679 140.470772 1.596259 13.5682 2.394388 26.33827 2.394388 39.10834z" fill=""></path><path d="M418.219797 902.684334c-2.394388 53.474669 37.512081 99.766173 91.78488 105.353078 53.474669-4.788776 94.179267-51.080281 91.784879-105.353078 0-39.906469-1.596259-85.399844-1.596259-123.710055H419.017927c0.798129 38.31021-0.798129 83.803585-0.79813 123.710055z" fill="#ffffff"></path><path d="M510.004677 1024h-1.596259c-62.254092-5.586906-108.545596-59.061574-106.151208-121.315666 0-18.356976 0-37.512081 0.798129-55.869057 0-22.347623 0.798129-46.291504 0.798129-67.042869 0-3.990647 1.596259-7.981294 4.788777-11.173811 3.192518-3.192518 7.183164-4.788776 11.173811-4.788776h181.17537c3.990647 0 7.981294 1.596259 11.173812 4.788776 3.192518 3.192518 4.788776 7.183164 4.788776 11.173811 0 19.953235 0 43.098987 0.798129 65.44661 0 19.155105 0.798129 39.10834 0.79813 57.465316 2.394388 62.254092-43.897116 115.728761-106.949338 121.315666h-1.596258z m-75.024163-228.265004c0 16.760717 0 34.319564-0.798129 51.080281 0 19.155105-0.798129 38.31021-0.798129 55.869057v0.798129c-1.596259 44.695246 31.127046 83.005456 75.822291 88.592362 44.695246-4.788776 78.21668-43.098987 75.822292-88.592362 0-19.155105 0-38.31021-0.79813-57.465316 0-16.760717-0.798129-34.319564-0.798129-50.282151H434.980514zM418.219797 902.684334z" fill=""></path><path d="M633.714731 795.734996H378.313328c-8.779423 0-15.962588-7.183164-15.962588-15.962588s7.183164-15.962588 15.962588-15.962587h255.401403c8.779423 0 15.962588 7.183164 15.962588 15.962587s-7.183164 15.962588-15.962588 15.962588zM601.789556 861.181606H418.219797c-8.779423 0-15.962588-7.183164-15.962587-15.962588s7.183164-15.962588 15.962587-15.962588h183.569759c8.779423 0 15.962588 7.183164 15.962587 15.962588s-7.183164 15.962588-15.962587 15.962588zM601.789556 919.445051H418.219797c-8.779423 0-15.962588-7.183164-15.962587-15.962588s7.183164-15.962588 15.962587-15.962588h183.569759c8.779423 0 15.962588 7.183164 15.962587 15.962588s-7.183164 15.962588-15.962587 15.962588z" fill=""></path><path d="M478.877631 795.734996c-8.779423 0-15.962588-7.183164-15.962588-15.962588 0-1.596259-2.394388-144.461419-2.394388-209.109898h-3.990647c-19.953235 0-34.319564-5.586906-43.897116-15.962588-8.779423-8.779423-12.77007-21.549493-11.971941-36.713952 0.798129-12.77007 7.183164-41.502728 50.282151-41.502728 12.77007 0 23.145752 3.192518 29.530787 10.375682 11.971941 11.971941 11.971941 29.530787 11.173812 50.282152v0.798129h31.925175V526.765394c0-31.925175 18.356976-49.484022 51.080281-49.484022 13.5682 0 24.742011 5.586906 32.723304 15.164458 6.385035 7.981294 10.375682 19.155105 10.375682 30.328917 0 23.943882-15.962588 48.685892-44.695245 48.685892h-17.558847v208.311769c0 8.779423-7.183164 15.962588-15.962587 15.962588s-15.962588-7.183164-15.962588-15.962588V571.460639h-31.925175c0.798129 63.850351 2.394388 206.715511 2.394388 208.311769 0.798129 8.779423-5.586906 15.962588-15.164458 15.962588z m77.41855-256.199532h17.558846c10.375682 0 12.77007-11.971941 12.77007-16.760717 0-3.990647-0.798129-7.981294-3.192517-10.375682-0.798129-1.596259-3.192518-3.192518-7.981294-3.192518-16.760717 0-19.155105 3.990647-19.155105 17.558847v12.77007z m-105.353079-30.328917c-17.558846 0-17.558846 5.586906-18.356976 11.971941 0 5.586906 0.798129 10.375682 3.192518 12.77007 3.192518 3.192518 11.173811 5.586906 20.751364 5.586906h3.990647v-0.79813c0-10.375682 0-25.54014-2.394388-27.934528-0.798129-0.798129-2.394388-1.596259-7.183165-1.596259zM332.819953 435.778644c-8.779423 0-15.962588-7.183164-15.962587-15.962588C316.857366 320.848012 398.266563 239.438815 498.032736 239.438815c8.779423 0 15.962588 7.183164 15.962587 15.962588s-7.183164 15.962588-15.962587 15.962588c-82.207327 0-149.250195 67.042868-149.250195 148.452065 0 8.779423-7.183164 15.962588-15.962588 15.962588zM153.240842 444.558067H98.968044c-8.779423 0-15.962588-7.183164-15.962588-15.962588s7.183164-15.962588 15.962588-15.962587h54.272798c8.779423 0 15.962588 7.183164 15.962587 15.962587s-7.183164 15.962588-15.962587 15.962588zM925.031956 444.558067h-54.272798c-8.779423 0-15.962588-7.183164-15.962587-15.962588s7.183164-15.962588 15.962587-15.962587h54.272798c8.779423 0 15.962588 7.183164 15.962588 15.962587s-7.183164 15.962588-15.962588 15.962588zM512.399065 85.399844c-8.779423 0-15.962588-7.183164-15.962588-15.962588V15.962588c0-8.779423 7.183164-15.962588 15.962588-15.962588s15.962588 7.183164 15.962587 15.962588v54.272798c0 8.779423-7.183164 15.164458-15.962587 15.164458z" fill=""></path><path d="M234.650039 205.119252c-3.990647 0-7.981294-1.596259-11.173811-4.788777l-38.310211-38.31021c-6.385035-6.385035-6.385035-15.962588 0-22.347623 6.385035-6.385035 15.962588-6.385035 22.347623 0l38.31021 38.310211c6.385035 6.385035 6.385035 15.962588 0 22.347622-3.192518 3.192518-7.183164 4.788776-11.173811 4.788777z" fill=""></path><path d="M781.368667 205.119252c-3.990647 0-7.981294-1.596259-11.173811-4.788777-6.385035-6.385035-6.385035-15.962588 0-22.347622l38.31021-38.310211c6.385035-6.385035 15.962588-6.385035 22.347623 0s6.385035 15.962588 0 22.347623l-38.31021 38.31021c-3.192518 3.192518-7.183164 4.788776-11.173812 4.788777z" fill=""></path>
                            </svg>
                        </div>
                        <div className={styles["cube"]}>
                            <span className={styles["side-front"]}>hover me</span>
                            <span className={styles["side-top"]}>{"" + clue}</span>
                        </div>
                    </div>
                )}
                {choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => handleChoiceSelect(choice)}
                        className={`${styles['choice-button']} ${selectedChoice === choice ? styles.selected : ''}`}
                    >
                        {choice.text}
                    </button>
                ))}

            </div>
        </div>

    );
};

export default ChatPage;
