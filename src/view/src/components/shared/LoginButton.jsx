import React from "react";

const LoginButton = ({ text }) => {
  return (
    <button className="bg-yellow-400 w-80 py-3 rounded-full text-lg font-bold hover:bg-yellow-500 hover:shadow-lg transition-all">
      {text}
    </button>
  );
};

export default LoginButton;