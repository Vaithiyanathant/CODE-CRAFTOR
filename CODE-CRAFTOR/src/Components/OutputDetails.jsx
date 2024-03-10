import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
      <div className="metrics-container mt-4 flex flex-row space-x-3">
        <p className="text-sm text-white">
          Status:{" "}
          <span className=" tc font-semibold px-2 py-1 rounded-md bg-gray-100 shadow-[5px_5px_0px_0px_#1a2d37] hover:shadow transition duration-200">
            {outputDetails?.status?.description}
          </span>
        </p>
        <p className="text-sm text-white">
          Memory:{" "}
          <span className="tc font-semibold px-2 py-1 rounded-md bg-gray-100 shadow-[5px_5px_0px_0px_#1a2d37] hover:shadow transition duration-200">
            {outputDetails?.memory}
          </span>
        </p>
        <p className="text-sm text-white">
          Time:{" "}
          <span className="tc font-semibold px-2 py-1 rounded-md bg-gray-100 shadow-[5px_5px_0px_0px_#1a2d37] hover:shadow transition duration-200">
            {outputDetails?.time}
          </span>
        </p>
      </div>
  );
};

export default OutputDetails;
