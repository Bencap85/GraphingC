class GraphClass {
    constructor(canvas, startingXLength) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.xLength = startingXLength;
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = canvas.width * window.devicePixelRatio;
        this.height = canvas.height * window.devicePixelRatio;
        //Set (actual canvas) dimensions
        canvas.width = this.width;
        canvas.height = this.height;
        this.increment = 2;
        this.numVerticalLines = this.xLength/this.increment;
    }

    drawBackground() {
        const scale = (this.width/this.xLength);
        const yLength = this.findYLength(scale).yLength;
        const yTopDiff = this.findYLength(scale).topDiff;
    
        this.updateNumVerticalLines();
        if(this.numVerticalLines > 20) {
            this.findNewIncrement('increase');
        } else if(this.numVerticalLines < 8) {
            this.findNewIncrement('decrease');
        }
        let xVals = [];
        
        console.log("Increment: " + this.increment);
        
        for(let i = 0; i > (-1*(this.xLength/2))-this.xOffset; i -= this.increment) {
            let xVal = i;
            xVals.push(xVal);
        }
        for(let i = 0; i < (this.xLength/2)-this.xOffset; i += this.increment) {
            let xVal = i;
            xVals.push(xVal);
        }
        let xPoints = [];
        for(let i = 0; i < xVals.length; i++) {
            let point = this.convertToPx({ x: xVals[i]+this.xOffset, y: 0 }, scale);
            xPoints.push(point.x);
        }
        let yPoints = [];
        for(let i = 0; i < yLength+2; i++) {
            const yDiffVal = yTopDiff*scale;
            const yVal = (scale*i)+yDiffVal;
            yPoints.push(yVal);
            
        }
        
        const lineWidth = 0.3;
        for(let i = 0; i < xPoints.length; i++) {
            this.ctx.beginPath();
            // if(i === (this.xLength/2)+this.xOffset) {
            //     this.ctx.strokeStyle = "black";
            //     this.ctx.moveTo(xPoints[i], 0);
            //     this.ctx.lineWidth = 3;
            //     this.ctx.lineTo(xPoints[i], this.width);
            //     this.ctx.closePath();
            //     this.ctx.stroke();
            //     continue;
            // }
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeStyle = 'black';
            this.ctx.moveTo(xPoints[i], 0);
            this.ctx.lineTo(xPoints[i], this.width);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        for(let i = 0; i < yPoints.length; i++) {
            this.ctx.beginPath();
            if(i === (yLength/2)+this.yOffset) {
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
        this.addNumbers();
    }
    plotPoints(points) {
        const scale = (this.width/this.xLength);
        const yLength = this.findYLength(scale);
    
        let pxPoints = [];
        for(let i = 0; i < points.length; i++) {
            let pointInPx = this.convertToPx(points[i], scale);
            pointInPx.x += this.xOffset * scale;
            pxPoints.push(pointInPx);
        }
        
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
        let xMidInPx = (this.width/2);
        let yMidInPx = (this.height/2);

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

    findNewIncrement(direction) {
        let newInc;
        if(direction === "increase") {
            newInc = this.increment *= 2;
        } else {
            newInc = this.increment /= 2;
        }
        return newInc;
    }
    updateNumVerticalLines() {
        this.numVerticalLines = this.xLength / this.increment;
    }

    addNumbers() {
        this.updateNumVerticalLines();
        if(this.numVerticalLines > 20) {
            this.findNewIncrement('increase');
        } else if(this.numVerticalLines < 8) {
            this.findNewIncrement('decrease');
        }
        const scale = (this.width/this.xLength);
        let xVals = [];
        
        console.log("Increment: " + this.increment);
        
        for(let i = 0; i > (-1*(this.xLength/2))-this.xOffset; i -= this.increment) {
            let xVal = i;
            xVals.push(xVal);
        }
        for(let i = 0; i < (this.xLength/2)-this.xOffset; i += this.increment) {
            let xVal = i;
            xVals.push(xVal);
        }
        let xPointsInPx = [];
        for(let i = 0; i < xVals.length; i++) {
            let point = this.convertToPx({ x: xVals[i]+this.xOffset, y: 0 }, scale);
            xPointsInPx.push(point.x);
        }
        this.ctx.font = 'italic 18px Arial';
        this.ctx.fillColor = "red";
        for(let i = 0; i < xPointsInPx.length; i++) {
            this.ctx.fillText(`${xVals[i]}`, xPointsInPx[i], (this.height/2)+(this.yOffset*scale));
        }
    }

}

module.exports = { GraphClass }

