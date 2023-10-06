const setUp = (graph, xLength) => {
    
    const ctx = graph.getContext("2d");
    const height = graph.height;
    const width = graph.width;
    const scale = (width/xLength);
    const yLength = Math.floor(height/scale);

    const lineWidth = 0.1;
    ctx.lineWidth = lineWidth;

    console.log("in graph.js, xLength: " + xLength);
    console.log("in graph.js, yLength: " + yLength);

    let xPoints = [];
    for(let i = 0; i < xLength; i++) {
        let xVal = (width/xLength)*i;
        xPoints.push(xVal);
    }
    let yPoints = [];
    for(let i = 0; i < yLength; i++) {
        let yVal = (height/yLength)*i;
        yPoints.push(yVal);
    }

    for(let i = 0; i < xPoints.length; i++) {
        ctx.beginPath();
        if(i === xLength/2) {
            //ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(xPoints[i], 0);
            ctx.lineWidth = 3;
            ctx.lineTo(xPoints[i], width);
            ctx.closePath();
            ctx.stroke();
            continue;
        }
        // ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'black';
        ctx.moveTo(xPoints[i], 0);
        ctx.lineTo(xPoints[i], width);
        ctx.closePath();
        ctx.stroke();
    }
    for(let i = 0; i < yPoints.length; i++) {
        ctx.beginPath();
        if(i === yLength/2) {
            //ctx.beginPath();
            ctx.moveTo(0, yPoints[i]);
            ctx.lineTo(width, yPoints[i]);
            ctx.lineWidth = 3;
            ctx.closePath();
            ctx.stroke();
            continue;
        }
        ctx.lineWidth = lineWidth;
        ctx.moveTo(0, yPoints[i]);
        ctx.lineTo(width, yPoints[i]);
        ctx.closePath();
        ctx.stroke();
        
    }
    
}
const graph = (points, canvas, xLength) => {
    
    let ctx = canvas.getContext("2d");
    

    const height = canvas.height;
    const width = canvas.width;
    const scale = (width/xLength);
    const yLength = Math.floor(height/scale);

    let pxPoints = [];
    for(let i = 0; i < points.length; i++) {
        let pointInPx = convertToPx(points[i], scale, width, height);
        pxPoints.push(pointInPx);
    }
    console.log(points);
    console.log(pxPoints);
    
   ctx.beginPath();
   ctx.strokeStyle = "red";
   ctx.lineWidth = 0.1;
    for(let i = 0; i < pxPoints.length-1; i++) {
        ctx.moveTo(pxPoints[i].x, pxPoints[i].y);
        ctx.lineTo(pxPoints[i+1].x, pxPoints[i+1].y); ctx.stroke();
    }
    
    ctx.stroke();
    ctx.closePath();
    
}
const clearGraph = (canvas, xLength) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setUp(canvas, xLength);
    console.log(canvas.width + " " + canvas.height);
}
const zoomIn = (canvas, xLength) => {
    clearGraph(canvas);
    setUp(canvas, xLength+2);
}


const convertToPx = (point, scale, width, height) => {
    let xMidInPx = width/2;
    let yMidInPx = height/2;

    let pxPoint = {x:0, y:0};

    if(point.x === 0) {
        pxPoint.x = xMidInPx;
    } else if(point.x > 0) {
        pxPoint.x = xMidInPx + (point.x*scale)
    } else if(point.x < 0) {
        pxPoint.x = xMidInPx - Math.abs(point.x*scale);
    }

    if(point.y === 0) {
        pxPoint.y = yMidInPx;
    } else if(point.y > 0) {
        pxPoint.y = yMidInPx - (point.y*scale);
    } else if(point.y < 0) {
        pxPoint.y = yMidInPx + Math.abs(point.y*scale);
    }
    
    return pxPoint;
}
module.exports = { setUp, graph, clearGraph, zoomIn };