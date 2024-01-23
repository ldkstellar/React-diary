import './App.css';
import {useState,useRef,useCallback,useEffect,useMemo, useReducer} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';
// https://jsonplaceholder.typicode.com/comments
export type Info = {
  id:number,
  autor:string,
  content:string,
  emotion:number,
  createDate:number
};

type tmp = {
  id:number,
  name:string,
  email:string,
  body:string,
}

export type ondelete = (targetId:number)=>void;
export type func = {onCreate:(autor:string,content:string,emotion:number) =>void};
export type oncreate = (autor:string,content:string,emotion:number)=>void;
export type onedit =(targetId:number,newContent:string)=>void

interface init{
  type:"INIT"
  data:Info[]
}
interface create{
  type:"CREATE"
  data:Info
}

interface remove{
  type:"REMOVE"
  targetId:number
  
}
interface edit{
  type:"EDIT"
  targetId:number,
  newContent:string
}


function App() {

  const reducer = (state:Info[],action:init | create|remove|edit)=>{
    switch (action.type) {
      case 'INIT':{
        return action.data;
      }

      case 'CREATE':{
        const created_date =  new Date().getTime();
        const newItem = {...action.data,created_date};
        return [newItem, ...state];
      }

      case 'REMOVE':{
        return state.filter((it)=>it.id !== action.targetId);
      }
      
      case 'EDIT':{
        return state.map((it)=>it.id === action.targetId ? {...it,content:action.newContent}:it);

      }
      default:
      return state;
    }
  }

  const [data , dispatch] = useReducer(reducer,[]);

  // const [data,setData] = useState<Info[]>([]);
  const dataId = useRef(0);
  const getData = async ()=>{
    const res:tmp[] =  await fetch(`https://jsonplaceholder.typicode.com/comments`).then((res)=>res.json());
    const initData:Info[]  = res.slice(0,20).map((it)=>{
          return {
              id:it.id,
              autor:it.email,
              content:it.body,
              emotion:Math.floor(Math.random() * 5)+1,
              createDate: new Date().getTime(),
          };
        });
    dataId.current = initData[initData.length-1].id+1;
    dispatch({type:"INIT",data:initData})
    // setData(initData);
  };
  
  useEffect(()=>{
    getData();
  },[]);

  const onCreate:oncreate = useCallback((autor:string,content:string,emotion:number)=>{
    const createDate = new Date().getTime();
    const newItem = {
        autor,
        content,
        emotion,
        createDate,
        id:dataId.current,
    };
    dataId.current+=1;
    dispatch({type:'CREATE',data:{autor,content,emotion,createDate,id:dataId.current}})
    // setData((prev)=>[newItem,...prev]);
  },[]); 

  const onDelete:ondelete = useCallback((targetId)=>{
    // const newDiaryList = data.filter((it)=>it.id !== targetId);// usecallback때문에 최신데이터를 받을때 최신화를 시키지 못한다따라서 
    // setData((prev)=>prev.filter((it)=>it.id !== targetId));
    dispatch({type:"REMOVE",targetId})
  },[]);

  const onEdit:onedit = useCallback((targetId,newContent)=>{
    // setData((prev)=>prev.map((it)=>it.id === targetId ? {...it,content:newContent}:it));
    dispatch({type:"EDIT",targetId,newContent});
  },[]);

  const getDiaryAnalysis = useMemo(()=>{
    const goodCount = data.filter((it)=>{
       return it.emotion>=3;
    }).length;
    const badCount  =  data.length - goodCount;
    const goodRatio = (goodCount/data.length) * 100;
    
    return {goodCount,badCount,goodRatio};
  },[data.length]
  );
  // 비구조 할당
  const {goodCount,badCount,goodRatio} = getDiaryAnalysis;
  
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 :{data.length}</div>
      <div>기분 좋은 일기 개수:{goodCount}</div>
      <div>기분이 나쁜 일기 개수:{badCount}</div>
      <div>기분이 좋은 일기 비율:{goodRatio}</div>
      <DiaryList onDelete={onDelete} onEdit={onEdit} setList={data}/>
    </div>
  );
}

export default App;
