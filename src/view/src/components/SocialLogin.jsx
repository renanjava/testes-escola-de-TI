import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="flex gap-4 mt-2">
      <button className="p-3 bg-white rounded-full shadow-md">
        <FaFacebook className="text-blue-600 text-xl" />
      </button>
      <button className="p-3 bg-white rounded-full shadow-md">
        <FaGoogle className="text-red-500 text-xl" />
      </button>
    </div>
  );
};
export default SocialLogin;