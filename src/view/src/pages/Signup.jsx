import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import SignupButton from "../components/shared/SignupButton";
import SignupInputField from "../components/shared/SignupInputField";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">Crie sua conta</h2>
        <SignupInputField label="Nome Completo" name="fullName" value={formData.fullName} onChange={handleChange} icon="👤" />
        <SignupInputField label="Usuário" name="username" value={formData.username} onChange={handleChange} icon="👤" />
        <SignupInputField label="E-mail" name="email" value={formData.email} onChange={handleChange} icon="📧" />
        <SignupInputField label="Criar senha" name="password" value={formData.password} onChange={handleChange} type="password" icon="🔒" />
        <SignupInputField label="Confirmar senha" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" icon="🔒" />
        <Checkbox label="Estou de acordo com os termos do aplicativo" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
        <SignupButton text="Criar conta" />
        <p className="text-center mt-4 text-blue-600 cursor-pointer">
          <Link to="/login" className="text-blue-600">Já possuo uma conta</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
