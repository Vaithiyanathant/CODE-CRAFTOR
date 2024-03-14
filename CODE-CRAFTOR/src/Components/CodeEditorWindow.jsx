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
} from "firebase/firestore"; // Importing necessary Firestore functions

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
				editorData,
				timestamp: serverTimestamp(),
				uid: auth.currentUser.uid,
			});
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
			await setDoc(userDocRef, { code, timestamp: serverTimestamp() }); // Set code in user document
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
			<button
				className='text-white bg-green-600'
				onClick={handleSaveToFirestore}>
				Save
			</button>
			<button
				className='text-white bg-blue-600'
				onClick={handleToggleSafeMode}>
				{safeMode ? "Safe Mode: On" : "Safe Mode: Off"}
			</button>
		</div>
	);
};

export default CodeEditorWindow;