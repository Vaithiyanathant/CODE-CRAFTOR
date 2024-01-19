/** @format */

import "./App.css";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { Home } from "./home/Home";
import { Hometools } from "./Hometools/Hometools";
function App() {
	return (
		<>
			<Hometools></Hometools>
			<Home></Home>
			<Register></Register>
			<Login></Login>
		</>
	);
}

export default App;
