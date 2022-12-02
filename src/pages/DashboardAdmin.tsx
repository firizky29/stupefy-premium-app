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
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';


library.add(faCheck, faTimes);

// const array = [{id: 1, name: 'song1'}, {id: 2, name: 'song2'}, {id: 3, name: 'song3'}];
// const array: any[] =  [];

const DashboardAdmin= (props: any) => {
    const [show, setShow] = useState(false);

    const [subscriptions, setSubscriptions] = useState([]);
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
            const response = await fetch(`${API_URL}/subscription-request?page=${currentPage}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const res = await response.json();
                console.log(res);
                let total_page = 0;
                if(res.totalData.RequestsResponse.data) {
                    total_page = Math.ceil(res.totalData.RequestsResponse.data.length/parseInt(limit));
                }
                const data = res.data.RequestsResponse.data;
                setSubscriptions(data);
                setTotalPages(total_page);
                if(currentPage > total_page) {
                    setCurrentPage(total_page);
                }
                console.log(data);
                console.log(currentPage);
                console.log(total_page);
            } else {
                console.log(response);
                console.log(response.status);
                setSubscriptions([]);
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
            const response = await fetch(`${API_URL}/subscription-request?page=${page}&limit=${limit}`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setSubscriptions(data.data.RequestsResponse.data);
            } else {
                setSubscriptions([]);
            }
        }
        )();
    }

    const respondReq = async (creator_id: number, subscriber:number, isAccepted: boolean) => {
        console.log(JSON.stringify({creator_id, subscriber, isAccepted}));
        const response = await fetch(`${API_URL}/subscription-request/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({creator_id, subscriber, isAccepted})
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            (async () => {
                const response = await fetch(`${API_URL}/subscription-request?page=${currentPage}&limit=${limit}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
    
                if (response.status === 200) {
                    const res = await response.json();
                    console.log(res);
                    console.log(res.totalData);
                    let total_page = 0;
                    if(res.totalData.RequestsResponse.data) {
                        total_page = Math.ceil(res.totalData.RequestsResponse.data.length/parseInt(limit));
                    }
                    const data = res.data.RequestsResponse.data;
                    setSubscriptions(data);
                    setTotalPages(total_page);
                    console.log(data);
                    if(total_page==0) {
                        total_page = 0;
                        setTotalPages(total_page);
                    }
                    if(currentPage > 1 && ((data && data.length === 0) || !data)) {
                        if(currentPage-1 > total_page) {
                            setCurrentPage(total_page);
                        } else {
                            setCurrentPage(currentPage - 1);
                        }
                    }
                    
                } else {
                    console.log(response);
                    console.log(response.status);
                    setSubscriptions([]);
                    // setCurrentPage(0);
                    // setTotalPages(0);
                }
            })();            
        } else {
            console.log(response);
        }
    } 
       
    if(!props.isLoggedIn){
        navigate('/login');
    }
    return (
        <div className='content'>
            <div className="container-title">
                Subscription Dashboard
            </div>
            {
                Array.isArray(subscriptions) && subscriptions.length > 0 ? (
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
                                    <th className="text-center subscription-id">#</th>
                                    <th className="text-center creator-id">CREATOR ID</th>
                                    <th className="text-center subscriber-id">SUBSCRIBER ID</th>
                                    <th className="text-center subscription-action">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(subscriptions) ? subscriptions.map((item: any, index) => {
                                        console.log(item)
                                        return (
                                            <tr className="content-entry" key={index}>
                                                <td className='text-center col-md-1'>{parseInt(limit) * (currentPage - 1) + index + 1}</td>
                                                <td className='text-center col-md-4 fw-normal'>{item.creator_id}</td>
                                                <td className='text-center col-md-3 fw-normal'>{item.subscriber}</td>
                                                <td className='text-center col-md-4'>
                                                    <div className="btn-group">
                                                        <button className="btn btn-primary" onClick={() => { respondReq(item.creator_id, item.subscriber, true) }}>
                                                            <FontAwesomeIcon icon="check" />
                                                            <span className="action-name"> Accept </span>
                                                        </button>
                                                        <button className="btn btn-danger">
                                                            <FontAwesomeIcon icon="times" />
                                                            <span className="action-name" onClick={() => { respondReq(item.creator_id, item.subscriber, false )}}> Reject </span>
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
                                    <td>You dont have pending request </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

DashboardAdmin.propTypes = {

};

export default DashboardAdmin;