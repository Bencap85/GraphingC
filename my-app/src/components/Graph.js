import { useEffect, state, useState, memo } from 'react'
import Sidebar from '../components/Sidebar'
import '../App.css'
import { GraphClass } from '../math/graph.js'
import { MapInteractionCSS } from 'react-map-interaction'

export default function Graph({ functProp }) {

    const [ f, setF ] = useState(() => {});
    const [ xLength, setXLength ] = useState(12);
    const [ xOffset, setXOffset ] = useState(0);
    const [ yOffset, setYOffset ] = useState(0);
    const [ yAxisPanRetardantFactor, setYAxisPanRetardantFactor ] = useState(3);
    const [ yAxisPanCounter, setYAxisPanCounter ] = useState(0);
    const [ graphObject, setGraphObject ] = useState(null);
    const [ firstRun, setFirstRun ] = useState(true);
    const [ value, setValue ] = useState({scale: 1, 
                                          translation: { x: 0, y: 0 }
                                          
                                        });

    //Only on startup, not on rerender
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            e.preventDefault();
        });
        setGraphObject(new GraphClass(document.getElementById('myCanvas'), xLength));
        checkForF();
        setFirstRun(false);
    }, []);
    //On each render
    useEffect(() => {
        console.log("Re rendered");
        console.log("XOffset: " + xOffset);
        console.log("YOffset: " + yOffset);
        if(graphObject) {
            graphObject.xLength = xLength;
            graphObject.xOffset = xOffset;
            graphObject.yOffset = yOffset;
        }

        checkForF();
    });

    const checkForF = () => {
        if(f) {
            let points = [];
            for(let i = -1*(xLength/2)-xOffset; i <= (xLength/2)-xOffset; i += (xLength? xLength/200: 10)) {
                points.push({ x: i, y: f(i)-yOffset });
            } 
            graphObject.clearAndDrawBackground();
            graphObject.plotPoints(points);
        } else if(graphObject) {
            graphObject.clearAndDrawBackground();
        }
    }
    const handleGraphClick = (funct) => {
        setF((x) => (x) => {
          return funct(x);
        });
    }
    
    
    const handleZoomIn = () => {
        setXLength(xLength - 2);
    }
    const handleZoomOut = () => {
        setXLength(xLength + 2);
    }
    const handlePan = (direction) => {
        if(direction === "left") {
            setXOffset(xOffset + 1);
        } else if(direction === "right") {
            setXOffset(xOffset - 1);
        } else if(direction === "up") {
            console.log("Panned Up");
            setYOffset(yOffset + 1);
        } else if(direction === "down") {
            console.log("Panned Down");
            setYOffset(yOffset - 1);
        }
 
    }

    return(
        <div id="graph-wrapper">
            {/* Used to catch events, not for any of the built in effects */}
            <MapInteractionCSS
                value={value}
                // disablePan={true}
                // translationBounds={ { xMin: 0, xMax: 0, yMin: 0, yMax: 0 } }
                onChange={(newValue) => {
                    console.log(JSON.stringify(newValue));
                        if(newValue.scale < value.scale) /*Zoomed Out*/ {
                            newValue.translation.x = value.translation.x;
                            newValue.translation.y = value.translation.y;
                            handleZoomOut();
                        } else if(newValue.scale > value.scale) /*Zoomed In*/ {
                            newValue.translation.x = value.translation.x;
                            newValue.translation.y = value.translation.y;
                            handleZoomIn();
                        } else /*Pan occurred*/ {
                            let x = value.translation.x;
                            let newX = newValue.translation.x;
                            let y = value.translation.y;
                            let newY = newValue.translation.y;
                            
                            if(newY > y) {
                                if(yAxisPanCounter === yAxisPanRetardantFactor) {
                                    setYAxisPanCounter(0);
                                    handlePan('up');
                                } else {
                                    setYAxisPanCounter(yAxisPanCounter+1);
                                }
                            }
                            else if(newY < y) {
                                if(yAxisPanCounter === yAxisPanRetardantFactor) {
                                    setYAxisPanCounter(0);
                                    handlePan('down');
                                } else {
                                    setYAxisPanCounter(yAxisPanCounter+1);
                                }
                            }
                            else if(newX > x) {
                                handlePan('left');
                            } 
                            else if(newX < x) {
                                handlePan('right');
                            }
                        }
                        //Returns values to original -- I don't use react-map-effects for effects, but for catching events
                        newValue.scale = 1;
                        newValue.translation = { x: value.translation.x, y: value.translation.y };
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



