
import DiaryItem from './DiaryItem';
import { ondelete,onedit,Info, DiaryDispatchContext} from './App';
import React,{ useContext, useEffect } from 'react';
import { DiaryStateContext } from './App';
interface Props{
    setList?:Info[]
}


// 타입스크립트는 default props를 이렇게 하는 것을 권장 한다.
const DiaryList = ()=>{
    const diaryList = useContext(DiaryStateContext);
    const {onDelete,onEdit} = useContext(DiaryDispatchContext);
    
    return(
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList?.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList?.map((e,i)=>(
                    <DiaryItem key={e.id} {...e} onDelete={onDelete} onEdit={onEdit}/>
                    )
                )}
            </div>

        </div>
    );
};

export default DiaryList;

