// import axios, { AxiosResponse } from 'axios';

// interface LoginResponse {
//   token: string;
//     // 로그인 response data
// }

// interface LoginCredentials {
//   userId: string;
//   password: string;
// }

// export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
//   try {
//         // api 명세서에 따라서 정리
//     const response: AxiosResponse<LoginResponse> = await axios.post('/api/login', credentials);
//     return response.data;
//   } catch (error) {
//         // 예외 처리
//     console.error('로그인에 실패 하였습니다.', error);
//     throw error;
//   }
// };
export const login = () => {
  console.log("안녕하세요")
}
