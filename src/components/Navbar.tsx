import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { Button, Modal } from 'react-bootstrap';



const Navbar = (props: any) => {
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    function openNav() {
        document.getElementsByClassName("sidebar")[0].classList.add("active");

    }

    const logout = async () => {
        const response = await fetch(`${API_URL}/auth/destroy`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.status === 200) {
            setShow(false);
            props.setAlert({
                type: 'success',
                message: 'Successfully logged out',
            });
            props.setShowAlert(true);
            props.setIsLoggedIn(false);
            navigate('/login');
        } else {
            setShow(false);
            props.setAlert({
                type: 'error',
                message: 'Something went wrong, please try again'
            })
            props.setShowAlert(true);
        }
    }

    const handleClose = () => setShow(false);

    if (props.isLoggedIn) {
        return (
            <header>
                <nav>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Log out Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to log out?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={logout}>
                                Log out
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="nav-content">
                        <button type="button" className="btn btn-dark bg-dark open-btn" onClick={openNav}>
                            <span>&#9776;</span>
                        </button>
                        <div className="container user-info ms-auto">
                            <span className="row user-name align-middle ms-2">{props.user.name}</span>
                            <span className="row user-role align-middle ms-2">{props.user.role}</span>
                        </div>
                        <button className="btn btn-danger logout" onClick={()=>{setShow(true)}}> Log out </button>
                    </div>
                </nav>

            </header>
        );
    } else {
        return null;
    }
};

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;