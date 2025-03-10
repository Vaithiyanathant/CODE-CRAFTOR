/** @format */

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import Nav from "./home/Nav";
import { auth, db } from "../firebase/firebaseconfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Landing = () => {
	const [code, setCode] = useState("");
	const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState(null);
	const [processing, setProcessing] = useState(null);
	const [theme, setTheme] = useState("cobalt");
	const [language, setLanguage] = useState(languageOptions[0]);
	const [logName, setLogName] = useState(""); // State for log name
	const [safeMode, setSafeMode] = useState(false); // State to track safe mode

	const enterPress = useKeyPress("Enter");
	const ctrlPress = useKeyPress("Control");

	const onSelectChange = (sl) => {
		console.log("selected Option...", sl);
		setLanguage(sl);
	};

	useEffect(() => {
		if (enterPress && ctrlPress) {
			console.log("enterPress", enterPress);
			console.log("ctrlPress", ctrlPress);
			handleCompile();
		}
	}, [ctrlPress, enterPress]);

	const onChange = (action, data) => {
		switch (action) {
			case "code": {
				setCode(data);
				break;
			}
			default: {
				console.warn("case not handled!", action, data);
			}
		}
	};

	const handleCompile = async () => {
		setProcessing(true);
		const url =
			"https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"Content-Type": "application/json",
				"X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
				"X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
			},
			body: JSON.stringify({
				language_id: language.id,
				source_code: btoa(code),
				stdin: btoa(customInput),
			}),
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			const token = result.token;
			checkStatus(token);
		} catch (error) {
			setProcessing(false);
			console.error(error);
		}
	};

	const checkStatus = async (token) => {
		const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY2,
				"X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			let statusId = result.status?.id;
			if (statusId === 1 || statusId === 2) {
				setTimeout(() => {
					checkStatus(token);
				}, 2000);
				return;
			} else {
				setProcessing(false);
				setOutputDetails(result);
				showSuccessToast(`Compiled Successfully!`);
				return;
			}
		} catch (error) {
			console.error(error);
			setProcessing(false);
			showErrorToast();
		}
	};

	function handleThemeChange(th) {
		const theme = th;
		console.log("theme...", theme);

		if (["light", "vs-dark"].includes(theme.value)) {
			setTheme(theme);
		} else {
			defineTheme(theme.value).then((_) => setTheme(theme));
		}
	}

	useEffect(() => {
		defineTheme("oceanic-next").then((_) =>
			setTheme({ value: "oceanic-next", label: "Oceanic Next" })
		);
	}, []);

	const showSuccessToast = (msg) => {
		toast.success(msg || `Compiled Successfully!`, {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const showErrorToast = (msg, timer) => {
		toast.error(msg || `Something went wrong! Please try again.`, {
			position: "top-right",
			autoClose: timer ? timer : 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	// Function to save editor data to Firestore
	const handleSaveToFirestore = async () => {
		try {
			await addDoc(collection(db, "log"), {
				timestamp: serverTimestamp(),
				uid: auth.currentUser.uid,
				title: logName,
				code: code,
				language: language.value,
				status: outputDetails?.status?.description || "",
				memory: outputDetails?.memory || "",
				time: outputDetails?.time || "",
			});
			toast.success("Code Saved To Log!"); // Show success toast when code is copied

			console.log("Editor data saved to Firestore successfully!");
		} catch (error) {
			console.error("Error saving editor data to Firestore: ", error);
		}
	};

	// Function to toggle safe mode
	const handleToggleSafeMode = () => {
		setSafeMode((prevMode) => !prevMode); // Toggle safe mode state
	};

	return (
		<>
			<Nav />
			<ToastContainer
				position='top-right'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			{/* Top Menu Section */}
			<div className='flex flex-row flex-wrap px-6 py-3 space-x-4 bg-[#020817] text-white'>
				<div className='px-3 py-1'>
					<LanguagesDropdown onSelectChange={onSelectChange} />
				</div>
				<div className='px-4 py-1'>
					<ThemeDropdown
						handleThemeChange={handleThemeChange}
						theme={theme}
					/>
				</div>
			</div>

			{/* Main Section */}
			<div className='main flex flex-col lg:flex-row space-x-4 items-start px-6 py-6 bg-[#020817] text-white'>
				{/* Code Editor Section */}
				<div className='edit flex flex-col justify-start items-end w-full lg:w-2/3 bg-[#020817] shadow-lg rounded-lg p-4'>
					<CodeEditorWindow
						code={code}
						onChange={onChange}
						language={language?.value}
						theme={theme.value}
						outputDetails={outputDetails}
					/>
				</div>

				{/* Output & Controls Section */}
				<div className='flex flex-shrink-0 w-full lg:w-1/3 flex-col'>
					{/* Output Window */}
					<OutputWindow outputDetails={outputDetails} />

					{/* Custom Input & Compile Button */}
					<div className='flex flex-col items-center my-5'>
						<CustomInput
							customInput={customInput}
							setCustomInput={setCustomInput}
						/>
						<button
							onClick={handleCompile}
							disabled={!code}
							className={classnames(
								"mt-4 bg-[#3576df] text-white z-10 rounded-lg shadow-md px-6 py-3 hover:bg-[#4a8af4] transition duration-200 flex-shrink-0 font-semibold",
								!code ? "opacity-50 cursor-not-allowed" : ""
							)}>
							{processing ? "Processing..." : "Compile and Execute"}
						</button>
					</div>

					{/* Output Details Section */}
					<div className='outerd bg-[#020817] rounded-lg shadow-lg p-4'>
						<div className='outd'>
							{outputDetails && <OutputDetails outputDetails={outputDetails} />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Landing;
