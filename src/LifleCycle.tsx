import { useState,useEffect } from "react";

const LifeCycle = ()=>{
    const [count,setCount] = useState(0);
    const [text,setText] = useState('');
    const [isVisible ,setIsvisible] = useState(false);
    const toggle = ()=>setIsvisible(!isVisible);
    useEffect(()=>{
        console.log('mount');
    },[]); // 마운트 되는 시점에서만 작동이 된다.
    
    useEffect(()=>{
        console.log('didupdate');
        
    }); //update 되는 시점에서만 작동이 된다. 

    const Unmount = () =>{
        useEffect(()=>{
            console.log('Mount!');

            return ()=>{
                console.log('unmount'); 
            };
            
        })
        return(
            <div>Unmount Testing Component</div>
        );
    }
    return(
        <div style={{padding:20}}>
            <div>
                {count}
                <button onClick={()=>setCount(count+1)}>+</button>
            </div>

            <div>
                <input value={text} onChange={(e)=>setText(e.target.value)}/>  
            </div>
            {isVisible && <Unmount/>}
            <button onClick={toggle}>ON/OFF</button>
        </div>

    )
};

export default LifeCycle;