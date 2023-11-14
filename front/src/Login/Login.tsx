// LoginForm.tsx
import React, { useState } from 'react';
import { login } from './LoginService'; // 경로 수정

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

function Login({ onLoginSuccess }: LoginFormProps): JSX.Element {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const credentials = { userId, password };

    try {
      const response = await login(credentials);
      onLoginSuccess(response.token);
    } catch (error) {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
