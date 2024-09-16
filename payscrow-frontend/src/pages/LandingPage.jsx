import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/logo-black.png';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <nav>
                <Link to="/about">About Me</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <img src={logo} alt="Payscrow Logo" className="logo" />
            <h1>Welcome to Payscrow</h1>
            <h2>Bridging Payments and Trust</h2>
            <p>
                In the current digitally connected world, advancements in technology have turned the globe into a village, fueling the booming digital market. People are now able to trade with anyone across the world, but this new era of connectivity also brings the fear of being scammed out of hard-earned money. That is where Payscrow comes in. Our robust escrow system ensures that your funds are secure until both parties in the transaction are fully satisfied, eliminating the risk of fraud and building a bridge of trust in every transaction.
            </p>
            <p>
                Payscrow is built with cutting-edge technologies like Node.js, Express.js, React, and Mongoose, ensuring a fast and reliable service for all users. Whether you are an individual or a business, our seamless integration with M-Pesa through Daraja APIs simplifies your payment processes and provides you with a stress-free experience. Join the Payscrow community today and transform the way you handle payments in Kenya, enjoying peace of mind and focusing on what truly matters.
            </p>
            <p>
                At Payscrow, we believe that trust is the foundation of any successful transaction. Our platform not only secures your payments but also fosters a reliable environment for buyers and sellers to interact. We are committed to enhancing your trading experience by providing a transparent, efficient, and secure escrow service that you can depend on for all your financial transactions.
            </p>
        </div>
    );
};

export default LandingPage;
