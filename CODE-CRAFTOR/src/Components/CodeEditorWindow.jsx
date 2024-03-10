/** @format */

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { auth, db } from "../firebase/firebaseconfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CodeEditorWindow = ({
	onChange,
	language,
	code,
	theme,
	outputDetails,
}) => {
	const [value, setValue] = useState(code || "");
	const usercollection = collection(db, "user");

	const [editorData, setEditorData] = useState({
		code: code || "",
		language: language || "javascript",
		status: outputDetails?.status?.description || "",
		memory: outputDetails?.memory || "",
		time: outputDetails?.time || "",
		timestamp: null,
	});

	const handleEditorChange = (value) => {
		setValue(value);
		setEditorData({
			...editorData,
			code: value,
			language: language || "javascript",
			status: outputDetails?.status?.description || "",
			memory: outputDetails?.memory || "",
			time: outputDetails?.time || "",
		});
		onChange("code", value);
		console.log(editorData);
	};

	
	const handleSaveToFirestore = async () => {
		try {
			await addDoc(usercollection, {
				editorData,
			});
			console.log("Editor data saved to Firestore successfully!");
		} catch (error) {
			console.error("Error saving editor data to Firestore: ", error);
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
			<button onClick={handleSaveToFirestore}>Save</button>
		</div>
	);
};

export default CodeEditorWindow;
