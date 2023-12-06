
import Axios from "axios";
import {Cookies} from 'react-cookie';

interface Params {
    URL :string,
    DATA : any
}
class _CustomAxiosModule {
    AXIOS;
    Cookies1 = new Cookies(); 

    constructor() {
        // with credential
        this.AXIOS = Axios.create({
            baseURL: "http://ec2-3-39-203-178.ap-northeast-2.compute.amazonaws.com",
            headers: {
                'Content-Type': 'application/json',
                'authorization': this.Cookies1.get('token') ? `bearer ${this.Cookies1.get('token')}` : '',
                'withCredentials': true
            },
            withCredentials: true,
            timeout: 15000,
        });
        
        this.AXIOS.interceptors.response.use(
            // 성공 시
            (response:any) => {
                return Promise.resolve(response);
            }, 
            
            // 실패 시 
            (error:any) => {
                if (error.response.status === 401){
                    alert("다시 로그인 해주세요.");
                    this.Cookies1.remove("token");
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                }
                if (error.response.status === 500){
                    return;
                }
                return Promise.reject(error);
            }
        )
    }

    get(params:Params) { 
        const {URL} = params;
        return this.AXIOS && this.AXIOS.get(URL);
    }
    post(params:Params) {
        const { URL } = params;
        const { DATA } = params;
        return this.AXIOS && this.AXIOS.post(URL,DATA);
    }

    patch(params:Params) {
        const { URL } = params;
        const { DATA } = params;
        return this.AXIOS && this.AXIOS.patch(URL,DATA);
    }

    put(params:Params){
        const { URL } = params;
        const { DATA } = params;
        return this.AXIOS && this.AXIOS.put(URL,DATA)
    }
    delete(params:Params){
        const { URL } = params;
        const { DATA } = params;
        return this.AXIOS && this.AXIOS.delete(URL, { data : DATA })
    }
}

const axios = new _CustomAxiosModule;
export default axios;