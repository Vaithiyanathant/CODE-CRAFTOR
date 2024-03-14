/** @format */

import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import {
	collection,
	getDocs,
	orderBy,
	query,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css";

const CodePopup = ({ code, onClose }) => {
	const [copied, setCopied] = useState(false);

	const handleCopyCode = () => {
		copy(code);
		setCopied(true);
		toast.success("Code copied to clipboard!"); // Show success toast when code is copied
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};

	return (
		<div className='fixed z-10 inset-0 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen'>
				<div
					className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
					aria-hidden='true'></div>
				<div className='relative bg-white rounded-lg overflow-hidden max-w-lg'>
					<div className='flex justify-between border-b border-gray-200 p-4'>
						<h2 className='text-lg font-semibold'>Code</h2>
						<div className='flex'>
							<button
								className='m-2 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs rounded'
								onClick={handleCopyCode}>
								Copy
							</button>
							<button
								className='text-gray-500 hover:text-gray-600 mr-2'
								onClick={onClose}>
								Close
							</button>
						</div>
					</div>

					<div className='relative p-2 '>
						<SyntaxHighlighter
							language='javascript'
							style={darcula}
							className='p-2 overflow-x-auto rounded-lg'
							showLineNumbers>
							{code}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</div>
	);
};

const HistoryLog = () => {
	const [data, setData] = useState([]);
	const [selectedCode, setSelectedCode] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataArray = [];
				const q = query(collection(db, "log"), orderBy("timestamp", "desc"));
				const querySnapshot = await getDocs(q);

				querySnapshot.forEach((doc) => {
					const logData = doc.data();
					const timestamp = new Date(logData.timestamp.seconds * 1000);
					const formattedTimestamp = timestamp.toLocaleString();
					const hoursAgo = calculateHoursAgo(timestamp);

					dataArray.push({
						id: doc.id,
						...logData,
						timestamp: formattedTimestamp,
						hoursAgo,
					});
				});

				setData(dataArray);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleCodeClick = (code) => {
		setSelectedCode(code);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	const calculateHoursAgo = (timestamp) => {
		const currentTimestamp = new Date();
		const diff = currentTimestamp - timestamp;
		const hours = Math.floor(diff / (1000 * 60 * 60));

		if (hours === 0) {
			const minutes = Math.floor(diff / (1000 * 60));
			return `${minutes} minutes ago`;
		} else if (hours === 1) {
			return "1 hour ago";
		} else {
			return `${hours} hours ago`;
		}
	};

	const handleDeleteLog = async (logId) => {
		try {
			await deleteDoc(doc(db, "log", logId));
			setData(data.filter((item) => item.id !== logId));
			toast.error("log deleted"); // Show success toast when code is copied
		} catch (error) {
			console.error("Error deleting log:", error);
		}
	};

	return (
		<div className='max-w-screen-lg mx-auto'>
			<ToastContainer position='top-right' />{" "}
			{/* Add ToastContainer for notifications */}
			<h1 className='text-3xl font-bold mb-6'>History Log</h1>
			<div>
				{data.map((item, index) => (
					<div
						key={index}
						className='bg-gray-100 p-4 mb-4 rounded-md shadow-md'>
						<h3 className='text-xl font-bold mb-2'>Log {index + 1}</h3>
						<p className='text-gray-600 mb-2'>
							Timestamp: {item.timestamp} ({item.hoursAgo})
						</p>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
							onClick={() => handleCodeClick(item.editorData.code)}>
							Show Code
						</button>
						<button
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
							onClick={() => handleDeleteLog(item.id)}>
							Delete
						</button>
						<p className='text-gray-600'>Status: {item.editorData.status}</p>
						<p className='text-gray-600'>
							Language: {item.editorData.language}
						</p>
						<p className='text-gray-600'>Memory: {item.editorData.memory}</p>
						<p className='text-gray-600'>Time: {item.editorData.time}</p>
						<p className='text-gray-600'>uid: {item.uid}</p>
					</div>
				))}
			</div>
			{isPopupOpen && (
				<CodePopup
					code={selectedCode}
					onClose={handleClosePopup}
				/>
			)}
		</div>
	);
};

export default HistoryLog;
