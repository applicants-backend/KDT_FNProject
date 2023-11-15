// import React, { useState } from 'react';
// import { login } from './LoginService'; // 경로 수정
// import { Route } from 'react-router-dom';

// interface LoginFormProps {
//   onLoginSuccess: (token: string) => void;
// }

// export default function Login({ onLoginSuccess }: LoginFormProps): JSX.Element {
//   const [userId, setUserId] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

//   const handleLogin = async () => {
//     const credentials = { userId, password };

//     try {
//       const response = await login(credentials);
//       onLoginSuccess(response.token);
//     } catch (error) {
//       alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
//     }
//   };
//   const handleRegister = async () => {
    
//   }

//   return (
//     <div>
//       <label>
//         Username:
//         <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleRegister}>회원가입</button>
//     </div>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { userId, password });
      console.log('로그인', response.data);

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
      <button>회원가입</button>
    </div>
  );
}

