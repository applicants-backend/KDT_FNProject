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
    Memberid : string,
    Storeid : string,
    Token : string
    setMemberid : (res:string) => void;
    setStoreid : (res:string) => void;
    setToken : (res:string) => void;
}

const UserDataState = create<UserDatainterface>(set=>({
    Memberid : "none",
    Storeid :"none",
    Token : "none",
    setMemberid : res => set({Memberid: res}),
    setStoreid : res => set({Storeid : res}),
    setToken : res =>set({Token : res})
}))
export {UserDataState};

////// 스케쥴러 

interface ScheduleStore {
    startTime: string;
    endTime: string;
    registerTime: string;
    setSchedule: (startTime: string, endTime: string, registerTime: string) => void;
  }
  
  export const useScheduleStore = create<ScheduleStore>((set) => ({
    startTime: '',
    endTime: '',
    registerTime: '',
    setSchedule: (startTime, endTime, registerTime) => set({ startTime, endTime, registerTime }),
  }));

