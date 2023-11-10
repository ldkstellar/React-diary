import { ChangeEvent, useState } from "react";

const DiaryEditor=()=>{
    const [state, setState] =  useState({
        autor:"",
        content:"",
        emotion:1,
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>)=>{
        setState({...state,[e.target.name]:e.target.value});
    }


   
    
    const handleSubmit = ()=>{
        console.log(state);
        alert('저장이 완료되었습니다');
        
    }
    
    return(
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <input
                name="autor"
                placeholder="autor를 입력하세요"
                value={state.autor} 
                onChange={(e)=>{
                   let tmp = {...state};
                   tmp.autor = e.target.value;
                   setState(tmp);
                }}

            />
            <div>
                <textarea
                    name="content"
                    placeholder="본문을 입력하세요"
                    value={state.content}
                    onChange={handleChange}/>
            </div>

            <div>
                <text style={{fontSize:12}}>오늘의 감정 점수 :</text>
                <select
                   name="emotion" value={state.emotion} onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <button onClick={()=>handleSubmit()}>일기 저장하기</button>
        </div>
    ) 
}

export default DiaryEditor;