import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const SignupInputField = ({ label, name, value, onChange, type = "text", icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-500">{icon}</span>
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {type === "password" && (
          <span
            className="absolute right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl" /> 
            ) : (
              <FaEye className="text-xl" /> 
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default SignupInputField;
