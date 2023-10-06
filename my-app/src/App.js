import React, { state, useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Graph from './components/Graph'
export default function App() {

  const [ f, setF ] = useState(() => {});
  
  const handleGraphClick = (funct) => {
    console.log("HandleGraphClick ran in App.js, funct(3) = : "+ funct(3));
    setF((x) => (x) => {
      return funct(x);
    });
  }
  

  return (
    <div className="App">
      
          
          <Graph functProp={f} />
        
    </div>
  );
}