/** @format */

import "./App.css";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { Home } from "./home/Home";
import { Hometools } from "./Hometools/Hometools";
import { Routes, Route } from "react-router-dom";
function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Home />}></Route>
				<Route
					path='/login'
					element={<Login />}></Route>
				<Route
					path='/register'
					element={<Register />}></Route>
				<Route
					path='/hometools'
					element={<Hometools />}></Route>
			</Routes>
		</>
	);
}

export default App;
