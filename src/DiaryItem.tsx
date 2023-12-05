import { Info } from "./App";

const DiaryItem = ({autor,content,emotion,createDate}:Info)=>{
    
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
        </div>
        

    )

}

export default DiaryItem;