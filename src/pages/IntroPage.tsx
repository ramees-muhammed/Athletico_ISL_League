import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// import { usePlayers } from '../hooks/usePlayers'; // Fetching counts
import "./IntroPage.scss";
import { pageTransition, staggerContainer, staggerItem } from '../utils/motion';

const IntroPage = () => {
  const navigate = useNavigate();
  // const { players } = usePlayers();

  // const gkCount = players.filter(p => p.position === 'GK').length;
  // const fieldCount = players.length - gkCount;

  return (
    <motion.div 
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="intro-container"
    >
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="logo-wrapper"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src="/images/home_page_img.jpeg" alt="Athletico Logo" />
        </motion.div>
        
        <motion.h1 
          initial={{ letterSpacing: "10px", opacity: 0 }}
          animate={{ letterSpacing: "2px", opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Irumbuzhi <span>Soccer League</span>
        </motion.h1>

        {/* Live Counter Display */}
        <div className="counter-overlay">
          <div className="count-box">
            <span className="label">Goalkeepers</span>
            {/* <span className="number">{gkCount}<span>/10</span></span> */}
          </div>
          <div className="count-box highlight">
            <span className="label">Outfield Players</span>
            {/* <span className="number">{fieldCount}<span>/40</span></span> */}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <motion.section 
        className="rules-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={staggerItem} className="rule-card">
          <div className="card-accent"></div>
          <h3>Match Rules</h3>
          <ul>
            <li>Standard 7-a-side timing and fouls apply.</li>
            <li>Referee's decision is final and binding.</li>
          </ul>
        </motion.div>
        
        <motion.div variants={staggerItem} className="rule-card">
          <div className="card-accent"></div>
          <h3>Playing Rules</h3>
          <ul>
            <li>Players must arrive 30 mins before the match.</li>
            <li>Proper kit and shin guards are mandatory.</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* Fixed Sticky Footer Button */}
      <div className="sticky-footer">
        <button 
          className="btn-register-fixed" 
          onClick={() => navigate('/register')}
          // disabled={players.length >= 50}
        >
          {/* {players.length >= 50 ? 'REGISTRATION FULL' : 'JOIN THE LEAGUE'} */}
          Register
        </button>
      </div>
    </motion.div>
  );
};

export default IntroPage;