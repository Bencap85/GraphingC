import React, { state, useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Graph from './components/Graph'
export default function App() {

  const [ f, setF ] = useState(() => {});
  
  const handleGraphClick = (funct) => {
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