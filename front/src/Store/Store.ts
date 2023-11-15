import create from 'zustand'

///// 유저타입 상태
interface UserType {
    UserType: string;
    setUserTypeAdmin: () => void;
    setUserTypeWorker: () => void;
}

const UserTypeState = create<UserType>(set => ({
    UserType : "Worker",
    setUserTypeAdmin : ()=> set({UserType:"Admin"}),
    setUserTypeWorker : () => set({UserType: "Worker"})
}))

export default UserTypeState;

///// 유정정보
interface UserDatainterface{
    Userid : string,
    Storeid : string,
    Token : string
    setUserid : (res:string) => void;
    setStoreid : (res:string) => void;
    setToken : (res:string) => void;
}

const UserDataState = create<UserDatainterface>(set=>({
    Userid : "none",
    Storeid :"none",
    Token : "none",
    setUserid : res => set({Userid: res}),
    setStoreid : res => set({Storeid : res}),
    setToken : res =>set({Token : res})
}))

export {UserDataState};