/** @format */

import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseconfig";
import {
	collection,
	getDocs,
	orderBy,
	query,
	deleteDoc,
	doc,
	where,
} from "firebase/firestore";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
				<div className='relative bg-white rounded-lg overflow-hidden '>
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
							style={atomDark}
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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async (currentUserUid) => {
			try {
				const q = query(
					collection(db, "log"),
					where("uid", "==", currentUserUid),
					orderBy("timestamp", "desc")
				);
				const querySnapshot = await getDocs(q);

				const dataArray = [];
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
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error.message);
				setLoading(false);
			}
		};

		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const currentUserUid = user.uid;
				fetchData(currentUserUid);
			} else {
				console.log("No user signed in.");
				setLoading(false);
				setError("No user signed in.");
			}
		});

		return () => unsubscribe(); // Cleanup function to unsubscribe from auth state changes
	}, []);

	/*
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
*/
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
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<div className='max-w-screen-lg mx-auto'>
				<ToastContainer position='top-right' />{" "}
				{/* Add ToastContainer for notifications */}
				<h1 className='text-3xl font-bold  text-white p-5'>History Log</h1>
			</div>
			<div className="p-10">
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Date
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Timestamp
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Hours Ago
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Code
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Status
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Language
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Memory
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Time
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{data.map((item, index) => (
							<tr
								key={index}
								className='bg-gray-100'>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.timestamp.split(",")[0]}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.timestamp.split(",")[1]}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.hoursAgo}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									<button
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
										onClick={() => handleCodeClick(item.code)}>
										Show Code
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.status}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.language}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.memory}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									{item.time}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
									<button
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
										onClick={() => handleDeleteLog(item.id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{isPopupOpen && (
					<CodePopup
						code={selectedCode}
						onClose={handleClosePopup}
					/>
				)}
			</div>
		</>
	);
};

export default HistoryLog;
