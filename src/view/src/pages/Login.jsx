import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginInputField from "../components/shared/LoginInputField";
import SocialLogin from "../components/SocialLogin";
import LoginButton from "../components/shared/LoginButton";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold">Café com Type</h1>
        <p className="text-lg">Acesse sua conta</p>
      </div>

      <div className="w-80 space-y-4">
        <LoginInputField
          type="text"
          placeholder="Usuário"
          icon="👤"
          value={username}
          onChange={handleUsernameChange}
        />
        <LoginInputField
          type="password"
          placeholder="Senha"
          icon="🔒"
          value={password}
          onChange={handlePasswordChange}
          isPasswordField={true} 
        />
      </div>

      <div className="mt-4">
        <a href="#" className="text-blue-500 text-sm">Esqueci minha senha</a>
      </div>

      <div className="my-4">
        <p className="text-gray-500 text-sm">Ou use:</p>
        <SocialLogin />
      </div>

      <LoginButton text="Entrar" />

      <div className="mt-4">
        <Link to="/signup" className="text-blue-500 text-sm">Não possuo cadastro</Link>
      </div>
    </div>
  );
};

export default Login;
