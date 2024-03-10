import React from "react";
import { classnames } from "../utils/general";
const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <h1 className="text-white font-bold text-xl ">
        Input
      </h1>
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "inp w-full border-2 border-white z-10 rounded-md  px-4 py-2 mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
