import logo from './logo.svg';
import './App.css';
import React,{useContext} from 'react';
import { useReadCypher,useWriteCypher } from 'use-neo4j';
import Movie from './component/movie';
import Create from './component/Create';

function App() {
  const {loading,error,first,records} =useReadCypher('MATCH (n) RETURN count(n) AS count')
  if(loading) return<div>Loading...</div>
  if(error) return <div>{error.message}</div>
  const count=first?.get('count').toNumber();
  return (
    <div className="App">
       there are {count} nodes in the database
       <Movie></Movie>
       {/* <Create></Create> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
