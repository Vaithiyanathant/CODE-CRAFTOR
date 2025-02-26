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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParticleBackground from "./Particle";
import Nav from "./home/Nav";

const CodePopup = ({ code, onClose }) => {
	const [copied, setCopied] = useState(false);

	const handleCopyCode = () => {
		copy(code);
		setCopied(true);
		toast.success("Code copied to clipboard!");
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};

	return (
		<div className='fixed z-10 inset-0 overflow-y-auto bg-[#020817] bg-opacity-80'>
			<div className='flex items-center justify-center min-h-screen'>
				{/* Background Overlay */}
				<div
					className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
					aria-hidden='true'></div>

				{/* Popup Container */}
				<div className='relative bg-[#081122] text-white rounded-lg shadow-lg w-[90%] md:w-[50%] lg:w-[40%] overflow-hidden'>
					{/* Header Section */}
					<div className='flex justify-between items-center border-b border-[#3576df] p-4'>
						<h2 className='text-lg font-semibold text-white'>Code</h2>
						<div className='flex'>
							{/* Copy Button */}
							<button
								className='m-2 px-3 py-1 bg-[#3576df] hover:bg-[#4a8af4] text-white font-bold text-xs rounded-lg shadow-md transition'
								onClick={handleCopyCode}>
								Copy
							</button>
							{/* Close Button */}
							<button
								className='m-2 px-3 py-1 bg-red-500 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-md transition'
								onClick={onClose}>
								Close
							</button>
						</div>
					</div>

					{/* Code Display Section */}
					<div className='relative p-4'>
						<SyntaxHighlighter
							language='javascript'
							style={atomDark}
							className='p-4 overflow-x-auto rounded-lg border border-[#3576df] bg-[#0d1b2a]'
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

		return () => unsubscribe();
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
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<ParticleBackground />
			<Nav></Nav>
			{/* Full Dark Background */}
			<div className='max-w-screen-lg mx-auto'>
				<ToastContainer position='top-right' />
				<h1 className='text-3xl font-bold text-white p-5 text-center'>
					History Log
				</h1>
			</div>

			{/* Table Container */}
			<div className='p-6 bg-[#020817] rounded-lg shadow-lg max-w-screen-xl mx-auto'>
				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse border border-[#3576df] rounded-lg shadow-lg'>
						{/* Table Header */}
						<thead className='bg-[#3576df] text-white uppercase tracking-wider'>
							<tr>
								{[
									"Date",
									"Timestamp",
									"Hours Ago",
									"Code",
									"Status",
									"Language",
									"Memory",
									"Time",
									"Actions",
								].map((header) => (
									<th
										key={header}
										className='px-6 py-3 text-left text-xs font-semibold'>
										{header}
									</th>
								))}
							</tr>
						</thead>

						{/* Table Body */}
						<tbody className='divide-y divide-[#3576df] bg-[#081122] text-white'>
							{data.map((item, index) => (
								<tr
									key={index}
									className='hover:bg-[#122137] transition-all duration-200'>
									<td className='px-6 py-4 text-sm'>
										{item.timestamp.split(",")[0]}
									</td>
									<td className='px-6 py-4 text-sm'>
										{item.timestamp.split(",")[1]}
									</td>
									<td className='px-6 py-4 text-sm'>{item.hoursAgo}</td>

									{/* Code Button */}
									<td className='px-6 py-4 text-sm'>
										<button
											className='bg-[#3576df] hover:bg-[#4a8af4] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition'
											onClick={() => handleCodeClick(item.code)}>
											Show Code
										</button>
									</td>

									<td className='px-6 py-4 text-sm'>{item.status}</td>
									<td className='px-6 py-4 text-sm'>{item.language}</td>
									<td className='px-6 py-4 text-sm'>{item.memory}</td>
									<td className='px-6 py-4 text-sm'>{item.time}</td>

									{/* Delete Button */}
									<td className='px-6 py-4 text-sm'>
										<button
											className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition'
											onClick={() => handleDeleteLog(item.id)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Popup for Code Display */}
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
