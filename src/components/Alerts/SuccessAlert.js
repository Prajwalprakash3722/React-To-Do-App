import React from "react";

const SuccessAlert = ({ success }) => {
  return (
    <>
      <div
        class="bg-green-100 border-t border-b border-r border-l border-green-500 text-green-700 px-4 py-3 rounded-lg m-2"
        role="alert"
      >
        <p class="font-bold text-center">Success</p>
        <p class="text-center text-sm">{success}</p>
      </div>
    </>
  );
};

export default SuccessAlert;
