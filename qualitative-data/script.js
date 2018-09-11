// Aaditi Rokade
// Africa renewable energy access

var x= 0;

function setup() {
    
  var margin = {top: 10, right: 30, bottom: 30, left: 30};
  
  width = 600 - margin.left - margin.right;
  height = 600 - margin.top - margin.bottom;
  
  createCanvas(1200, 1200);
  background('#eee');
  noStroke();
  textFont('lato');
  
}

function draw() {
  
  //ar bars = getElements('bars');
    
    var y=40;
    
    //------------------------------------------part1: electricity access
    //title1
    textSize(14);
    fill('rgb(0,0,0)');
    text('No access to electricity', 40, y);
    
    //bar1
    x=180;
    
    //white
    for(i=0;i<10;i++){
    x+=42;
    fill('white');
    rect(x, 31, y, 10);
    }
    
    x=180;
    //blue
    for(i=0;i<9;i++){
    x+=42;
    fill('lightblue');
    rect(x, 31, y, 10);
    }
    
    x=180;
    //red
    for(i=0;i<4;i++){
    x+=42;
    fill('rgb(230,50,50)');
    rect(x, 31, y, 10);
    }
    //------------------------------------------part1: labels
    
    y+=25;
    //label 4
    textSize(21);
    textStyle(NORMAL);
    fill('rgb(0,0,0)');
    text('4', 382, y);
    
    textSize(11);
    fill('rgb(0,0,0)');
    text('of 10 Africans', 400, y);
    
    //label 4
    textSize(21);
    textStyle(NORMAL);
    fill('rgb(0,0,0)');
    text('9', 590, y);
    
    textSize(11);
    fill('rgb(0,0,0)');
    text('of 10 people globally', 608, y);
    
    //---------------------------------------------
    
    y+=55;
    
    //label global deficit
    textSize(14);
    //textStyle(BOLD);
    fill('rgb(0,0,0)');
    text('Global Deficit', 40, y);
    textSize(10);
    text('sub-saharan Africa\'s contribution', 40, y+15);
    
    y-15;
    
    //bar2
    x=0;
    fill('lightblue');
    rect(222, y-10, 420, 10);
    
    x=0;
    fill('orange');
    rect(222, y-10, 239.4, 10);
    
    
    //---------------------------------part2: labels
    
    y+=25;
    
    textSize(21);
    textAlign(LEFT);
    fill('rgb(0,0,0)');
    text('57', 450, y);
    
    textSize(11);
    textAlign(LEFT);
    fill('rgb(0,0,0)');
    text('% in 2014 ~ 609 million Africans', 477, y);
   
    
    //-------------------------------------global deficit 2030
    
     y+=35;
    
    //bar2
    x=0;
    fill('lightblue');
    rect(222, y-10, 420, 10);
    
    x=0;
    fill('red');
    rect(222, y-10, 245.2, 10);
    
    //---------------------------------labels: part3
    
     y+=25;
      
    textSize(21);
    fill('rgb(0,0,0)');
    text('61', 455, y);
    
    textSize(11);
    textAlign(LEFT);
    fill('rgb(0,0,0)');
    text('% in 2030 ~ 654 million Africans ', 482, y);
    
    
    //------------------------------------------part4: drift
    
    y+=35;
    
    //bar2
    x=0;
    fill('lightblue');
    rect(222, y-10, 420, 10);
    
    x=0;
    fill('red');
    rect(222, y-10, 245.2, 10);
    
    x=0;
    fill('orange');
    rect(222, y-10, 239.4, 10);
    
    //------------------------------------------part4: drift labels
    
     y+=25;
      
    textSize(21);
    fill('rgb(0,0,0)');
    text('4', 458, y);
    
    textSize(11);
    textAlign(LEFT);
    fill('rgb(0,0,0)');
    text('% rise predicted ~ 45 million Africans ', 474, y);
    
    
}
    
