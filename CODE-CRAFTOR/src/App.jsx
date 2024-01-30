/** @format */

import { Login } from "./Components/login/Login";
import { Register } from "./Components/register/Register";
import { Home } from "./Components/home/Home";
import { Hometools } from "./Components/Hometools/Hometools";
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
