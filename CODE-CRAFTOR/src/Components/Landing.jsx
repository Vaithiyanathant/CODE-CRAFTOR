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

const Landing = () => {
	const [code, setCode] = useState();
	const [customInput, setCustomInput] = useState("");
	const [outputDetails, setOutputDetails] = useState(null);
	const [processing, setProcessing] = useState(null);
	const [theme, setTheme] = useState("cobalt");
	const [language, setLanguage] = useState(languageOptions[0]);

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
				"X-RapidAPI-Key": "8e004155bdmsh7e1745ef0ad80a2p12a799jsn62c5bbcd1042",
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
				"X-RapidAPI-Key": "b8bd8f4accmshd7f7e2e5979aab3p1f148ajsn4914764d3488",
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

	return (
		<>
			<Nav></Nav>
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
			<div className='drops flex flex-row'>
				<div className='px-4 py-2'>
					<LanguagesDropdown onSelectChange={onSelectChange} />
				</div>
				<div className='px-4 py-2'>
					<ThemeDropdown
						handleThemeChange={handleThemeChange}
						theme={theme}
					/>
				</div>
			</div>
			<div className='main flex flex-row space-x-4 items-start px-4 py-4'>
				<div className='edit flex flex-col justify-start items-end'>
					<CodeEditorWindow
						code={code}
						onChange={onChange}
						language={language?.value}
						theme={theme.value}
						input={customInput} // Pass customInput as input prop
						outputDetails={outputDetails} // Pass outputDetails.stdout as output prop
					/>
				</div>

				<div className='flex flex-shrink-0 w-[30%] flex-col'>
					<OutputWindow outputDetails={outputDetails} />
					<div className='flex flex-col items-center my-5'>
						<CustomInput
							customInput={customInput}
							setCustomInput={setCustomInput}
						/>
						<button
							onClick={handleCompile}
							disabled={!code}
							className={classnames(
								"tc mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_#1a2d37] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
								!code ? "opacity-50" : ""
							)}>
							{processing ? "Processing..." : "Compile and Execute"}
						</button>
					</div>
					<div className='outerd'>
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
