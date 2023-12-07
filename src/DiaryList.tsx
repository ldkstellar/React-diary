import {Info} from './App';
import DiaryItem from './DiaryItem';
import { ondelete } from './App';
interface Props{
    setList?:Info[]
}


// 타입스크립트는 default props를 이렇게 하는 것을 권장 한다.
const DiaryList = ({setList = [],onDelete}:{setList?:Info[],onDelete:ondelete})=>{
    return(
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{setList.length}개의 일기가 있습니다.</h4>
        <div>
            {
            setList.map((e,i)=>(
                <DiaryItem key={e.id} {...e} onDelete={onDelete}/>
                )
            )
            }
        </div>

    </div>

    )
};

export default DiaryList;

