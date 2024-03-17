/** @format */

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseconfig";

export const Safelog = () => {
	const [safedata, setsafedata] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='container mx-auto mt-5'>
			<h1 className='text-white text-2xl font-bold mb-3'>Safelog</h1>
			<ul className='divide-y divide-gray-300'>
				{safedata.map((item) => (
					<li
						key={item.id}
						className='py-4'>
						<div className='flex flex-col md:flex-row md:justify-between items-center'>
							<div className='text-white'>
								<p className='font-bold'>{item.title}</p>
								<p className='text-sm'>{item.timestamp}</p>
								<p className='text-sm'>{item.code}</p>
								<p className='text-sm'>{item.uid}</p>
							</div>
							<div className='text-gray-500 mt-2 md:mt-0'>{item.hoursAgo}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Safelog;
