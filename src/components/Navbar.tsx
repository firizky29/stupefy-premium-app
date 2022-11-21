import React from 'react';
import PropTypes from 'prop-types';

function openNav(){
    document.getElementsByClassName("sidebar")[0].classList.add("active");

}

const Navbar = (props: any) => {
    if (!props.isLoggedIn) {
        return (
            <header>
                <nav>
                    <div className="nav-content">
                        <button className="btn btn-dark bg-dark open-btn" onClick={openNav}>
                            <span>&#9776;</span>
                        </button>
                        {/* <div className="user-info"> */}
                            <div className="container user-info ms-auto">
                                <span className="row user-name align-middle ms-2">DeeGeeDow</span>
                                <span className="row user-role align-middle ms-2">Singer</span>
                            </div>
                        {/* </div> */}
                        <a className="logout" > Log out </a>
                    </div>
                </nav>

            </header>
        );
    } else {
        return (
            <div>
                {/* Hello World */}
            </div>
        );
    }
};

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;