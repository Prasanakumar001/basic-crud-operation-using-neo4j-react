import React, { useState } from 'react'
import { useWriteCypher } from 'use-neo4j';

const Create = () => {
 //   CREATE (TheMatrix:Movie {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'}) 
 //CREATE (TheMatrix:Movie {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'}) 
 // useWriteCypher(cypher: string, params?: Record<string, any>, database?: string): Neo4jResultState
  const [title,setTitle]=useState("");
  const [released,setReleased] = useState(0);
  const [tagline,setTagline]=useState("");  
  const [nodeName,setnodeName]=useState("");
//const { loading, error,run } = useWriteCypher('CREATE (n:Label {property: $property}) RETURN n ');
//let nodeName;
const {run:createText, loading, error } = useWriteCypher(`CREATE (n:Movie {title:$title, released:$released, tagline:$tagline}) RETURN n `);
  if (loading) return 'Loading...';
  //if (error) return `Error: ${error.message}`;

  const handleSubmit=(e)=>{
    e.preventDefault()
     console.log(title,released,tagline);
     setnodeName(title.replace(/\s/g, ""));
     console.log(nodeName,title,released,tagline);
   //  var query = `CREATE (${movienode}:Movie {title:'${title}',released:'${released}',tagline:'${tagline}'})`;
    // console.log(query);
     console.log(createText({ title, released, tagline}))
   
  }

  return (
    <div>Create
        <form>
            {/* <input name="moviename" placeholder="moviename"></input> */}
            <input name="title" onChange={(e)=>{setTitle(e.target.value)}} placeholder="moviename" required></input>
            <input name="released" type="number" onChange={(e)=>{setReleased(e.target.value)}} placeholder="movieReleased" required></input>
            <input name="tagline" onChange={(e)=>{setTagline(e.target.value)}} placeholder="movieTagline" required></input>
            <button onClick={(e)=>handleSubmit(e)}>Sumbit</button>
        </form>
    </div>
  )
}

export default Create