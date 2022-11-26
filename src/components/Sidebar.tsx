import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../assets/img/logo-with-name.png';
import CollapsedLogo from '../assets/img/logo.png';
import HomeIcon from '../assets/img/icons-home.png';
import InactiveHomeIcon from '../assets/img/icons-home-grey.png';
import AddSongIcon from '../assets/img/icons-add-song.png';
import InactiveAddSongIcon from '../assets/img/icons-add-song-grey.png';
import { Link, NavLink } from 'react-router-dom';


function closeNav(){
    document.getElementsByClassName("sidebar")[0].classList.remove("active");
}

const Sidebar = (props: any) => {
    const activeHome =  (
        <div> 
            <img src={HomeIcon} alt="Dashboard" className="sidebar-icon" /> 
            <span className="sidebar-text">Dashboard</span>
        </div>
    )
    const inactiveHome = (
        <div>
            <img src={InactiveHomeIcon} alt="Dashboard" className="sidebar-icon" />
            <span className="sidebar-text">Dashboard</span>
        </div>
    )

    const activeAddSong =  (
        <div> 
            <img src={AddSongIcon} alt="Home" className="sidebar-icon" /> 
            <span className="sidebar-text">Add Song</span>
        </div>
    )
    const inactiveAddSong = (
        <div>
            <img src={InactiveAddSongIcon} alt="Home" className="sidebar-icon" />
            <span className="sidebar-text">Add Song</span>
        </div>
    )
    
    return (
        <div className="sidebar">
            <ul>
                <li className="close-btn">
                    <button className="btn btn-dark bg-dark close-btn" onClick={closeNav}>&times;</button>
                </li>
                <li>
                    <Link to="/" className="logo">
                        <img src={Logo} className="logo-img" alt="Stupefy Logo" />
                    </Link>
                </li>
                <li>
                    <NavLink 
                        to="/" 
                        className="sidebar-content" 
                        id="home" 
                        children={({ isActive }) => isActive? activeHome : inactiveHome}
                    />
                        
                    <NavLink
                        to="/song/create"
                        className="sidebar-content"
                        id="add-song"
                        children={({ isActive }) => isActive? activeAddSong : inactiveAddSong}
                    />
                </li>

            </ul>
        </div>
    );
};

Sidebar.propTypes = {

};

export default Sidebar;