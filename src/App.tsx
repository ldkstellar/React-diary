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

export type myCreate = (autor:string,content:string,emotion:number)=>void;

function App() {
  const  dataId = useRef(0);
  const [data,setData] = useState<Info[]>([]);
  const onCreate:myCreate =(autor:string,content:string,emotion:number)=>{
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
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onDelete={onDelete} setList={data}/>
    </div>
  );
}

export default App;
