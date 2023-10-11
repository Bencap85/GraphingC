import React, { state, useState } from 'react'
import '../App.css'
import Expr from "../math/expr.js" 

export default function Sidebar({ handleGraphClickProp }) {
    const [ input, setInput ] = useState("");
    const [ expanded, setExpanded ] = useState(true);


    return(
        <div id="sidebar" className="expanded">
            <div>
                <button id="expand-btn" onClick={() => {
                    let sidebar = document.getElementById('sidebar');
                    if(sidebar.className === "expanded") {
                        sidebar.classList.remove('expanded');
                        sidebar.className="closed";
                    } else {
                        sidebar.classList.remove('closed');
                        sidebar.className="expanded";
                    }
                    const interval = setInterval(() => {
                        let sidebar = document.getElementById('sidebar');
                        if(sidebar.style.top === 92) {
                            clearInterval(interval);
                            
                        }
                        console.log("sidebar: " + sidebar.style.marginTop);
                        sidebar.style.top = sidebar.style.top + 2;
                    }, 1000);
                }} >                   </button>
            </div>
            <div id="equation">
                <label>y = </label>
                <input type="text" placeholder="Write your function here" onChange={(e) => {
                    e.target.style.width = e.target.value.length + 2 + "ch";
                    if(e.target.value.length === 0) {
                        e.target.style.width = "20ch";
                    }
                    setInput(e.target.value);
                }}>
                </input>
                </div>
            <div>
                <button id="show-graph-btn" onClick={() => {
                    let f = Expr.exprToFunction(input);
                    console.log("On click ran, input: " + input);
                    handleGraphClickProp(f);
                }}>Show Graph</button>
                
            </div>
                
            
        </div>
        
    )
    
}