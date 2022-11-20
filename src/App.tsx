import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Login from './pages/Login'
import Home from './pages/Home'


function App() {
	const [alert, setAlert] = useState('')
	const [show, setShow] = useState(false)


	const [user, setUser] = useState({
		id: '',
		name: '',
		username: '',
		is_admin: false
	})

	const [isLoggedIn, setIsLoggedIn] = useState(false)


	const props = {
		user,
		setUser,
		isLoggedIn,
		setIsLoggedIn,
		alert,
		setAlert,
		show,
		setShow,
	}



	// useEffect(() => {
	// 	(async () => {
	// 		const response = await fetch(`${API_URL}/auth/profile`, {
	// 			headers: { 'Content-Type': 'application/json' },
	// 			credentials: 'include',
	// 		});

	// 		if (response.status === 200) {
	// 			const data = await response.json();
	// 			setUser(preValue => { return { ...preValue, ...data } })
	// 			setIsLoggedIn(true)
	// 		} else {
	// 			setUser(preValue => {
	// 				return {
	// 					...preValue, id: '',
	// 					name: '',
	// 					username: '',
	// 					is_admin: false
	// 				}
	// 			})
	// 			setIsLoggedIn(false)
	// 		}
	// 	}
	// 	)();
	// }, [isLoggedIn]);


	return (
		<Router>
			<div className="App">
				{/* <SuccessAlert {...props} /> */}
				<Sidebar {...props}/>
				<div className="side-container">
					<Navbar {...props} />
					<Routes>
							<Route path="/" element={<Home {...props} />} />
							<Route path="/login" element={<Login {...props} />} />
							{/* <Route path="/register" element={<Register {...props} />} /> */}
							{/* <Route path="/users/:verification_status" element={<Users {...props} />} /> */}
							{/* <Route path="/users" element={<Users {...props} />} /> */}
							{/* <Route path="/transactions/:transaction_status" element={<Transactions {...props} />} /> */}
							{/* <Route path="/transactions" element={<Transactions {...props} />} /> */}
					</Routes>
				</div>
				{/* <div className="container-fluid">
					<div className="row">
						
					</div>
				</div> */}

			</div>
		</Router>
	)
}
export default App