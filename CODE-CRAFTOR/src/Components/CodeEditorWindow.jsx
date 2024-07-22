/** @format */
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { auth, db } from "../firebase/firebaseconfig";
import {
	addDoc,
	collection,
	doc,
	setDoc,
	serverTimestamp,
	getDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeEditorWindow = ({
	onChange,
	language,
	code,
	theme,
	outputDetails,
}) => {
	const [value, setValue] = useState(code || "");
	const userCollection = collection(db, "log");
	const [logName, setLogName] = useState("");
	const [safeMode, setSafeMode] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!auth.currentUser) {
				console.error("User not authenticated");
				return;
			}

			const userDocRef = doc(db, "safemode", auth.currentUser.uid);
			try {
				const docSnap = await getDoc(userDocRef);

				if (docSnap.exists()) {
					const { code } = docSnap.data();
					setValue(code);
				}
			} catch (error) {
				console.error("Error fetching document: ", error);
			}
		};

		fetchData();
	}, []);

	const handleEditorChange = (value) => {
		setValue(value);
		onChange("code", value);

		if (safeMode) {
			saveCodeRealtime(value);
		}
	};

	const handleSaveToFirestore = async () => {
		if (!auth.currentUser) {
			console.error("User not authenticated");
			return;
		}

		try {
			await addDoc(userCollection, {
				timestamp: serverTimestamp(),
				uid: auth.currentUser.uid,
				title: logName,
				code: value,
				language: language || "javascript",
				status: outputDetails?.status?.description || "",
				memory: outputDetails?.memory || "",
				time: outputDetails?.time || "",
			});
			toast.success("Code Saved To Log!");

			console.log("Editor data saved to Firestore successfully!");
		} catch (error) {
			console.error("Error saving editor data to Firestore: ", error);
			toast.error("Failed to save code.");
		}
	};

	const saveCodeRealtime = async (code) => {
		if (!auth.currentUser) {
			console.error("User not authenticated");
			return;
		}

		try {
			const userDocRef = doc(db, "safemode", auth.currentUser.uid);
			await setDoc(userDocRef, {
				code,
				timestamp: serverTimestamp(),
				uid: auth.currentUser.uid,
				language: language || "javascript",
			});
			console.log("Code saved in real-time to Firestore!");
		} catch (error) {
			console.error("Error saving code in real-time to Firestore: ", error);
		}
	};

	const handleToggleSafeMode = () => {
		setSafeMode((prevMode) => {
			const newMode = !prevMode;
			toast.info(`Safe Mode ${newMode ? "Enabled" : "Disabled"}`);
			return newMode;
		});
	};

	return (
		<div className='overlay rounded-md overflow-hidden w-full h-full shadow-4xl border-2 border-white'>
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
			<div className='controls flex flex-col sm:flex-row items-center sm:justify-start p-4'>
				<input
					type='text'
					placeholder='Log Name'
					className='p-2 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded w-full sm:w-auto'
					value={logName}
					onChange={(e) => setLogName(e.target.value)}
				/>

				<div className='flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2'>
					<button
						className='text-white bg-green-600 px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto'
						onClick={handleSaveToFirestore}>
						Save
					</button>
					<button
						className={`text-white px-4 py-2 rounded w-full sm:w-auto ${
							safeMode ? "bg-blue-600" : "bg-gray-600"
						} mb-2 sm:mb-0`}
						onClick={handleToggleSafeMode}>
						{safeMode ? "Safe Mode: On" : "Safe Mode: Off"}
					</button>
				</div>
			</div>

			<Editor
				options={{ fontFamily: "Ubuntu Mono", fontSize: "17px" }}
				height='80vh'
				width={`100%`}
				language={language || "javascript"}
				value={value}
				theme={theme}
				defaultValue='// some comment'
				onChange={handleEditorChange}
			/>
		</div>
	);
};

export default CodeEditorWindow;
