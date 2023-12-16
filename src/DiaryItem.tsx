
import { useRef, useState } from "react";
import { Info, onedit } from "./App";
import { ondelete } from "./App";
interface props{
    id:number,
    autor:string,
    content:string,
    emotion:number,
    createDate:number
    onDelete:ondelete
    onEdit:onedit,
}

const DiaryItem = ({id,autor,content,emotion,createDate,onDelete,onEdit}:props)=>{
    const [isEdit,setIsEdit] = useState(false);
    const toggleIsEdit = ()=>setIsEdit(!isEdit);
    const [localeContent,setLocaleContent] = useState(content);
    const textInput = useRef<HTMLTextAreaElement>(null);
    const handleRemove = ()=>{
        console.log(id);
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
            onDelete(id);
        }
    };

    const quitEdit = ()=>{
        setIsEdit(false);
        setLocaleContent(content);
       
    }

    const handleEdit =()=>{
        if(localeContent.length <5){
            alert('최소 5글자 이상 입력해주세요');
            textInput.current?.focus();
            return;
        }
        onEdit(id,localeContent);
        toggleIsEdit();
    }

    return(
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자:{autor} | 감정점수: {emotion}
                </span>
                <br/>
                <span className="date">{new Date(createDate).toLocaleString()}</span>
            </div>
                <div className="content">{isEdit? <textarea ref={textInput} value={localeContent} onChange={(e)=>setLocaleContent(e.target.value)}></textarea> :content}</div>
                {
                    isEdit?
                        <>
                            <button onClick={quitEdit}>수정취소</button>
                            <button onClick={handleEdit}>수정하기</button>
                        </>
                        :
                        <>
                            <button onClick={handleRemove}>삭제하기</button>
                            <button onClick={toggleIsEdit}>수정하기</button>
                        </>
                }
        </div>
    )
}

export default DiaryItem;