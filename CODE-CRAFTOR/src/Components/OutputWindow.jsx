import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-md text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="hout font-bold text-xl bg-clip-text mb-2">
        Output
      </h1>
      <div className="ts border-2 border-white z-10 px-4 py-2  mt-2 out w-full h-56  rounded-md text-white overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default OutputWindow;
