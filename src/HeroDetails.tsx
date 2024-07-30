import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

interface Params{
    id:string;
}

const HeroDetails = () => {
    const {id}=useParams<Params>();
    const {data,isPending,error,nameHero,setName}=useFetch(`http://localhost:8000/heros/${id}`,{
     method:"GET",
    })
    const data1=Object(data)
    const [buttonLoad,setButtonLoad]=useState(false)
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        if(data1){
        data1.name=nameHero;
        setButtonLoad(true);
        
        fetch(`http://localhost:8000/heros/${id}`,{
            method:"PUT",
            body:JSON.stringify(data),
        }
        ).then(()=>{
            console.log('updated');
            setButtonLoad(false);
        })
        }
        
    }
    
    return (
        <div className="hero-details">
           {isPending && <div>Loading....</div>}
           {error && <div>{error}</div>}
           {data && <h2>{nameHero} Details</h2>}
        { data && 
         <div className="heroitem special" key={data1.id}>
                        <Link to={"/heros/"+data1.id }>
                        <div className="heroposter">
                            <img src={data1.heroimage} alt="hero" />
                        </div>
                        <div className="details">
                            <p className="heroname">{data1.name}</p>
                            <p className="herodial">{data1.favDialogue}</p>
                        </div>
                        </Link>
                        <div className="changeName">
            <form onSubmit={handleSubmit}>
                <label className="labelforchange">Change Name:</label>
                <input
                 type="text"
                 required 
                 value={nameHero}
                 onChange={((e)=>setName(e.target.value))}/>
          {!buttonLoad &&  <button className="buttonforSubmit">Edit Name</button>} 
          {buttonLoad && <button disabled className="buttonforSubmit">Editing name.....</button>}     
            </form>
        </div>
                    </div>
                    
                    }
      
        
        
        </div>
      );
}
 
export  default HeroDetails;