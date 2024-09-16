import profileImage from '../assets/me.jpg';
import './AboutMe.css';

const AboutMe = () => {
    return (
        <div className="about-me-container">
            <img src={profileImage} alt="Your Name" className="profile-image" />
            <div className="about-me">
                <h1>About Me</h1>
                <p>Welcome to my portfolio! I am Ian, a software engineer with a passion for technology and development. I specialize in creating efficient and effective solutions for complex problems, utilizing a wide range of technologies and methodologies. My journey in software development has been driven by curiosity and a desire to constantly learn and improve. Outside of coding, I enjoy engaging in tech discussions, exploring new places, and contributing to community projects. Feel free to explore my projects and get in touch!</p>
            </div>
        </div>
    );
};

export default AboutMe;
