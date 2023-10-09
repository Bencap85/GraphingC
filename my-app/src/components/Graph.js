import { useEffect, state, useState, memo } from 'react'
import Sidebar from '../components/Sidebar'
import '../App.css'
import GraphFunctions from '../math/graph.js'

export default function Graph({ functProp }) {

    const [ f, setF ] = useState(() => {});
    const [ xLength, setXLength ] = useState(40);
    const [ firstRun, setFirstRun ] = useState(true);

    if(f) {
        console.log("Graph.js, f(3): " + f(3));
        let points = [];
        for(let i = -1*(xLength/2); i <= (xLength/2); i += 0.25) {
            points.push({ x: i, y: f(i) });
        }
        GraphFunctions.clearGraph(document.getElementById('myCanvas'), xLength);
        // GraphFunctions.setUp(document.getElementById('myCanvas'), xLength);
        GraphFunctions.graph(points, document.getElementById('myCanvas'), xLength);
    }
    const handleGraphClick = (funct) => {
        console.log("HandleGraphClick ran in App.js, funct(3) = : "+ funct(3));
        setF((x) => (x) => {
          return funct(x);
        });
      }

    
    //Only on startup, not on rerender
    useEffect(() => {
        GraphFunctions.clearGraph(document.getElementById('myCanvas'), xLength);
        let canvas = document.getElementById('myCanvas')
        GraphFunctions.setUp(canvas, xLength, firstRun);
        setFirstRun(false);
    }, []);
    
    

    return(
        <div id="graph-wrapper">
            <canvas id="myCanvas" width={'863.39'} height={'606'} ></canvas>
            {/* <button onClick={(e) => {
                setXLength(xLength + 2);
            }}>+</button> */}
            <Sidebar handleGraphClickProp={handleGraphClick}/>
        </div>
        
    )
    
}