/** @format */

import { Login } from "./Components/login/Login";
import { Register } from "./Components/register/Register";
import { Home } from "./Components/home/Home";
import { Routes, Route } from "react-router-dom";
import { Compiler } from "./Components/Compiler/Compiler";
import {Hometools} from "./Components/Home/Hometools";
function App() {
	return (
		<>
			<Routes>
				<Route
					path='/compiler'
					element={<Compiler></Compiler>}></Route>
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
					element={<Hometools/>}></Route>
			</Routes>
		</>
	);
}

export default App;
