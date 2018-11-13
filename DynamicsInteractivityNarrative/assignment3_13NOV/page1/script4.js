 var engData = [];
 var popData = [];
 
 
 d3.json('data/allENERGYData.json').then((eng) => {
     d3.json('data/allPOPData1.json').then((pop) => {
     
     var country = 'BFA';
     
     for(var i=0;i<eng.length;i++){
        if (eng[i].countryCode === country){
        //  plotAxis(eng[i].eleRural2012 , eng[i].eleRural2013 , eng[i].eleRural2014 , eng[i].eleRural2015 , eng[i].eleRural2016); 
            engData.push(eng[i].eleRural2012); engData.push(eng[i].eleRural2013); engData.push(eng[i].eleRural2014); engData.push(eng[i].eleRural2015); engData.push(eng[i].eleRural2016); 
            popData.push(pop[i].ppur2012); popData.push(pop[i].ppur2013); popData.push(pop[i].ppur2014); popData.push(pop[i].ppur2015); popData.push(pop[i].ppur2016);
 
        }
     }
    //  console.log(popData);

     //plotAxis1(eng);
    plotAxis(engData, popData);
});
});

// d3.axisLeft
// d3.axisbottom
// d3.this
// d3.randomUniform
// d3.range .map
// d3.scaleLinear
// d3.select
// d3.selectAll

// function plotAxis(eng12, eng13, eng14, eng15, eng16){
function plotAxis(inEngData, inPopData){
     
     console.log(inPopData);
    // console.log(eng12, eng13, eng14, eng15, eng16);
    
    // var yValues =[];
    // yValues.push(eng12); yValues.push(eng13); yValues.push(eng14); yValues.push(eng15); yValues.push(eng16);
    // console.log(yValues);
    
    var marginTop= 50;
    var marginLeft=50;
    var marginRight=50;
    var marginBottom=50;
    
    width = 500;
    height = 200;


// NUMBER OF DIVISIONS
 var dataXpts= 5;
 var dataYpts= 100;
 
// SCALE (VALUE OF 1 DIVISION)
var xScale = d3.scaleLinear().domain([0, dataXpts]).range([0, width]);
var yScale = d3.scaleLinear().domain([0,dataYpts]).range([height,0]);

// SET VALUES FOR LINE GENERATION FOR GRAPH

var line = d3.line()
    .x(function(d, i) { return xScale(i); }) 
    .y(function(d) { return yScale(d.y); })
    // .curve(d3.curveMonotoneX)
    
    
// An array of objects of length N. Each object has key -> value pair, the key being "y" and the 
// value is a random number
// RAMDOM UNIFORM : returns a function for generating random numbers with a uniform distribution

var xdataset = ['2012','2013','2014','2015','2016'];

// var dataset = d3.range(dataXpts).map(function(d,i) { return {"y": yValues[i] } });
var dataset = d3.range(dataXpts).map(function(d,i) { return {"y": inEngData[i] } })
var dataset2 = d3.range(dataXpts).map(function(d,i) { return {"y": inPopData[i] } })

console.log(dataset);
console.log(dataset2);

// ADD SVG
//<body><svg>, SVG container, state its height and width
//add g : GROUP container
// TRANSFORM : TRANSLATE --> translation along x and translation along y
// here, TRANSFORM shifts the container to align with margins

var svg3 = d3.select("#overlay").append("svg")                               
    .attr("width", width + marginLeft + marginRight)                    
    .attr("height", height + marginTop + marginBottom)
    .append("g")
    .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

let overlay = svg3.append('g').attr('id', 'overlay')
                  .append('rect')
                  .attr("x", 0).attr('y', 0)
                  .attr('width', window.innerWidth/2).attr('height', window.innerHeight)
                  .style('fill','#191a1a')

// DRAW X-AXIS
// add another group container
// asign it a class name - class can be used to identify more than one elements
// transform by height (x axis is positioned at the bottom of graph)

// d3.axisBottom --> Constructs a new bottom-oriented axis generator for the given scale, with empty 
//tick arguments, a tick size of 6 and padding of 3. In this orientation, ticks are drawn below the 
//horizontal domain path

// call the x axis in group tag using .call(scale) method

svg3.append("g")
    .attr("class", "x axis")
    //.attr("transform", "translate(0," + height + ")")
    .attr("transform", "translate(30," + (height+20)+ ")")
    .call(d3.axisBottom(xScale))
    .attr('stroke','white').attr('color','white');



// DRAW Y-AXIS
// ADD SVG --> GROUP container
//y axis- no transformation needed as it's towards extrame right
// call the y axis in group tag using .call(scale) method

svg3.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(30,20 )")
    .call(d3.axisLeft(yScale))
    .attr('stroke','white').attr('color','white'); // Create an axis component with d3.axisLeft




// ADD SVG--> PATH container
// bind the data to PATH, and call the line generator 
// assign class for styling
// LINE GENERATOR : the shape of an SVG Path element is defined by one attribute: d
svg3.append("path")
    .datum(dataset) 
    .attr("class", "line")
    .attr("d", line)
    .attr("transform", "translate(30,20 )");



// CIRCLE for each DATAPOINT
//dy defines a shift along the y-axis for each individual glyph relative to the preceding glyph
svg3.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3)
    .attr("transform", "translate(30,20 )")
      .on("mouseover", function(a, b, c) { 
  			console.log(a) 
        // this.attr('class', 'focus')
		})
	   .on("mouseout", function() {  });



 // CHART 2 
 
	var svg2 = d3.select("#overlay").append("svg")                               
    .attr("width", width + marginLeft + marginRight)                    
    .attr("height", height + marginTop + marginBottom)
    .append("g")
    //.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
    .attr("transform", "translate(" + marginLeft + ",400)");
	 
	 
	let overlay1 = svg2.append('g').attr('id', 'overlay1')
                  .append('rect')
                  .attr("x", 0).attr('y', 0)
                  .attr('width', window.innerWidth/2).attr('height', window.innerHeight)
                  .style('fill','#191a1a')   
		
	svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(30," + (height+20)+ ")")
    .call(d3.axisBottom(xScale))
    .attr('stroke','white').attr('color','white');
    
    svg2.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(30,20 )")
    .call(d3.axisLeft(yScale))
    .attr('stroke','white').attr('color','white');
    
    svg2.append("path")
    .datum(dataset2) 
    .attr("class", "line2")
    .attr("d", line)
    .attr("transform", "translate(30,20 )");
    
    svg2.selectAll(".dot")
    .data(dataset2)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot2") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3)
    .attr("transform", "translate(30,20 )")
      .on("mouseover", function(a, b, c) { 
  			console.log(a) 
        // this.attr('class', 'focus')
		})
	   .on("mouseout", function() {  });
}
