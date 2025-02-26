/** @format */
import React from "react";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";

const Dropdown = ({ onLanguageChange, onThemeChange, theme, language }) => {
	return (
		<div className='flex flex-row flex-wrap px-6 py-3 space-x-4 bg-[#020817]'>
			{/* Language Dropdown */}
			<div className='px-3 py-2'>
				<LanguagesDropdown
					onSelectChange={onLanguageChange}
					selectedLanguage={language}
				/>
			</div>

			{/* Theme Dropdown */}
			<div className='px-4 py-2'>
				<ThemeDropdown
					handleThemeChange={onThemeChange}
					theme={theme}
				/>
			</div>
		</div>
	);
};

export default Dropdown;
