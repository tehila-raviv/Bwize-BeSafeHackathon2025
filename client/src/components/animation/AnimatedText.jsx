import { motion } from 'framer-motion';

const AnimatedText = () => {
  return (
    <div>
      {/* First motion.div - Slide in from top to bottom */}
      <motion.div
        className="animated-text"
        initial={{ opacity: 0, y: -100 }}  // Start above the screen
        animate={{ opacity: 1, y: 0 }}     // Animate to normal position
        transition={{ duration: 1 }}      
      >
        <h1>Welcome to <strong>Bwize</strong>!</h1>
        <h2>Be wize, don&apos;t fall for the net&apos;s lies!</h2>
      </motion.div>
    

      {/* Second motion.div - Slide in from left to right */}
      <motion.div
        className="animated-text"
        whileHover={{ y: -10 }}   
      >

      </motion.div>
    </div>
  );
};

export default AnimatedText;
