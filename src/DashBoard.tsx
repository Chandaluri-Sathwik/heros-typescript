import HeroList from "./HeroList";
// import useFetch from "./useFetch";
import useFetch from "./useFetch";
const DashBoard = () => {

    let data1:({name:string,id:string,heroimage:string,favDialogue:string})[]=[];
    const {data,isPending,error}=useFetch("http://localhost:8000/heros")
    if(data){
        data1=data
    }
    return ( 
        <div className="top4heroes">
            <h2>Top Heroes</h2>
          {error && <div>{error}</div>}
          {isPending && <div>Loading.....</div>}
          {/* { data1 && console.log(data1.heros)} */}
          { data1 && <HeroList data={data1.filter((hero)=>Number( hero.id)<=4)} />}
        </div>
     );
}
 
export default DashBoard;