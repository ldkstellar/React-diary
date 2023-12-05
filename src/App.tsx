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

export type func = { onCreate:(a:string,b:string,c:number) => void};

export type myCreate = (autor:string,content:string,emotion:number)=>void;

// const dummyList:Info[] = [
//   {
//     id:1,
//     autor:"이정환",
//     content:"hi",
//     emotion:5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id:2,
//     autor:"이동규",
//     content:"hi",
//     emotion:5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id:3,
//     autor:"박지성",
//     content:"hi",
//     emotion:5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id:4,
//     autor:"황희찬",
//     content:"hi",
//     emotion:5,
//     created_date: new Date().getTime(),
//   },
// ] ;


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
    setData([newItem,...data]);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList setList={data}/>
    </div>
  );
}

export default App;
