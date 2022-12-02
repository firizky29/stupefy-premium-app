import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AdminSidebar from './components/Sidebar'
import SongController from './components/SongController'
import Alerts from './components/Alerts'


import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddSong from './pages/AddSong'
import EditSong from './pages/EditSong' 
import DashboardAdmin from './pages/DashboardAdmin' 
import { API_URL } from './config'


function App() {
	

	const [alert, setAlert] = useState({
		type: 'error',
		message: 'Gagal'
	})
	const [showAlert, setShowAlert] = useState(false)



	const [showSongController, setShowSongController] = useState(false)
	const [songId, setSongId] = useState(0)
	const [songName, setSongName] = useState(0)
	const [oldSongTitle, setOldSongTitle] = useState('')


	const [user, setUser] = useState({
		name: '',
		role: ''
	})

	const [isLoggedIn, setIsLoggedIn] = useState(false)


	// const props = {
	// 	user,
	// 	setUser,
	// 	isLoggedIn,
	// 	setIsLoggedIn,
	// 	alert,
	// 	setAlert,
	// 	showSongController,
	// 	setShowSongController,
	// 	songId,
	// 	setSongId
	// }

	const generalProps = {
		isLoggedIn,
		setShowSongController,
		showSongController,
		user,
		setAlert,
		setShowAlert,
	}

	const loginProps = {
		...generalProps,
		setUser,
		setIsLoggedIn,
		setAlert
	}

	const registerProps = {
		...generalProps,
		setIsLoggedIn,
		setAlert
	}

	const homeProps = {
		...generalProps,
		setSongId,
		setAlert,
		setOldSongTitle,
		setSongName,
		songId
	}

	const addSongProps = {
		...generalProps,
		setAlert,
		setSongId,
		formType: 'Add Song',
	}

	const editSongProps = {
		...generalProps,
		setAlert,
		setSongId,
		formType: 'Edit Song',
		oldSongTitle
	}

	const navbarProps = {
		...generalProps,
		user,
		setUser,
		setIsLoggedIn,
	}

	const songControllerProps = {
		...generalProps,
		songId,
		setSongId,
		songName,
		setSongName,
	}

	const sidebarProps = {
		...generalProps,
	}

	const alertProps = {
		...generalProps,
		alert,
		showAlert
	}





	useEffect(() => {
		(async () => {
			const response = await fetch(`${API_URL}/auth/`, {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			});

			if (response.status === 200) {
				const data = await response.json();
				setUser(preValue => { return { ...preValue, role: data.role, name:data.name} })
				setIsLoggedIn(true)
			} else {
				setUser(preValue => {
					return {
						...preValue,
						role: '',
						name: ''
					}
				})
				setIsLoggedIn(false)
			}
		}
		)();
	}, [isLoggedIn]);

	if(!isLoggedIn){
		return(
			<Router>
				<div className="App">
					<Alerts {...alertProps} />
					<Routes>
						<Route path="/login" element={<Login {...loginProps} />} />
						<Route path="/register" element={<Register {...registerProps} />} />
						<Route path="*" element={<Login {...loginProps} />} />
					</Routes>
				</div>
			</Router>
		)
	}
	else if(user.role !== 'admin'){
		return (
			<Router>
				<div className="App">
					<Alerts {...alertProps} />
					<Sidebar {...sidebarProps}/>
					<div className="side-container">
						<Navbar {...navbarProps} />
						<Routes>
								<Route path="/song">
									<Route path="create" element={<AddSong {...addSongProps} />} />
									<Route path="edit/:id" element={<EditSong {...editSongProps} />} />
								</Route>
								<Route path="/" element={<Home {...homeProps} />} />
						</Routes>
					</div>
					<SongController {...songControllerProps}/>
				</div>
			</Router>
		)
	} else{
		return (
			<Router>
				<div className="App">
					<Alerts {...alertProps} />
					<AdminSidebar {...sidebarProps}/>
					<div className="side-container">
						<Navbar {...navbarProps} />
						<Routes>
							<Route path="/" element={<DashboardAdmin {...homeProps} />} />
						</Routes>
					</div>
	
				</div>
			</Router>
		);
	}
}
export default App