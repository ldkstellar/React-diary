import { type } from 'os';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
export type Info = {
  id:number,
  autor:string,
  content:string,
  emotion:number
  created_date:number
};

const dummyList:Info[] = [
  {
    id:1,
    autor:"이정환",
    content:"hi",
    emotion:5,
    created_date: new Date().getTime(),
  },
  {
    id:2,
    autor:"이동규",
    content:"hi",
    emotion:5,
    created_date: new Date().getTime(),
  },
  {
    id:3,
    autor:"박지성",
    content:"hi",
    emotion:5,
    created_date: new Date().getTime(),
  },
  {
    id:4,
    autor:"황희찬",
    content:"hi",
    emotion:5,
    created_date: new Date().getTime(),
  },
] ;

function App() {

  return (
    <div className="App">
      <DiaryEditor/>
      <DiaryList setList={dummyList}/>
    </div>
  );
}

export default App;
