function plot(country){
 document.getElementById("overlay").style.visibility = "visible";
      
 var ruEngData = [];
 var ruPopData = [];
 
 var urEngData = [];
 var urPopData = [];
 
 var countryName;
 
 
 d3.json('data/allENERGYData.json').then((eng) => {
     d3.json('data/allPOPData1.json').then((pop) => {
     
    //  var country = 'BFA';
        
     
     for(var i=0;i<eng.length;i++){
        if (eng[i].countryCode === country){
            
            // % ENERGY ACCESS RURAL DATA
            if(eng[i].eleRural2012==='NA'){eng[i].eleRural2012=0;}ruEngData.push(eng[i].eleRural2012); 
            if(eng[i].eleRural2013==='NA'){eng[i].eleRural2013=0;}ruEngData.push(eng[i].eleRural2013);
            if(eng[i].eleRural2014==='NA'){eng[i].eleRural2014=0;}ruEngData.push(eng[i].eleRural2014);
            if(eng[i].eleRural2015==='NA'){eng[i].eleRural2015=0;}ruEngData.push(eng[i].eleRural2015);
            if(eng[i].eleRural2016==='NA'){eng[i].eleRural2016=0;}ruEngData.push(eng[i].eleRural2016);
            
            // % POPULATION RURAL DATA
            if(pop[i].ppru2012==='NA'){pop[i].ppru2012=0;}ruPopData.push(pop[i].ppru2012);
            if(pop[i].ppru2013==='NA'){pop[i].ppru2013=0;}ruPopData.push(pop[i].ppru2013);
            if(pop[i].ppru2014==='NA'){pop[i].ppru2014=0;}ruPopData.push(pop[i].ppru2014);
            if(pop[i].ppru2015==='NA'){pop[i].ppru2015=0;}ruPopData.push(pop[i].ppru2015);
            if(pop[i].ppru2016==='NA'){pop[i].ppru2016=0;}ruPopData.push(pop[i].ppru2016);
           
           
            // % ENERGY ACCESS URBAN DATA
            if(eng[i].eleUrban2012==='NA'){eng[i].eleUrban2012=0;}urEngData.push(eng[i].eleUrban2012);
            if(eng[i].eleUrban2013==='NA'){eng[i].eleUrban2013=0;}urEngData.push(eng[i].eleUrban2013);
            if(eng[i].eleUrban2014==='NA'){eng[i].eleUrban2014=0;}urEngData.push(eng[i].eleUrban2014);
            if(eng[i].eleUrban2015==='NA'){eng[i].eleUrban2015=0;}urEngData.push(eng[i].eleUrban2015);
            if(eng[i].eleUrban2016==='NA'){eng[i].eleUrban2016=0;}urEngData.push(eng[i].eleUrban2016); 
            
            // % POPULATION URBAN DATA
            if(pop[i].ppur2012==='NA'){pop[i].ppur2012=0;}urPopData.push(pop[i].ppur2012);
            if(pop[i].ppur2013==='NA'){pop[i].ppur2013=0;}urPopData.push(pop[i].ppur2013);
            if(pop[i].ppur2014==='NA'){pop[i].ppur2014=0;}urPopData.push(pop[i].ppur2014);
            if(pop[i].ppur2015==='NA'){pop[i].ppur2015=0;}urPopData.push(pop[i].ppur2015);
            if(pop[i].ppur2016==='NA'){pop[i].ppur2016=0;}urPopData.push(pop[i].ppur2016);
           
            countryName = eng[i].countryName;
        }
     }
    

     //plotAxis1(eng);
     plotAxis(urEngData, urPopData, ruEngData, ruPopData, countryName);
    //plotAxis1(ruEngData, ruPopData, countryName);
});
});


// function plotAxis(eng12, eng13, eng14, eng15, eng16){
function plotAxis(inUrEngData, inUrPopData, inRuEngData, inRuPopData, name){
    

// NUMBER OF DIVISIONS
 var dataXpts= 5; var dataYpts= 100;
 
// SCALE (VALUE OF 1 DIVISION)
var xScale = d3.scaleLinear().domain([0, dataXpts]).range([0, 500]);
var yScale = d3.scaleLinear().domain([0,dataYpts]).range([200,0]);

// SET VALUES FOR LINE GENERATION FOR GRAPH

var line = d3.line()
    .x(function(d, i) { return xScale(i); }) .y(function(d) { return yScale(d.y); })
    .curve(d3.curveMonotoneX)
    
    
// ALL DATASETS
var urEngData = d3.range(dataXpts).map(function(d,i) { return {"y": inUrEngData[i] } });
var urPopData = d3.range(dataXpts).map(function(d,i) { return {"y": inUrPopData[i] } });
var ruEngData = d3.range(dataXpts).map(function(d,i) { return {"y": inRuEngData[i] } });
var ruPopData = d3.range(dataXpts).map(function(d,i) { return {"y": inRuPopData[i] } });


var svg3 = d3.select("#overlay").append("svg")                               
    .attr("width", window.innerWidth/2).attr("height", window.innerHeight)
    .attr("transform","translate(" + (window.innerWidth/2)+ ",0)").append("g")
    
    
    let overlay = svg3.append('g').attr('id', 'overlay')
                  .append('rect').attr("x", 0).attr('y', 0)
                  .attr('width', window.innerWidth/2).attr('height', window.innerHeight)
                  .style('fill','#1D1E20')


    // TITLE OVERLAY
    svg3.append('text').attr('id','label3')
      .attr('x','12%').attr('y','60')
      .text('% ACCESS TO ENERGY & % POPULATION : 2012-16').attr('fill','#efefef')
      .style("font-size", "14px").style("font-family", "Lato")
      
      
    // VIEW ALL LINK   
    svg3.append('a').attr("xlink:href", "https://htmlpreview.github.io/?https://github.com/aaditirokade/major_studio_1/blob/master/finalProject/page3index.html")
      .append('text').attr('x','600').attr('y','70').text('VIEW ALL').attr('fill','gold')
      .style('font-weight','bold').style('text-decoration','underline').style("font-size", "12px").style("font-family", "Lato")
      

    // COUNTRY NAME
   svg3.append('text').attr('x','320').attr('y','100')
      .text(name).attr('fill','white').attr('stroke','white')
      .style("font-size", "18px").style("font-family", "lato")
      
   // PLOT1 NAME : URBAN
   svg3.append('text').attr('x','160').attr('y','150').text('URBAN').attr('fill','white')
      .style("font-size", "12px").style("font-family", "lato")
      
      
    //   var urbanButton3 = d3.select('#overlay').append('button').attr('id','urbtn3').text('URBAN')
    //     urbanButton3.on('click', function() { console.log('here here'); })
    //     var ruralButton3 = d3.select('#overlay').append('button').attr('id','rubtn3').text('RURAL')
    //     ruralButton3.on('click', function() { console.log('here here'); })
    
    // X-AXIS
    // svg3.append("g")
    //     .attr("class", "x axis")
    //     //.attr("transform", "translate(0," + height + ")")
    //     .attr("transform", "translate(120," + (height+180)+ ")")
    //     .call(d3.axisBottom(xScale))
    //     .attr('fill','white').attr('color','#191a1a');


// *********** CHART1 *************
// X-AXIS
svg3.append('line').attr('x1',160).attr('y1',370).attr('x2',565).attr('y2',370)
    .attr('fill','white').attr('stroke','white')
    
// DASHED LINES
var dashed = svg3.append('g').attr('class','dashed'); 
dashed.append('line').attr('x1',160).attr('y1',370-40).attr('x2','565').attr('y2',370-40);
dashed.append('line').attr('x1',160).attr('y1',370-80).attr('x2','565').attr('y2',370-80);
dashed.append('line').attr('x1',160).attr('y1',370-120).attr('x2','565').attr('y2',370-120);
dashed.append('line').attr('x1',160).attr('y1',370-160).attr('x2','565').attr('y2',370-160);
dashed.append('line').attr('x1',160).attr('y1',370-200).attr('x2','565').attr('y2',370-200);
    
// X-AXIS LABELS 
var xlabels = svg3.append('g').attr('class','xlabels'); 
xlabels.append('text').attr('x','140').attr('y','400').text('2012'); 
xlabels.append('text').attr('x','240').attr('y','400').text('2013'); 
xlabels.append('text').attr('x','340').attr('y','400').text('2014'); 
xlabels.append('text').attr('x','440').attr('y','400').text('2015'); 
xlabels.append('text').attr('x','540').attr('y','400').text('2016');
    
    
// Y-AXIS
svg3.append("g").attr("class", "y axis").attr("transform", "translate(160,170)")
    .call(d3.axisLeft(yScale)).attr('color','white');


// PATHS
// ***LINE GENERATOR : the shape of an SVG Path element is defined by one attribute: d
svg3.append("path").datum(urEngData).attr("class", "line1").attr("d", line).attr("transform", "translate(160,170)").style('stroke-width','2px');
svg3.append("path").datum(urPopData).attr("class", "line2").attr("d", line).attr("transform", "translate(160,170)").style('stroke-width','2px');

// ENG DATAPOINT CIRCLES
svg3.selectAll(".dot").data(urEngData).enter().append("circle").attr("class", "dot")
    .attr("cx", function(d, i) { return xScale(i) }).attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3).attr("transform", "translate(160,170)")
    .on("mouseover", function(a, b, c){console.log(a); })
    .on("mouseout", function() {  });

// POP DATAPOINT CIRCLES
svg3.selectAll(".dot2").data(urPopData).enter().append("circle").attr("class", "dot2")
    .attr("cx", function(d, i) { return xScale(i) }).attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3).attr("transform", "translate(160,170)")
    .on("mouseover", function(a, b, c){ console.log(a); })
	.on("mouseout", function(){  });
	   
 
 
 var diff = 300;
