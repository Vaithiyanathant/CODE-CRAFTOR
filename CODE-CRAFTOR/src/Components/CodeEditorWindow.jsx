/** @format */
import { Link } from "react-router-dom";
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
} from "firebase/firestore"; // Importing necessary Firestore functions
import { toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css";

const CodeEditorWindow = ({
	onChange,
	language,
	code,
	theme,
	outputDetails,
}) => {
	const [value, setValue] = useState(code || "");
	const userCollection = collection(db, "log"); // Change collection name if necessary
	const safeModeCollection = collection(db, "safemode"); // Change collection name if necessary
	const [logName, setLogName] = useState(""); // State for log name

	const [editorData, setEditorData] = useState({
		code: code || "",
		language: language || "javascript",
		status: outputDetails?.status?.description || "",
		memory: outputDetails?.memory || "",
		time: outputDetails?.time || "",
	});

	const [safeMode, setSafeMode] = useState(false); // State to track safe mode

	// UseEffect to fetch code from Firestore when component mounts
	useEffect(() => {
		const fetchData = async () => {
			const userDocRef = doc(db, "safemode", auth.currentUser.uid); // Reference to user document in safemode collection
			const docSnap = await getDoc(userDocRef); // Fetch document snapshot

			if (docSnap.exists()) {
				const { code } = docSnap.data(); // Extract code from document data
				setValue(code); // Set code in editor
			}
		};

		fetchData(); // Invoke fetching function
	}, []);

	// Function to handle editor changes
	const handleEditorChange = (value) => {
		setValue(value); // Update editor value
		setEditorData({
			...editorData,
			code: value,
			language: language || "javascript",
			status: outputDetails?.status?.description || "",
			memory: outputDetails?.memory || "",
			time: outputDetails?.time || "",
		});
		onChange("code", value); // Invoke parent onChange function

		// Save in real-time if safe mode is enabled
		if (safeMode) {
			saveCodeRealtime(value);
		}
	};

	// Function to save editor data to Firestore
	const handleSaveToFirestore = async () => {
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

	// Function to save code in real-time to Firestore
	const saveCodeRealtime = async (code) => {
		try {
			const userDocRef = doc(db, "safemode", auth.currentUser.uid); // Reference to user document in safemode collection
			await setDoc(userDocRef, {
				code,
				timestamp: serverTimestamp(),
				uid: auth.currentUser.uid,
				language: language || "javascript",
			}); // Set code in user document
			console.log("Code saved in real-time to Firestore!");
		} catch (error) {
			console.error("Error saving code in real-time to Firestore: ", error);
		}
	};

	return (
		<div className='overlay rounded-md overflow-hidden w-full h-full shadow-4xl border-2 border-white'>
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
			<input
				type='text'
				placeholder='Log Name'
				className='p-2 m-2 border border-gray-300 rounded'
				value={logName}
				onChange={(e) => setLogName(e.target.value)} // Update logName state
			/>

			<button
				className='text-white bg-green-600 px-4 py-2 rounded mr-2'
				onClick={handleSaveToFirestore}>
				Save
			</button>
			<button
				className={`text-white px-4 py-2 rounded mr-2 ${
					safeMode ? "bg-blue-600" : "bg-gray-600"
				}`}
				onClick={handleToggleSafeMode}>
				{safeMode ? "Safe Mode: On" : "Safe Mode: Off"}
			</button>
			<Link
				to='/history'
				className='inline-block'>
				<button className='text-white bg-orange-400 px-4 py-2 rounded mr-2'>
					History Log
				</button>
			</Link>
			<Link
				to='/safelog'
				className='inline-block'>
				<button className='text-white bg-yellow-800 px-4 py-2 rounded'>
					Safe Mode Log
				</button>
			</Link>
		</div>
	);
};

export default CodeEditorWindow;
