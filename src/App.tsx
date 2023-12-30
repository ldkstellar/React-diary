import './App.css';
import { useState , useRef, useEffect,useMemo} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

export type Info = {
  id:number,
  autor:string,
  content:string,
  emotion:number,
  createDate:number
};

type tmp = {
  postId:number,
  name:string,
  email:string,
  body:string,
}

type memo = ()=>{goodCount:number ,badCount:number,goodRatio:number};

export type ondelete = (targetId:number)=>void;
export type func = {onCreate:(autor:string,content:string,emotion:number) =>void};
export type oncreate = (autor:string,content:string,emotion:number)=>void;
export type onedit =(targetId:number,newContent:string)=>void

//https://jsonplaceholder.typicode.com/comments

function App() {
  const getData = async ()=>{
    const res:tmp[] =  await fetch(`https://jsonplaceholder.typicode.com/comments`).then((res)=>res.json());
    const initData:Info[]  = res.slice(0,20).map((it)=>{
      return {
          id:it.postId,
          autor:it.email,
          content:it.body,
          emotion:Math.floor(Math.random() * 5)+1,
          createDate: new Date().getTime(),
      }
    });
    setData(initData);
  };

  useEffect(()=>{
    getData();
  },[]);

  const dataId = useRef(0);
  const [data,setData] = useState<Info[]>([]);
  const onCreate:oncreate =(autor:string,content:string,emotion:number)=>{
  const createDate = new Date().getTime();
  const newItem = {
      autor,
      content,
      emotion,
      createDate,
      id:dataId.current,
  };
    dataId.current+=1;
    setData((prev)=>[newItem,...prev]);
  };

  const onDelete:ondelete = (targetId)=>{
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit:onedit = (targetId,newContent)=>{
    setData(data.map((it)=>it.id === targetId ?{...it,content:newContent}:it));

  }

  const getDiaryAnalysis = useMemo(()=>{
    console.log('일기 분석 시작');
    const goodCount = data.filter((it)=>{
       return it.emotion>=3;
    }).length;
    const badCount  =  data.length - goodCount;
    const goodRatio = (goodCount/data.length) *100;
    
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
      <div>기분이 좋은 일기 비율:{goodRatio}%</div>

    
      <DiaryList onDelete={onDelete} onEdit={onEdit} setList={data} />
    </div>
  );
}

export default App;
