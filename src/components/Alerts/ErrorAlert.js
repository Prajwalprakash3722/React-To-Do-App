import React from "react";

const ErrorAlert = ({ error }) => {
  return (
    <>
      <div
        class="bg-red-100 border-t border-b border-r border-l border-red-500 text-red-700 px-4 py-3 rounded-lg"
        role="alert"
      >
        <p class="text-center font-bold">Error</p>
        <p class="text-sm">{error}</p>
      </div>
    </>
  );
};

export default ErrorAlert;
