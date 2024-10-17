/** @format */

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyAZCiiK2eKYMyOhhlAcprINcPOazRP02ho";

const genAI = new GoogleGenerativeAI(apiKey);
// api key

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-pro",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
};

const RefactorCode = () => {
	const [inputCode, setInputCode] = useState("");
	const [refactoredCode, setRefactoredCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleRefactor = async () => {
		setLoading(true);
		setError("");

		const chatSession = model.startChat({
			generationConfig,
			history: [],
		});

		try {
			const result = await chatSession.sendMessage(inputCode);
			setRefactoredCode(result.response.text());
		} catch (err) {
			setError("Error refactoring code: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
			<h1 className='text-2xl font-bold mb-4'>Code Refactor Tool</h1>
			<textarea
				className='w-full h-48 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400'
				placeholder='Enter your code here...'
				value={inputCode}
				onChange={(e) => setInputCode(e.target.value)}
			/>
			<button
				className='mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
				onClick={handleRefactor}
				disabled={loading}>
				{loading ? "Refactoring..." : "Refactor Code"}
			</button>
			{error && <p className='mt-2 text-red-500'>{error}</p>}
			<h2 className='mt-4 text-xl font-semibold'>Refactored Code:</h2>
			<pre className='w-full p-4 mt-2 border border-gray-300 rounded-md bg-white'>
				{refactoredCode}
			</pre>
		</div>
	);
};

export default RefactorCode;