// *********** PLOT 2 *************

// PLOT2 NAME : URBAN
svg3.append('text').attr('x',160).attr('y',150+diff).text('RURAL').attr('fill','white')
      .style("font-size", "12px").style("font-family", "lato")

// X-AXIS
svg3.append('line').attr('x1',160).attr('y1',370+diff).attr('x2',565).attr('y2',370+diff)
    .attr('fill','white').attr('stroke','white')

// DASHED LINES
var dashed2 = svg3.append('g').attr('class','dashed2'); 
dashed2.append('line').attr('x1',160).attr('y1',370-40+diff).attr('x2','565').attr('y2',370-40+diff);
dashed2.append('line').attr('x1',160).attr('y1',370-80+diff).attr('x2','565').attr('y2',370-80+diff);
dashed2.append('line').attr('x1',160).attr('y1',370-120+diff).attr('x2','565').attr('y2',370-120+diff);
dashed2.append('line').attr('x1',160).attr('y1',370-160+diff).attr('x2','565').attr('y2',370-160+diff);
dashed2.append('line').attr('x1',160).attr('y1',370-200+diff).attr('x2','565').attr('y2',370-200+diff);

// X-AXIS LABELS 
var xlabels = svg3.append('g').attr('class','xlabels'); 
xlabels.append('text').attr('x','140').attr('y',400+diff).text('2012'); xlabels.append('text').attr('x','240').attr('y',400+diff).text('2013'); 
xlabels.append('text').attr('x','340').attr('y',400+diff).text('2014'); xlabels.append('text').attr('x','440').attr('y',400+diff).text('2015'); 
xlabels.append('text').attr('x','540').attr('y',400+diff).text('2016');

