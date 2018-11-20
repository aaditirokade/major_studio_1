// globals
var x = [];
var y = [];
var cX, cY; // centroid x and y component
var a;      // polygon area

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill('pink');
}

// register mouse released events called exactly once each release
function mouseReleased() {
    // add x and y component into dedicated array
    if (x.length > 0) {
        x.splice(1, 0, mouseX);
        y.splice(1, 0, mouseY);
    } else {
        x.push(mouseX);
        y.push(mouseY);
        x.push(mouseX);
        y.push(mouseY);
    }
    console.log(x);
    // call the display function
    display();
}

function display() {
    background('lightgray');
    
    // return if there are insufficient points for an area
    if (x.length < 3)
        return;
        
    a = 0;
    cX = 0;
    cY = 0;
    
    // calculate centroid
    for(var i=0; i<x.length - 1; i++) {
        // enumerate
        cX += (x[i] + x[i+1]) * (x[i] * y[i+1] - x[i+1] * y[i]);
        cY += (y[i] + y[i+1]) * (x[i] * y[i+1] - x[i+1] * y[i]);
        a += x[i] * y[i+1] - x[i+1] * y[i];
    }

    a = 0.5 * a;
    cX = cX / (6*a);
    cY = cY / (6*a);

    // draw polygon   
    beginShape();
    for(var i=0; i<x.length; i++) {
        vertex(x[i], y[i]);
        text(i, x[i], y[i]);
    }
    endShape(CLOSE);
    
    ellipse(cX, cY, 10, 10);
}