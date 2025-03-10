import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginInputField = ({ type, placeholder, icon, value, onChange, isPasswordField }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative border-b border-gray-400 pb-2">
      <input
        type={isPasswordField && showPassword ? "text" : type} // Alterna entre 'text' e 'password'
        placeholder={placeholder}
        className="w-full outline-none pl-8 text-gray-700"
        value={value}
        onChange={onChange}
      />
      <span className="absolute left-2 top-2 text-gray-600">{icon}</span>

      {isPasswordField && (
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaEyeSlash className="text-xl" />
          ) : (
            <FaEye className="text-xl" />
          )}
        </button>
      )}
    </div>
  );
};

export default LoginInputField;