// GDP SVG

svg3.append('svg:image').attr("xlink:href", "same.svg").attr("x", 183).attr("y", 90+diff).attr('width',10)
svg3.append('svg:image').attr("xlink:href", "down.svg").attr("x", 283).attr("y", 90+diff).attr('width',15)
svg3.append('svg:image').attr("xlink:href", "up.svg").attr("x", 383).attr("y", 90+diff).attr('width',15)
svg3.append('svg:image').attr("xlink:href", "up.svg").attr("x", 483).attr("y", 90+diff).attr('width',15)
svg3.append('svg:image').attr("xlink:href", "up.svg").attr("x", 583).attr("y", 90+diff).attr('width',15)

// Y-AXIS
svg3.append("g").attr("class", "y axis").attr("transform", `translate(160,${170+diff})`)
    .call(d3.axisLeft(yScale)).attr('color','white');
    
// PATHS
// ***LINE GENERATOR : the shape of an SVG Path element is defined by one attribute: d
svg3.append("path").datum(ruEngData).attr("class", "line1").attr("d", line).attr("transform",`translate(160,${170+diff})`).style('stroke-width','2px');
svg3.append("path").datum(ruPopData).attr("class", "line2").attr("d", line).attr("transform",`translate(160,${170+diff})`).style('stroke-width','2px');


// ENG DATAPOINT CIRCLES
svg3.selectAll(".dot3").data(ruEngData).enter().append("circle").attr("class", "dot3")
    .attr("cx", function(d, i) { return xScale(i) }).attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3).attr("transform",`translate(160,${170+diff})`)
    .on("mouseover", function(a, b, c){console.log(a); })
    .on("mouseout", function() {  });

// POP DATAPOINT CIRCLES
svg3.selectAll(".dot4").data(ruPopData).enter().append("circle").attr("class", "dot4")
    .attr("cx", function(d, i) { return xScale(i) }).attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3).attr("transform",`translate(160,${170+diff})`)
    .on("mouseover", function(a, b, c){ console.log(a); })
	.on("mouseout", function(){  });




// var svgContainer =svg3.append('svg:image').attr("xlink:href", "up.svg").attr("x", "60").attr("y", "60").attr('width',15)


// svgContainer.attr('transform',function(){
//                 var me = svgContainer.node()
//                 var x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
//                 var y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate

//                 return `rotate(180, ${x1}, ${y1})`;//rotate 180 degrees about x and y
//             }); 

    }

  }
