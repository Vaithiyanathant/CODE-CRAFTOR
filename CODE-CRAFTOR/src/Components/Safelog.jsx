/** @format */

import { useState, useEffect } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import copy from "copy-to-clipboard";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseconfig";
import Nav from "./home/Nav";
import ParticleBackground from "./Particle";

export const Safelog = () => {
	const [safedata, setsafedata] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const fetchData = async (currentUserUid) => {
			try {
				const q = query(
					collection(db, "safemode"),
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

				setsafedata(dataArray);
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

	const handleCopy = (code) => {
		copy(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			{/* Background & Navbar */}
			<ParticleBackground />
			<Nav />

			{/* Main Container */}
			<div className='max-w-4xl mx-auto mt-8 p-6 bg-[#020817] shadow-lg rounded-lg'>
				<h1 className='text-3xl font-bold text-white mb-5 text-center'>
					Safe Log
				</h1>

				{/* List Container */}
				<ul className='divide-y divide-[#3576df]'>
					{safedata.map((item) => (
						<li
							key={item.id}
							className='py-6 px-4 bg-[#081122] rounded-lg shadow-md hover:bg-[#122137] transition-all duration-200 mb-4'>
							{/* Content Row */}
							<div className='flex flex-col md:flex-row md:justify-between items-start md:items-center'>
								{/* Left Section (Details) */}
								<div className='text-white w-full'>
									<div className='text-[#4a8af4] text-sm mb-1'>
										{item.hoursAgo} ago
									</div>
									<p className='text-gray-400 text-sm'>{item.uid}</p>
									<p className='text-lg font-semibold text-[#3576df]'>
										{item.title}
									</p>
									<p className='text-gray-400 text-sm mb-2'>{item.timestamp}</p>

									{/* Copy Button */}
									<button
										className='text-sm bg-[#3576df] hover:bg-[#4a8af4] text-white px-3 py-1 rounded-lg shadow-md transition mb-2'
										onClick={() => handleCopy(item.code)}>
										{copied ? "Copied!" : "Copy Code"}
									</button>

									{/* Syntax Highlighted Code */}
									<SyntaxHighlighter
										language='javascript'
										style={atomDark}
										className='p-4 rounded-lg border border-[#3576df] bg-[#0d1b2a]'
										showLineNumbers>
										{item.code}
									</SyntaxHighlighter>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Safelog;
