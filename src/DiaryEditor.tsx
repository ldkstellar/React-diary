import React,{ ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import { func } from "./App";
import { oncreate } from "./App";
import { Info } from "./App";
import { onedit } from "./App";
import { DiaryDispatchContext } from "./App";
import {dispatchMemo} from"./App"
const DiaryEditor = () => {
    const {onCreate} = useContext(DiaryDispatchContext);
  

    const autorInput = useRef<HTMLInputElement>(null);
    const textInput= useRef<HTMLTextAreaElement>(null);
    const [state, setState] =  useState(
        {
            autor:"",
            content:"",
            emotion:1
        }
    );

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>)=>{
        setState({...state,[e.target.name]:e.target.value});
    }
    
    const handleSubmit = ()=>{

        if (state.autor.length < 1) {
            alert('최소 1글자 이상 입력해주세요');
            autorInput.current?.focus();
            return;
        }

        if(state.content.length <5){
            alert('최소 5글자 이상 입력해주세요');
            textInput.current?.focus();
            return;

        }

        onCreate(state.autor,state.content,state.emotion);
        alert('저장이 완료되었습니다');
        setState({
            autor:"",
            content:"",
            emotion:1
        });
    }
    
    return(
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <input
                ref={autorInput}
                name="autor"
                placeholder="작성자"
                
                value={state.autor} 
                onChange={(e)=>{
                   let tmp = {...state};
                   tmp.autor = e.target.value;
                   setState(tmp);
                }}

            />
            <div>
                <textarea
                    ref={textInput}
                    name="content"
                    placeholder="내용"
                    value={state.content}
                    onChange={handleChange}/>
            </div>

            <div>
                <span style={{fontSize:12}}>오늘의 감정 점수 :</span>
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
};
export default React.memo(DiaryEditor);