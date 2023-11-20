import {Info} from './App';


export default({setList}:{setList:Info[]})=>{
    return(
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{setList.length}개의 일기가 있습니다.</h4>
        <div>
            {
            setList.map((i)=>(
                <div>
                    <div>작성자:{i.autor}</div>
                    <div>일기본문:{i.content}</div>
                    <div>감정:{i.emotion}</div>
                    <div>작성시간:{i.created_date}</div>
                </div>
                )
            )
            }
        </div>

    </div>

    )
} 