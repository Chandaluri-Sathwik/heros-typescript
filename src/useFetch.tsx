import { useState,useEffect } from "react";

const useFetch=(url:string,method1?:Object)=>{
    const [data,setData]=useState<{name:string,id:string,favDialogue:string,heroimage:string}[]>();
    const [isPending,setIsPending]=useState(true);
    const [error,setError]=useState(null);
    const [nameHero,setName]=useState("");
    useEffect(()=>{
        const abortCont=new AbortController();
        fetch(url,{signal:abortCont.signal})
        .then(res=>{
            if(!res.ok){
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        }).then((data)=>{
            setData(data);
            setName(data.name);
            setIsPending(false);
            setError(null);
        }).catch(err=>{
            if(err.name==="AbortError"){
                console.log('Fetch Aborted');
            }else{
            setIsPending(false);
            setError(err.message);
     } })

       return()=>abortCont.abort() ;

    },[url])

    return {
        data,isPending,error,nameHero,setName
    }
}
export default useFetch;