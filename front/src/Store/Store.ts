import {create} from 'zustand'
import {persist} from 'zustand/middleware'

///// EC2 URL
interface url {
    URL : string
}
const URLstate = create<url>(set=>({
    URL : "http://ec2-3-39-203-178.ap-northeast-2.compute.amazonaws.com"
}))
export {URLstate};

//// 유저타입 상태
interface UserType {
    UserType: string;
    setUserTypeAdmin: () => void;
    setUserTypeUser: () => void;
}
// 초기 상태를 생성하는 함수
const initialUserTypeState: UserType = {
    UserType: 'admin',
    setUserTypeAdmin: () => UserTypeState.setState({ UserType: 'admin' }),
    setUserTypeUser: () => UserTypeState.setState({ UserType: 'user' }),
};
  
  // Zustand의 create 함수를 사용하여 상태와 업데이트 함수를 생성
  const UserTypeState = create(
    persist<UserType>((set) => initialUserTypeState, {
      name: 'userTypeState', // 보존할 상태의 이름
      getStorage: () => sessionStorage, // 저장소 선택 (sessionStorage, localStorage 등)
    })
  );


  
export default UserTypeState;

///// 유정정보
interface UserDatainterface{
    Memberid : string,
    Storeid : number,
    Token : string,
    Name : string,
    setMemberid : (res:string) => void;
    setStoreid : (res:number) => void;
    setToken : (res:string) => void;
    setName : (res:string) => void;
}

const UserDataState = create(
  persist<UserDatainterface>((set) => ({
    Memberid: 'none',
    Storeid: 0,
    Token: 'none',
    Name: 'none',
    setMemberid: (res: string) => set({ Memberid: res }),
    setStoreid: (res: number) => set({ Storeid: res }),
    setToken: (res: string) => set({ Token: res }),
    setName: (res: string) => set({ Name: res }),
  }), {
    name: 'userDataState', // 보존할 상태의 이름
    getStorage: () => sessionStorage, // 저장소 선택 (sessionStorage, localStorage 등)
  })
);

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

///// WorkList
interface workinterface {
    workid : number,
    memberid : string,
    storeid : number,
    title : string,
    date : string,
}
interface WorkListinterface {
    workId : number;
    setWorkId : (res : number) => void;
    workList : workinterface[] ;
    setWorkList : (res : workinterface[]) => void;
    add : boolean,
    setAdd : (res : boolean) => void
}
export const WorkState = create(
  persist<WorkListinterface> ((set) => ({
      workId : 0 ,
      setWorkId : res => set({workId : res}),
      workList : [],
      setWorkList : res => set({workList : res}),
      add : false,
      setAdd : res => set({add : !res})
  }),{
    name : 'workListState',
    getStorage : () => sessionStorage,
  })

)

///// TodoList
interface Contentinterface {
    contentsid : number,
    contents : string,
    checked : string
  }
interface TodoListinterface {
    contentId : number;
    setContentId : (res : number) => void;
    todoList : Contentinterface[];
    setTodoList : (res : Contentinterface[]) => void;
}
export const TodoState = create<TodoListinterface> ((set)=>({
    contentId : 0,
    setContentId : res => set({contentId : res}),
    todoList : [],
    setTodoList : res => set({todoList : res})
}))

///// CommentList
interface Cominterface {
    commentid : number,
    name : string,
    comment : string
}
interface CommentListinterface {
    commentList : Cominterface[];
    setCommentList : (res : Cominterface[]) => void;
}
export const CommentState = create<CommentListinterface> ((set)=>({
    commentList : [],
    setCommentList : res => set({commentList : res})
}))


// Calendar
export interface CalendarData {
    memberid: string;
    registerTime?: string;
    worker: string;
    title : string;
    attendid : string | number ;
    wage?: string | number;
    start?: string | Date | null;
    end?: string | Date | null;
    startwork?: string | Date | null;
    gowork?: string | Date | null;
    leavework?: string | Date | null;
    registertime?: string | Date | null;
  }

// CalendarData와 함께 사용할 Store
export interface EventsStore {
    events: CalendarData[];
    setEvents: (events: CalendarData[]) => void;
  }
  
  // Zustand를 사용하여 Store를 생성
  export const useEventsStore = create<EventsStore>((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
  }));

////// profile
interface Profileinterface {
    memberid : String,
    password : String,
    name : String,
    phonenumber : String,
    userImg : string,
    companyImg : string,
    companyName? : string | null,
    CEO? : String | null,
    companyNumber? : String | null,
    companyAddress? : String | null,
    companyToken? : String | null
    setmemberid : (res:string) => void;
    setpassword : (res:string) => void;
    setname :(res:string) => void;
    setphonenumber :(res:string) => void;
    setuserImg :(res:string) => void;
    setcompanyImg :(res:string) => void;
    setcompanyName :(res:string) => void;
    setCEO : (res:string) => void;
    setcompanyNumber : (res:string) => void;
    setcompanyAddress : (res:string) => void;
    setcompanyToken? : (res:string) => void;
}

export const ProfileState = create<Profileinterface>((set)=>({
    memberid : "",
    password : "",
    name : "",
    phonenumber : "",
    userImg : "",
    companyImg : "",    
    companyName : "",
    CEO : "",
    companyNumber : "",
    companyAddress : "",
    companyToken : "",
    setmemberid : res => set({memberid : res}),
    setpassword : res => set({password : res}),
    setname :res => set({name : res}),
    setphonenumber : res => set({phonenumber : res}),
    setuserImg : res => set({userImg : res}),
    setcompanyImg : res => set({companyImg : res}),
    setcompanyName :res => set({companyName : res}),
    setCEO : res => set({CEO : res}),
    setcompanyNumber :res => set({companyNumber : res}),
    setcompanyAddress :res => set({companyAddress : res}),
    setcompanyToken : res => set({companyToken : res})
}))

interface WorkerListInerface {
  WorkerList: Record<string, string>;
  setWorkList: (res: Record<string, string>) => void;
}
///// Worker List 
export const WorkerListState = create<WorkerListInerface>((set) => ({
  WorkerList: {},
  setWorkList: (res: Record<string, string>) => set({ WorkerList: res }),
}));
