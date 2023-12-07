import './App.css';
import { useState ,useRef} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
export type Info = {
  id:number,
  autor:string,
  content:string,
  emotion:number
  createDate:number
};
export type ondelete = (targetId:number)=>void;
export type func = {onCreate:(autor:string,content:string,emotion:number) =>void};
export type oncreate = (autor:string,content:string,emotion:number)=>void;
export type onedit =(targetId:number,newContent:string)=>void
function App() {
  const  dataId = useRef(0);
  const [data,setData] = useState<Info[]>([]);
  const onCreate:oncreate =(autor:string,content:string,emotion:number)=>{
    const createDate = new Date().getTime();
    const newItem ={
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
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onDelete={onDelete} onEdit={onEdit} setList={data} />
    </div>
  );
}

export default App;
