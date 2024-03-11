/** @format */

import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const HistoryLog = () => {
	const [safeModeLogs, setSafeModeLogs] = useState([]);
	const [logs, setLogs] = useState([]);
	const [selectedCode, setSelectedCode] = useState("");

	useEffect(() => {
		const fetchSafeModeLogs = async () => {
			const safeModeCollectionRef = collection(
				db,
				`safemode/${currentUserUid}`
			);
			const safeModeSnapshot = await getDocs(safeModeCollectionRef);
			const safeModeData = safeModeSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setSafeModeLogs(safeModeData);
		};

		const fetchLogs = async () => {
			const logCollectionRef = collection(db, "log");
			const logSnapshot = await getDocs(logCollectionRef);
			const logData = logSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setLogs(logData);
		};

		fetchSafeModeLogs();
		fetchLogs();
	}, []);

	const showCode = (code) => {
		setSelectedCode(code);
	};

	return (
		<div>
			<div>
				<h2 className='text-xl font-bold mb-4'>Safe Mode Logs</h2>
				<div className='overflow-x-auto'>
					<table className='table-auto border-collapse border border-gray-400'>
						<thead>
							<tr>
								<th className='border border-gray-400 px-4 py-2'>
									Date and Time
								</th>
								<th className='border border-gray-400 px-4 py-2'>Language</th>
								<th className='border border-gray-400 px-4 py-2'>Status</th>
								<th className='border border-gray-400 px-4 py-2'>Memory</th>
								<th className='border border-gray-400 px-4 py-2'>Code</th>
							</tr>
						</thead>
						<tbody>
							{safeModeLogs.map((log) => (
								<tr key={log.id}>
									<td className='border border-gray-400 px-4 py-2'>
										{log.time}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.language}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.status}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.memory}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										<button
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
											onClick={() => showCode(log.code)}>
											Code
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className='mt-4'>
				<h2 className='text-xl font-bold mb-4'>Log</h2>
				<div className='overflow-x-auto'>
					<table className='table-auto border-collapse border border-gray-400'>
						<thead>
							<tr>
								<th className='border border-gray-400 px-4 py-2'>Time</th>
								<th className='border border-gray-400 px-4 py-2'>Data</th>
								<th className='border border-gray-400 px-4 py-2'>Language</th>
								<th className='border border-gray-400 px-4 py-2'>Status</th>
								<th className='border border-gray-400 px-4 py-2'>Memory</th>
								<th className='border border-gray-400 px-4 py-2'>Code</th>
							</tr>
						</thead>
						<tbody>
							{logs.map((log) => (
								<tr key={log.uid}>
									<td className='border border-gray-400 px-4 py-2'>
										{log.time}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.data}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.language}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.status}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										{log.memory}
									</td>
									<td className='border border-gray-400 px-4 py-2'>
										<button
											className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
											onClick={() => showCode(log.code)}>
											Code
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{selectedCode && (
				<div className='mt-4'>
					<div className='bg-gray-100 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold mb-2'>Code</h3>
						<pre className='overflow-auto bg-gray-200 p-4 rounded-lg'>
							{selectedCode}
						</pre>
					</div>
				</div>
			)}
		</div>
	);
};

export default HistoryLog;
