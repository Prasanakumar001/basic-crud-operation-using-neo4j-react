import React,{useContext,useEffect, useState} from "react";
import { useReadCypher,useWriteCypher } from "use-neo4j";

function Movie(){
//     const {loading,error,first,records} =useReadCypher('MATCH (n:Movie) WHERE n.title CONTAINS $title RETURN n',{title:'m'})
//   if(loading) return<div>Loading...</div>
//   if(error) return <div>{error.message}</div>
//   const movies = records?.map(row=>{
//     const movie = row.get('n')
//     //movie.properties.id.toNumber()
//     return(<div key={movie.properties.id}>
//         <h1>{movie.properties.title}{movie.properties.released}</h1>
//     </div>)
//   })
// //   const count=first?.get('count').toNumber();
//     return(
//         <>
//         {movies}
//         </>
//     )
const [title,setTitle]=useState("");
  const [released,setReleased] = useState(0);
  const [tagline,setTagline]=useState("");  
  const [nodeName,setnodeName]=useState("");
  const {run:createText } = useWriteCypher(`CREATE (n:Movie {title:$title, released: toInteger($released), tagline:$tagline}) RETURN n `);




const [render,setRender]=useState(0)
const [editable,setEditable]=useState('')

const [edittitle,setEdittitle]=useState('')
const [editReleased,setEditReleased]=useState('')    
const[bool,setBool]=useState(false);
const  { run,loading, error, data,records} = useReadCypher('MATCH (m:Movie) RETURN ID(m) AS id, m.title AS name,m.released AS released ORDER BY ID(m) DESC');
const { run: updateMovie } = useWriteCypher( 'MATCH (m:Movie) WHERE id(m) = $id SET m += { title: $title, released: toInteger($released) }');
//const { run:updateChiper } = useWriteCypher('');
const { run: deleteMovie } = useWriteCypher( 'MATCH (n:Movie) WHERE ID(n) = $id DETACH DELETE n');
useEffect(() => {
  run();
}, []);
const fetchData=async()=>{
  run();
  // const res = await axios.get("http://192.168.0.5:8081/productdata")
  // setView(res.data)
}

if (loading) return 'Loading...';
if (error) return `Error: ${error.message}`;
    const editData=(id,title,released)=>{
      console.log(id,title,released)
      setEditable(id);
      setEdittitle(title)
      setEditReleased(released)
    }
    const deleteData= async(id)=>{ 
        console.log(id) 
      try {
        await deleteMovie({id:Number(id)});
        console.log(`Movie with ID ${id} deleted.`);
      } catch (error) {
        console.error(error);
      }
      setRender(render+1);
      setTimeout(() => {
        fetchData();
       }, 200);
    }

     const handleEditsubmit= async(id)=>{
      setBool(true)
      console.log("editdata--->",edittitle,editReleased)
      console.log(typeof(editReleased));
      console.log({id: Number(id),  released:editReleased})
       //code
       try {
        await console.log(updateMovie({id: Number(id), title: edittitle, released: Number(editReleased)}))

        console.log(`Movie with ID ${id} updated.`);
      } catch (error) {
        console.error(error);
      }
       setEditable('') 
       setBool(false)
       setRender(render+1);
       setTimeout(() => {
        fetchData();
       }, 200);
       
     }
     const handleSubmit=(e)=>{
      e.preventDefault()
       console.log(title,released,tagline);
       setnodeName(title.replace(/\s/g, ""));
       console.log(nodeName,title,released,tagline);
     //  var query = `CREATE (${movienode}:Movie {title:'${title}',released:'${released}',tagline:'${tagline}'})`;
      // console.log(query);
       console.log(createText({ title, released, tagline}))
       setTimeout(() => {
        fetchData();
       }, 200);
     
    }

      const movies = records?.map((item, index)=>{
        let movieid = item.get('id').low;
        let movietitle =  item.get('name');
        let moviereleased =  item.get('released').low;
            return(<tr key={index}>
              <td >
                { movieid }
              </td>
              <td>
              {editable!==movieid?movietitle:<input type="text" name="editMovietitle" onChange={(e)=>setEdittitle(e.target.value)} value={edittitle}  />}
              </td>
              <td>
              {editable!==movieid?moviereleased:<input type="number" name="editReleased" onChange={(e)=>setEditReleased(e.target.value)} value={editReleased}  />}
              </td>
             <td>
             {
           editable!==movieid?<button  style={{marginRight:'2px'}} class="btn btn-outline-warning " onClick={()=>editData(movieid,movietitle,moviereleased)}>edit</button>
                        :
                        <button class="btn btn-outline-success " style={{marginRight:'2px'}} onClick={()=>{setEdittitle('');setEditReleased('');handleEditsubmit(movieid)}} disabled={bool}>submit</button>
                    }
                {
                  editable!==movieid?<button  class="btn btn-outline-danger " onClick={()=>deleteData(movieid)} disabled={bool}>delete</button>
                        :
                        <button class="btn btn-outline-danger " onClick={()=>{setEditable('');setEdittitle('');setEditReleased('');}} disabled={bool}>cancel</button>
                    }
             
             </td>
                
             
               
              </tr>)
      })


    return(
        <>
        <div class="container">
          <center>
            <h3>Create Movie Profile</h3>
          </center>
        <form>
        <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Movie Name</label>
    <div class="col-sm-10">
    <input name="title" class="form-control" onChange={(e)=>{setTitle(e.target.value)}} placeholder="moviename" required></input>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Movie Released Date</label>
    <div class="col-sm-10">
    <input name="released" type="number" class="form-control" onChange={(e)=>{setReleased(e.target.value)}} placeholder="movieReleased" required></input>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Movie Tagline</label>
    <div class="col-sm-10">
    <input name="tagline"  class="form-control" onChange={(e)=>{setTagline(e.target.value)}} placeholder="movieTagline" required></input>
    </div>
  </div>
            {/* <input name="moviename" placeholder="moviename"></input> */}
           
           
          <center>
          <button class="btn  btn-primary" onClick={(e)=>handleSubmit(e)}>Sumbit</button>
          </center>
            
        </form>
          
        </div>
        <div class="container">
       <center>
       <table class="table table-hover">
          <thead>
            <th>Id</th>
            <th>Movie Name</th>
            <th>Released on</th>
            <th>Action</th>
          </thead>
          <tbody>
           { movies }

          </tbody>
         </table>

       </center>
        </div>
      
        </>
    )


}
export default Movie;