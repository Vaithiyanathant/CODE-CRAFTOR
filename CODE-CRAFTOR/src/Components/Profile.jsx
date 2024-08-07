/** @format */

import React from "react";

export default function Profile() {
	// Assuming you store user info in localStorage
	const user = {
		name: localStorage.getItem("userName"),
		email: localStorage.getItem("userEmail"),
		profileImage: localStorage.getItem("profileImage"),
	};

	return (
		<div className='max-w-2xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg'>
			<div className='flex items-center'>
				<img
					className='h-24 w-24 rounded-full mr-4'
					src={user.profileImage}
					alt='Profile'
				/>
				<div>
					<h2 className='text-2xl font-bold'>{user.name}</h2>
					<p className='text-gray-600'>{user.email}</p>
				</div>
			</div>
		</div>
	);
}
