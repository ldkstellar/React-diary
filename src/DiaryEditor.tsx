import { ChangeEvent, useEffect, useState } from "react";

const DiaryEditor=()=>{
    const [state, setState] =  useState({
        autor:"",
        content:""
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setState({...state,[e.target.name]:e.target.value});//    
    }

    useEffect(()=>{
        console.log(state);
        
    },[state]);
    
    
    return(
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <input
                name="autor"
                placeholder="autor를 입력하세요"
                value={state.autor} 
                onChange={handleChange}

            />
            <div>
                <textarea
                    name="content"
                    placeholder="본문을 입력하세요"
                    value={state.content}
                    onChange={handleChange}/>
            </div>

            <div>
                <select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
        </div>
    ) 
}

export default DiaryEditor;