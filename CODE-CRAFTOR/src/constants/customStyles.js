export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    borderRadius: "5px",
    color: "#1a2d37",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#FFFFFF",   // 
    cursor: "pointer",
    border: "2px solid #1a2d37",
    boxShadow: "5px 5px 0px 0px #1a2d37;",
    ":hover": {
      border: "2px solid #1a2d37",
      boxShadow: "none",
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#1a2d37",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#fff",
      ":hover": {
        backgroundColor: "#1a2d37",
        color: "#fff",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#1a2d37",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
      boxShadow: "2px 2px 2px 2px rgba(0,0,0);",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#1a2d37",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
