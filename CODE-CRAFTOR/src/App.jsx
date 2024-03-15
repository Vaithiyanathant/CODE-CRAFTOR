/** @format */
import "./App.css";
import { Login } from "./Components/login/Login";
import { Register } from "./Components/register/Register";
import { Home } from "./Components/home/Home";
import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Historylog from "./Components/HistoryLog";
import  Safelog  from "./Components/Safelog";
function App() {
	return (
		<>
			<UserAuthContextProvider>
				<Routes>
					<Route
						path='/login'
						element={<Login />}></Route>
					<Route
						path='/'
						element={<Home />}></Route>
					<Route
						path='/register'
						element={<Register />}></Route>
					<Route
						path='/home'
						element={<Home />}></Route>
					<Route
						path='/compiler'
						element={
							<ProtectedRoute>
								<Landing />
							</ProtectedRoute>
						}></Route>
					<Route
						path='/history'
						element={<Historylog />}></Route>
					<Route
						path='/safelog'
						element={<Safelog/>}></Route>
				</Routes>
			</UserAuthContextProvider>
		</>
	);
}

export default App;
