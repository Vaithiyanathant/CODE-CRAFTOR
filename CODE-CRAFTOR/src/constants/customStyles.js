/** @format */

export const customStyles = {
	control: (styles, state) => ({
		...styles,
		width: "100%",
		maxWidth: "14rem",
		borderRadius: "5px",
		fontSize: "0.8rem",
		lineHeight: "1.75rem",
		backgroundColor: "#020817", // Dark background
		color: "#FFFFFF", // White text
		cursor: "pointer",
		border: "2px solid #3576df", // Always blue border
		boxShadow: state.isFocused ? "0 0 10px #3576df" : "5px 5px 0px 0px #3576df",
		transition: "all 0.3s ease",
		":hover": {
			border: "2px solid #3576df",
			boxShadow: "0 0 15px #3576df",
		},
	}),

	option: (styles, state) => ({
		...styles,
		fontSize: "0.8rem",
		lineHeight: "1.75rem",
		width: "100%",
		backgroundColor: state.isSelected
			? "#3576df" // Blue for selected
			: state.isFocused
			? "#1e3a8a" // Slightly lighter blue on hover
			: "#020817", // Dark background
		color: state.isSelected ? "#ffffff" : "#ffffff",
		transition: "background-color 0.2s ease-in-out",
		":hover": {
			backgroundColor: "#1e3a8a",
			color: "#ffffff",
			cursor: "pointer",
		},
	}),

	menu: (styles) => ({
		...styles,
		backgroundColor: "#020817",
		maxWidth: "14rem",
		border: "2px solid #3576df", // Always blue border
		borderRadius: "5px",
		boxShadow: "0 0 10px rgba(53, 118, 223, 0.5)",
	}),

	singleValue: (styles) => ({
		...styles,
		color: "#FFFFFF", // White text for selected value
	}),

	placeholder: (styles) => ({
		...styles,
		color: "#ffffff",
		fontSize: "0.8rem",
		lineHeight: "1.75rem",
	}),
};
