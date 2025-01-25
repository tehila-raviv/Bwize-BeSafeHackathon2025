import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.leftSection}>
                <p>
                    Bwize – Be Wize, Don&apos;t Fall for the Net&apos;s Lies! <br />
                    Empowering teens to navigate the online world safely and confidently. <br />
                    Bwize was developed as part of the QueenB X AppsFlyer – BeSafe Hackathon 2025 <br />
                    © 2025 Bwize. All rights reserved.
                </p>
            </div>
            <div className={styles.rightSection}>
            <br/>
            <h5 style={{ color: '#f085a0' }}>💻Developers:</h5>
                <p>
    <a href="https://www.linkedin.com/in/aya-fodi-903320292/" target="_blank" rel="noopener noreferrer">Aya Fodi</a><br></br>
    <a href="https://www.linkedin.com/in/tehila-raviv/" target="_blank" rel="noopener noreferrer">Tehila Raviv</a><br></br>
    <a href="https://www.linkedin.com/in/shoval-mayost-4679351a9/" target="_blank" rel="noopener noreferrer">Shoval Mayost</a><br></br>
    <a href="https://www.linkedin.com/in/yaara-alkalay-40a8a2281/" target="_blank" rel="noopener noreferrer">Yaara Alkalay</a><br></br>
    <a href="https://www.linkedin.com/in/lior-shapira-/" target="_blank" rel="noopener noreferrer">Lior Shapira</a><br></br><br></br><br></br>
</p>
            </div>
        </footer>
    );
};

export default Footer;
