import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../assets/img/logo-with-name.png';
import CollapsedLogo from '../assets/img/logo.png';
import HomeIcon from '../assets/img/icons-home.png';


function closeNav(){
    document.getElementsByClassName("sidebar")[0].classList.remove("active");
}

const Sidebar = (props: any) => {
    return (
        <div className="sidebar">
            <ul>
                <li className="close-btn">
                    <button className="btn btn-dark bg-dark close-btn" onClick={closeNav}>&times;</button>
                </li>
                <li>
                    <a href="/" className="logo">
                        <img src={Logo} className="logo-img" alt="Stupefy Logo" />
                    </a>
                </li>
                <li>
                    <a href="/" className="sidebar-content active" id="home">
                        <img src={HomeIcon} alt="Home" className="sidebar-icon" />
                        <span className="sidebar-text">Dashboard</span>
                    </a>
                </li>

            </ul>
        </div>
    );
};

Sidebar.propTypes = {

};

export default Sidebar;