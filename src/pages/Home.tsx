import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import '../assets/css/home.css';

import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


library.add(faPlay, faTrash, faEdit);

// const array = [{id: 1, name: 'song1'}, {id: 2, name: 'song2'}, {id: 3, name: 'song3'}];
// const array: any[] =  [];

const Home = (props: any) => {
    const [show, setShow] = useState(false);

    const [songs, setSongs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);

    const [toBeDeleted, setToBeDeleted] = useState({
        id: 0,
        name: ''
    })
    
    let navigate = useNavigate();
    
    const handleClose = () => setShow(false);
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/song?page=${currentPage}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                // console.log(response);
                const data = await response.json();
                // console.log(data);
                
                setSongs(data.data);
                setTotalPages(data.total_page);
                if(currentPage > data.total_page) {
                    setCurrentPage(data.total_page);
                }
                
            } else {
                console.log(response);
                console.log(response.status);
                setSongs([]);
            }
        })();
    }, [limit, currentPage]);

    const onChangeLimit = (e: any) => {
        setLimit(e);
    }

    const onPageChange = (data: any) => {
        const page = data.selected + 1;
        setCurrentPage(page);
        (async () => {
            const response = await fetch(`${API_URL}/song?page=${page}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setSongs(data.data);
            } else {
                setSongs([]);
            }
        }
        )();
    }

    const playSong = (id: number, title: string) => {
        props.setSongName(title);
        props.setSongId(id);
        props.setShowSongController(true);
    }

    const editSong = (id: number, title: string) => {
        props.setOldSongTitle(title);
        navigate(`/song/edit/${id}`);
    }

    const deleteSong = (id: number, title: string) => {
        setShow(true);
        setToBeDeleted({    
            id: id,
            name: title
        });
    }

    const confirmedDelete = async () => {
        if(toBeDeleted.id == props.songId){
            props.setShowSongController(false);
        }
        const response = await fetch(`${API_URL}/song/${toBeDeleted.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.status === 200) {
            setShow(false);

            props.setAlert({
                type: 'success',
                message: 'Song deleted successfully'
            });
            props.setShowAlert(true);

            (async () => {
                const response = await fetch(`${API_URL}/song?page=${currentPage}&limit=${limit}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setSongs(data.data);
                    setTotalPages(data.total_page);
                    
                    if(currentPage > 1 && data.data.length === 0){
                        setCurrentPage(currentPage - 1);
                    }
                } else {
                    setSongs([]);
                    setCurrentPage(0);
                    setTotalPages(0);
                }
            }
            )();
        } else {
            setShow(false);
            props.setAlert({
                type: 'danger',
                message: response.statusText
            });
            props.setShowAlert(true);
        }
    }


       
    if(!props.isLoggedIn){
        navigate('/login');
    }
    return (
        <div className='content'>
            <div className="container-title">
                Your Song
            </div>
            {
                Array.isArray(songs) && songs.length > 0 ? (
                    <div className="container">
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete {toBeDeleted.name}?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={confirmedDelete}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="clearfix d-flex justify-content-end gap-4">
                            <div className="align-self-center m-0 p-0">
                                <p className="font-weight-light m-0 mr-2 text-light">Rows per page: </p>
                            </div>
                            <div className="btn-group align-self-center align-top">
                                <DropdownButton
                                    title={limit}
                                    id="dropdown-menu-align-right"
                                    variant="dark"
                                    onSelect={onChangeLimit}
                                >
                                    <Dropdown.Item eventKey="10" active={limit === "10"}>10</Dropdown.Item>
                                    <Dropdown.Item eventKey="15" active={limit === "15"}>15</Dropdown.Item>
                                    <Dropdown.Item eventKey="20" active={limit === "20"}>20</Dropdown.Item>
                                    <Dropdown.Item eventKey="25" active={limit === "25"}>25</Dropdown.Item>
                                    <Dropdown.Item eventKey="30" active={limit === "30"}>30</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <table className="contents">
                            <thead>
                                <tr>
                                    <th className="text-center song-id">#</th>
                                    <th className="text-center song-name">TITLE</th>
                                    <th className="text-center created-at">DATE ADDED</th>
                                    <th className="text-center song-action">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(songs) ? songs.map((item: any, index) => {
                                        console.log(item)
                                        return (
                                            <tr className="content-entry" key={item.song_id}>
                                                <td className='text-center col-md-1'>{parseInt(limit) * (currentPage - 1) + index + 1}</td>
                                                <td className='text-center col-md-4 fw-normal'>{item.Judul}</td>
                                                <td className='text-center col-md-3 fw-normal'>{moment(item.createdAt).fromNow()}</td>
                                                <td className='text-center col-md-4'>
                                                    <div className="btn-group">
                                                        <button className="btn btn-primary" onClick={() => { playSong(item.song_id, item.Judul) }}>
                                                            <FontAwesomeIcon icon="play" />
                                                            <span className="action-name"> Play </span>
                                                        </button>
                                                        <button className="btn btn-secondary" onClick={() => { editSong(item.song_id, item.Judul) }}>
                                                            <FontAwesomeIcon icon="edit" />
                                                            <span className="action-name"> Edit </span>
                                                        </button>
                                                        <button className="btn btn-danger">
                                                            <FontAwesomeIcon icon="trash" />
                                                            <span className="action-name" onClick={() => { deleteSong(item.song_id, item.Judul )}}> Delete </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </table>
                        <div className="pagination clearfix ms-auto d-flex justify-content-center mt-3">
                            <div className="align-middle align-self-center p-0 m-0 d-flex">
                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    pageCount={totalPages}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={onPageChange}
                                    containerClassName={"pagination justify-content-center m-0"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                    forcePage={currentPage - 1}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container p-0">
                        <table className="contents">
                            <tbody>
                                <tr>
                                    <td>You dont have song yet </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

Home.propTypes = {

};

export default Home;