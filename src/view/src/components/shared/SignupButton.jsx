import React from "react";

const SignupButton = ({ text }) => {
  return (
    <button className="w-full bg-yellow-400 text-white py-2 rounded-md text-lg font-semibold shadow-md hover:bg-yellow-500 transition">
      {text}
    </button>
  );
};

export default SignupButton;
