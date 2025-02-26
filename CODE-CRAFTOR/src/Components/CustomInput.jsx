import React from "react";
import { classnames } from "../utils/general";
const CustomInput = ({ customInput, setCustomInput }) => {
  return (
		<div className='flex flex-col w-full'>
			<h1 className='text-white font-bold text-xl mb-2'>Input</h1>

			<textarea
				rows='5'
				value={customInput}
				onChange={(e) => setCustomInput(e.target.value)}
				placeholder='Enter custom input...'
				className='w-full border-2 border-[#3576df] bg-[#020817] text-white rounded-lg px-4 py-2 mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#4a8af4]'></textarea>
		</div>
	);
};

export default CustomInput;
