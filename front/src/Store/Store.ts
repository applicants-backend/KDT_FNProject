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