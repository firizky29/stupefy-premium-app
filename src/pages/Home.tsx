import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../assets/css/home.css';

library.add(faPlay, faTrash, faEdit);

const array = [{id: 1, name: 'song1'}, {id: 2, name: 'song2'}, {id: 3, name: 'song3'}];
// const array: any[] =  [];

const Home = (props:any) => {
    // const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);

    const onChangeLimit = (e: any) => {
        setLimit(e);
    }

    const onPageChange = (data: any) => {
        const page = data.selected + 1;
        setCurrentPage(page);
    }
    
    return (
        <div className='content'>
            <div className="container-title">
                Your Song
            </div>
            {
                Array.isArray(array) && array.length > 0 ? (
                    <div className="container">
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
                                Array.isArray(array) ? array.map((item:any) => {
                                    return (
                                            <tr className="content-entry" key={item.id}>
                                                <td className='text-center col-md-1'>{item.id}</td>
                                                <td className='text-center col-md-4'>{item.name}</td>
                                                <td className='text-center col-md-4'>{item.name}</td>
                                                <td className='text-center col-md-3'>
                                                    <div className="btn-group">
                                                        <button className="btn btn-primary">
                                                            <FontAwesomeIcon icon="play" />
                                                            <span className="action-name"> Play </span>
                                                        </button>
                                                        <button className="btn btn-secondary">
                                                            <FontAwesomeIcon icon="edit" />
                                                            <span className="action-name"> Edit </span>
                                                        </button>
                                                        <button className="btn btn-danger">
                                                            <FontAwesomeIcon icon="trash" />
                                                            <span className="action-name"> Delete </span>
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