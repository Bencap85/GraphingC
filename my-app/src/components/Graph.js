import { useEffect, state, useState, memo } from 'react'
import Sidebar from '../components/Sidebar'
import '../App.css'
import GraphFunctions, { zoomIn } from '../math/graph.js'

export default function Graph({ functProp }) {

    const [ f, setF ] = useState(() => {});
    const [ xLength, setXLength ] = useState(4);
    const [ firstRun, setFirstRun ] = useState(true);
    const checkForF = () => {
        if(f) {
            console.log("Graph.js, f(3): " + f(3));
            let points = [];
            for(let i = -1*(xLength/2); i <= (xLength/2); i += 0.25) {
                points.push({ x: i, y: f(i) });
            } 
            GraphFunctions.clearGraph(document.getElementById('myCanvas'), xLength);
            GraphFunctions.graph(points, document.getElementById('myCanvas'), xLength);
        } else {
            GraphFunctions.setUp(document.getElementById('myCanvas'), xLength, firstRun);
        }
    }
    const handleGraphClick = (funct) => {
        console.log("HandleGraphClick ran in App.js, funct(3) = : "+ funct(3));
        setF((x) => (x) => {
          return funct(x);
        });
    }
    
    
    //Only on startup, not on rerender
    useEffect(() => {
        checkForF();
        setFirstRun(false);
    }, []);
    //On each render
    useEffect(() => {
        console.log("Re rendered");
        checkForF();
    });
    
    const handleZoomIn = () => {
        setXLength(xLength - 2);
    }
    const handleZoomOut = () => {
        setXLength(xLength + 2);
    }

    return(
        <div id="graph-wrapper">
            <button onClick={handleZoomIn} >+</button>
            <button onClick={handleZoomOut} >-</button>
            <canvas id="myCanvas" width={'863.39'} height={'606'} ></canvas>
            
            <Sidebar handleGraphClickProp={handleGraphClick} />
            
        </div>
        
    )
    
}