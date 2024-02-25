/** @format */

import { Login } from "./Components/login/Login";
import { Register } from "./Components/register/Register";
import { Home } from "./Components/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
	const currentUser = false;

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to='/login' />;
	};

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}></Route>
				<Route
					path='/login'
					element={<Login />}></Route>
				<Route
					path='/register'
					element={<Register />}></Route>
				<Route
					path='/home'
					element={<Home />}></Route>
			</Routes>
		</>
	);
}

export default App;
