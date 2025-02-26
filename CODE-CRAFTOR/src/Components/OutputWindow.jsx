/** @format */

import React from "react";

const OutputWindow = ({ outputDetails }) => {
	const getOutput = () => {
		let statusId = outputDetails?.status?.id;

		if (statusId === 6) {
			// compilation error
			return (
				<pre className='px-2 py-1 font-normal text-md text-red-500'>
					{atob(outputDetails?.compile_output)}
				</pre>
			);
		} else if (statusId === 3) {
			return (
				<pre className='px-2 py-1 font-normal text-green-500'>
					{atob(outputDetails.stdout) !== null
						? `${atob(outputDetails.stdout)}`
						: null}
				</pre>
			);
		} else if (statusId === 5) {
			return (
				<pre className='px-2 py-1 font-normal text-red-500'>
					{`Time Limit Exceeded`}
				</pre>
			);
		} else {
			return (
				<pre className='px-2 py-1 font-normal text-red-500'>
					{atob(outputDetails?.stderr)}
				</pre>
			);
		}
	};
	return (
		<div className='flex flex-col items-center w-full'>
			<h1 className='text-xl font-bold text-white mb-3'>Output</h1>

			<div className='border-2 border-[#3576df] bg-[#020817] w-full h-56 rounded-lg p-4 text-white overflow-y-auto shadow-md'>
				{outputDetails ? (
					getOutput()
				) : (
					<p className='text-gray-400'>No Output Available</p>
				)}
			</div>
		</div>
	);
};

export default OutputWindow;
