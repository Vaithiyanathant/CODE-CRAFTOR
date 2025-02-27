/** @format */

import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseconfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParticleBackground from "./Particle";
import Nav from "./home/Nav";
import ReactECharts from "echarts-for-react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function Dashboard() {
	const [user, setUser] = useState({
		name: "",
		email: "",
		profileImage: "",
	});

	const [historyData, setHistoryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [chartData, setChartData] = useState([]);
	const [statusData, setStatusData] = useState([]);
	const [languageData, setLanguageData] = useState([]);

	useEffect(() => {
		const fetchData = async (currentUserUid) => {
			try {
				const q = query(
					collection(db, "log"),
					where("uid", "==", currentUserUid),
					orderBy("timestamp", "desc")
				);
				const querySnapshot = await getDocs(q);

				const historyArray = [];
				const logCountByDate = {};
				const statusCount = { Success: 0, Failure: 0, Error: 0 };
				const languageUsage = {};

				querySnapshot.forEach((doc) => {
					const logData = doc.data();
					const timestamp = new Date(logData.timestamp.seconds * 1000);
					const dateStr = timestamp.toISOString().split("T")[0]; // YYYY-MM-DD format

					// Store history data
					historyArray.push({
						id: doc.id,
						...logData,
						timestamp: dateStr,
					});

					// Aggregate log counts per day
					logCountByDate[dateStr] = (logCountByDate[dateStr] || 0) + 1;

					// Count status occurrences
					statusCount[logData.status] = (statusCount[logData.status] || 0) + 1;

					// Count language usage
					languageUsage[logData.language] =
						(languageUsage[logData.language] || 0) + 1;
				});

				// Convert log count object into sorted array
				const formattedChartData = Object.keys(logCountByDate)
					.sort() // Sort dates
					.map((date) => ({
						date,
						logs: logCountByDate[date],
					}));

				const formattedLanguageData = Object.keys(languageUsage).map(
					(lang) => ({
						name: lang,
						value: languageUsage[lang],
					})
				);

				setHistoryData(historyArray);
				setChartData(formattedChartData);
				setStatusData([
					{ name: "Success", value: statusCount.Success },
					{ name: "Failure", value: statusCount.Failure },
					{ name: "Error", value: statusCount.Error },
				]);
				setLanguageData(formattedLanguageData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser({
					name: user.displayName || user.email.split("@")[0],
					email: user.email,
					profileImage:
						user.photoURL ||
						"https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg",
				});
				fetchData(user.uid);
			} else {
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	// 📈 Line Chart for Daily Log Counts
	const getAreaChartOptions = () => ({
		tooltip: { trigger: "axis" },
		grid: { left: "5%", right: "5%", bottom: "10%", containLabel: true },
		xAxis: {
			type: "category",
			data: chartData.map((item) => item.date), // Daily logs by date
			axisLabel: { color: "#ffffff" },
		},
		yAxis: {
			type: "value",
			axisLabel: { color: "#ffffff" },
		},
		series: [
			{
				name: "Logs per Day",
				type: "line",
				smooth: true,
				areaStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{ offset: 0, color: "#3576df" },
							{ offset: 1, color: "#020817" },
						],
					},
				},
				data: chartData.map((item) => item.logs), // Log count per day
				color: "#3576df",
			},
		],
	});

	// 🥧 Pie Chart (Status & Language Distribution)
	const getPieChartOptions = (data) => ({
		tooltip: { trigger: "item" },
		series: [
			{
				type: "pie",
				radius: ["45%", "70%"],
				data,
				padAngle: 8,
				itemStyle: {
					borderRadius: 8,
					borderColor: "#020817",
					borderWidth: 2,
				},
			},
		],
		color: ["#3576df", "#1E40AF", "#60A5FA"],
	});

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<ParticleBackground />
			<Nav />
			<ToastContainer position='top-right' />

			<div className='max-w-7xl mx-auto p-8'>
				{/* Profile & Area Chart Section */}
				<div className='flex flex-col md:flex-row gap-6 items-start'>
					<div className='bg-[#020817] text-white p-8 rounded-lg shadow-lg border border-[#3576df] w-full md:w-1/4 flex flex-col items-center'>
						{/* Profile Image */}
						<img
							className='h-28 w-28 rounded-full mb-4 border-4 border-[#3576df] shadow-md'
							src={user.profileImage}
							alt='Profile'
						/>

						{/* Name */}
						<h2 className='text-2xl font-bold text-[#3576df] mb-2'>
							{user.name}
						</h2>

						{/* Email */}
						<p className='text-gray-400 text-lg mb-4'>{user.email}</p>

						{/* Buttons Section */}
						<div className='w-full flex flex-col gap-4 mt-2'>
							{/* Compiler Button */}
							<Link
								to='/compiler'
								className='bg-[#3576df] hover:bg-[#1E40AF] text-white font-semibold py-2 px-6 rounded-lg text-center shadow-md transition duration-300'>
								⚡ Compiler
							</Link>

							{/* Save Log Button */}
							<Link
								to='/safelog'
								className='bg-[#1E40AF] hover:bg-[#3576df] text-white font-semibold py-2 px-6 rounded-lg text-center shadow-md transition duration-300'>
								📌 Safe Save Log
							</Link>

							{/* History Log Button */}
							<Link
								to='/history'
								className='bg-[#60A5FA] hover:bg-[#3576df] text-white font-semibold py-2 px-6 rounded-lg text-center shadow-md transition duration-300'>
								📜 History Log
							</Link>
						</div>
					</div>
					;{/* Line Chart for Daily Logs */}
					<div className='bg-[#020817] p-6 rounded-lg shadow-lg border border-[#3576df] w-full md:w-3/4'>
						<h3 className='text-lg font-semibold text-white mb-4'>
							📈 Logs Over Time
						</h3>
						<ReactECharts
							option={getAreaChartOptions()}
							style={{ height: 300 }}
						/>
					</div>
				</div>

				{/* Pie Charts Section */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
					{/* Status Pie Chart */}
					<div className='bg-[#020817] p-6 rounded-lg shadow-lg border border-[#3576df]'>
						<h3 className='text-lg font-semibold text-white mb-4'>
							🥧 Status Distribution
						</h3>
						<ReactECharts
							option={getPieChartOptions(statusData)}
							style={{ height: 350 }}
						/>
					</div>

					{/* Language Pie Chart */}
					<div className='bg-[#020817] p-6 rounded-lg shadow-lg border border-[#3576df]'>
						<h3 className='text-lg font-semibold text-white mb-4'>
							🗂️ Language Usage
						</h3>
						<ReactECharts
							option={getPieChartOptions(languageData)}
							style={{ height: 350 }}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

