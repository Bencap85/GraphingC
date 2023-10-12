class GraphClass {
    constructor(canvas, startingXLength) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.xLength = startingXLength;
        this.width = canvas.width * window.devicePixelRatio;
        this.height = canvas.height * window.devicePixelRatio;
        //Set (actual canvas) dimensions
        canvas.width = this.width;
        canvas.height = this.height;
    }

    drawBackground() {
        const scale = (this.width/this.xLength);
        const yLength = this.findYLength(scale).yLength;
        const yTopDiff = this.findYLength(scale).topDiff;
    
        const lineWidth = 0.3;
        this.ctx.lineWidth = lineWidth;
    
        let xPoints = [];
        for(let i = 0; i < this.xLength; i++) {
            let xVal = (this.width/this.xLength)*i;
            xPoints.push(xVal);
        }
        let yPoints = [];
        for(let i = 0; i < yLength+2; i++) {
            const yDiffVal = yTopDiff*scale;
            const yVal = (scale*i)+yDiffVal;
            yPoints.push(yVal);
            
        }
        
        for(let i = 0; i < xPoints.length; i++) {
            this.ctx.beginPath();
            if(i === this.xLength/2) {
                this.ctx.strokeStyle = "black";
                this.ctx.moveTo(xPoints[i], 0);
                this.ctx.lineWidth = 3;
                this.ctx.lineTo(xPoints[i], this.width);
                this.ctx.closePath();
                this.ctx.stroke();
                continue;
            }
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeStyle = 'black';
            this.ctx.moveTo(xPoints[i], 0);
            this.ctx.lineTo(xPoints[i], this.width);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        for(let i = 0; i < yPoints.length; i++) {
            this.ctx.beginPath();
            if(i === yLength/2) {
                this.ctx.moveTo(0, yPoints[i]);
                this.ctx.lineTo(this.width, yPoints[i]);
                this.ctx.lineWidth = 3;
                this.ctx.closePath();
                this.ctx.stroke();
                continue;
            }
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(0, yPoints[i]);
            this.ctx.lineTo(this.width, yPoints[i]);
            this.ctx.closePath();
            this.ctx.stroke();
            
        }
    }
    plotPoints(points) {
        const scale = (this.width/this.xLength);
        const yLength = this.findYLength(scale);
    
        let pxPoints = [];
        for(let i = 0; i < points.length; i++) {
            let pointInPx = this.convertToPx(points[i], scale);
            pxPoints.push(pointInPx);
        }
        console.log(points);
        console.log(pxPoints);
        
       this.ctx.beginPath();
       this.ctx.strokeStyle = "red";
       this.ctx.lineWidth = 0.5;
        for(let i = 0; i < pxPoints.length-1; i++) {
            this.ctx.moveTo(pxPoints[i].x, pxPoints[i].y);
            this.ctx.lineTo(pxPoints[i+1].x, pxPoints[i+1].y); 
            this.ctx.stroke();
        }
        
        this.ctx.stroke();
        this.ctx.closePath();
        
    }
    clearAndDrawBackground() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBackground();
    }
    //Helpers
    convertToPx(point, scale) {
        let xMidInPx = this.width/2;
        let yMidInPx = this.height/2;

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

    findYLength(scale) {
        let yLength = Math.floor(this.height/scale);
        if(yLength % 2 !== 0) {
            yLength--;
        }

        let diff = (this.height/scale)-yLength;
        let topDiff = diff/2;
        
        return { yLength, topDiff };
    }

}

module.exports = { GraphClass }




/*

const setUp = (graph, xLength, firstRun) => {
    let width, height;
    if(firstRun) {
        width = graph.width * window.devicePixelRatio;
        height = graph.height * window.devicePixelRatio;
    } else {
        width = graph.width;
        height = graph.height;
    }
    graph.width = width;
    graph.height = height;

    let ctx = graph.getContext('2d');
    drawGraphBackground(graph, xLength);
    
}
const drawGraphBackground = (graph, xLength) => {

    const ctx = graph.getContext('2d');
    const width = graph.width;
    const height = graph.height;
    const scale = (width/xLength);
    const yLength = findYLength(height, scale).yLength;
    const yTopDiff = findYLength(height, scale).topDiff;


    const lineWidth = 0.3;
    ctx.lineWidth = lineWidth;

    let xPoints = [];
    for(let i = 0; i < xLength; i++) {
        let xVal = (width/xLength)*i;
        xPoints.push(xVal);
    }
    let yPoints = [];
    for(let i = 0; i < yLength+2; i++) {
        const yDiffVal = yTopDiff*scale;
        const yVal = (scale*i)+yDiffVal;
        yPoints.push(yVal);
        
    }
    

    for(let i = 0; i < xPoints.length; i++) {
        ctx.beginPath();
        if(i === xLength/2) {
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
    console.log('In graph.js/graph(), widthxheight = '+width+"x"+height);
    const scale = (width/xLength);
    const yLength = findYLength(height, scale);

    let pxPoints = [];
    for(let i = 0; i < points.length; i++) {
        let pointInPx = convertToPx(points[i], scale, width, height);
        pxPoints.push(pointInPx);
    }
    console.log(points);
    console.log(pxPoints);
    
   ctx.beginPath();
   ctx.strokeStyle = "red";
   ctx.lineWidth = 0.5;
    for(let i = 0; i < pxPoints.length-1; i++) {
        ctx.moveTo(pxPoints[i].x, pxPoints[i].y);
        ctx.lineTo(pxPoints[i+1].x, pxPoints[i+1].y); ctx.stroke();
    }
    
    ctx.stroke();
    ctx.closePath();
    
}
const clearGraph = (canvas, xLength) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setUp(canvas, xLength);
    console.log(canvas.width + " " + canvas.height);
}

//Helpers
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
const findYLength = (height, scale) => {
    let yLength = Math.floor(height/scale);
    if(yLength % 2 !== 0) {
        yLength--;
    }

    let diff = (height/scale)-yLength;
    let topDiff = diff/2;
    
    return { yLength, topDiff };
}

module.exports = { setUp, graph, clearGraph };

*/