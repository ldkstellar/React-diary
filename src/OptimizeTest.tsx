import React, { useState,useEffect} from "react";
interface props {
    obj:myProps
}
type myProps = {count:number};

const CounterA = React.memo(({count}:myProps)=>{
    useEffect(()=>{
        console.log(`countA:${count}`);
    })
    return(
        <div>
            {count}
        </div>
    
    )
});

const CounterB = ({obj}:props)=>{
    useEffect(()=>{
        console.log(`countB:${obj.count}`);
        
    })
    return(
        <div>
            {obj.count}
        </div>
    )
}

const areEual  = (prevProps:props, nextProps:props)=>{
    if(prevProps.obj.count === nextProps.obj.count){
        return true;
    }
    return false;

}

const MemoizedCounterB  = React.memo(CounterB,areEual);

const OptimizeTest = ()=>{
   
    const [count ,setCount] = useState(0);
    const [obj,setObj] = useState({
        count:1
    });
    
    return(
        <div style={{padding:50}}>
            <div>

                <h2>Counter A</h2>
                <CounterA count={count}/>
                <button onClick={()=>setCount(count)}>A 버튼</button>
                
            
            </div>

            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj}/>
                <button onClick={()=>setObj({count:obj.count})}>B 버튼</button>       
               
            </div>

        </div>
    )
}



export default OptimizeTest;