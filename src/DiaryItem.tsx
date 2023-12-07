import { log } from "console";
import { Info } from "./App";
import { ondelete } from "./App";
interface props{
    id:number,
    autor:string,
    content:string,
    emotion:number,
    createDate:number
    onDelete:ondelete
}

const DiaryItem = ({id,autor,content,emotion,createDate,onDelete}:props)=>{
    
    return(
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자:{autor} | 감정점수: {emotion}
                </span>
                <br/>
                <span className="date">{new Date(createDate).toLocaleString()}</span>
            </div>
                <div className="content">{content}</div>
                <button onClick={()=>{
                    console.log(id);
                    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
                        onDelete(id);
                    }}
                }
                >삭제하기</button>
        </div>
        

    )

}

export default DiaryItem;