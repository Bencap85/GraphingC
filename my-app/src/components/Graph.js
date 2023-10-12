import { useEffect, state, useState, memo } from 'react'
import Sidebar from '../components/Sidebar'
import '../App.css'
import { GraphClass } from '../math/graph.js'
import { MapInteractionCSS } from 'react-map-interaction'

export default function Graph({ functProp }) {

    const [ f, setF ] = useState(() => {});
    const [ xLength, setXLength ] = useState(4);
    const [ graphObject, setGraphObject ] = useState(null);
    const [ firstRun, setFirstRun ] = useState(true);
    const [ value, setValue ] = useState({scale: 1, 
                                          translation: { x: 0, y: 0 }
                                          
                                        
                                          
                                        
                                        });


    const checkForF = () => {
        if(f) {
            console.log("Graph.js, f(3): " + f(3));
            let points = [];
            for(let i = -1*(xLength/2); i <= (xLength/2); i += 0.25) {
                points.push({ x: i, y: f(i) });
            } 
            graphObject.clearAndDrawBackground();
            graphObject.plotPoints(points);
        } else if(graphObject) {
            graphObject.clearAndDrawBackground();
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
        window.addEventListener('resize', (e) => {
            e.preventDefault();
        });
        //
        setGraphObject(new GraphClass(document.getElementById('myCanvas'), xLength));
        //
        checkForF();
        setFirstRun(false);
    }, []);
    //On each render
    useEffect(() => {
        console.log("Re rendered");
        if(graphObject)
            graphObject.xLength = xLength;
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
            <MapInteractionCSS
                value={value}
                translationBounds={ { xMin: 0, xMax: 0, yMin: 0, yMax: 0 } }
                onChange={(newValue) => {
                    console.log(JSON.stringify(newValue));
                        if(newValue.scale < value.scale) {
                            console.log("Zoomed Out");
                            newValue.translation.x = value.translation.x;
                            newValue.translation.y = value.translation.y;
                            handleZoomOut();
                        }
                        else if(newValue.scale > value.scale) {
                            console.log("Zoomed In");
                            newValue.translation.x = value.translation.x;
                            newValue.translation.y = value.translation.y;
                            handleZoomIn();
                        } else /*Pan occurred*/ {
                        
                        
                        }
                        newValue.scale = 1;
                        setValue(newValue)
                    }
                }
                                                        >
        
                <canvas id="myCanvas" width={window.screen.width} height={window.screen.height}  ></canvas>
            </MapInteractionCSS>
            
            <Sidebar handleGraphClickProp={handleGraphClick} />
            
        </div>
        
    )
}

/*
    const [ f, setF ] = useState(() => {});
    const [ xLength, setXLength ] = useState(4);
    const [ firstRun, setFirstRun ] = useState(true);
    const [ value, setValue ] = useState({scale: 1, 
                                          translation: { x: 0, y: 0 }
                                          
                                        
                                          
                                        
                                        });

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
        window.addEventListener('resize', (e) => {
            e.preventDefault();
        });
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
            <MapInteractionCSS
                value={value}
                translationBounds={ { xMin: 0, xMax: 0, yMin: 0, yMax: 0 } }
                onChange={(newValue) => {
                    console.log(JSON.stringify(newValue));
                        if(newValue.scale < value.scale) {
                            console.log("Zoomed Out");
                            newValue.translation.x = value.translation.x;
                            newValue.translation.y = value.translation.y;
                            handleZoomOut();
                        }
                        else if(newValue.scale > value.scale) {
                            console.log("Zoomed In");
                            newValue.translation.x = value.translation.x;
                            newValue.translation.y = value.translation.y;
                            handleZoomIn();
                        } else {
                        
                        
                        }
                        newValue.scale = 1;
                        setValue(newValue)
                    }
                }
                                                        >
        
                <canvas id="myCanvas" ></canvas>
            </MapInteractionCSS>
            
            <Sidebar handleGraphClickProp={handleGraphClick} />
            
        </div>
        
    )
    
}

*/