import React, { useState } from "react";
import InputField from "../components/InputField";
import SocialLogin from "../components/SocialLogin";
import Button from "../components/Button";

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
        <InputField
          type="text"
          placeholder="Usuário"
          icon="👤"
          value={username}
          onChange={handleUsernameChange}
        />
        <InputField
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

      <Button text="Entrar" />

      <div className="mt-4">
        <a href="#" className="text-blue-500 text-sm">Não possuo cadastro</a>
      </div>
    </div>
  );
};

export default Login;
