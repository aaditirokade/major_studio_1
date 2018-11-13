  document.getElementById("overlay").style.visibility = "hidden";
  
  d3.json('africa.geo.json').then((geojson) => {
        d3.json('data/allENERGYData.json').then((eng) => {
            // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
            //get mapbox access token
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWFkaXRpcm9rYWRlMSIsImEiOiJjam5vdHA1NDIwMDl3M2pudmp2N3VnNjFuIn0.365E4Awu0MI2iuzZbYmaSQ';

            // https://www.mapbox.com/mapbox-gl-js/api/#map
            //load new map
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/dark-v9',
                center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
                zoom: 2
            });
        
            //to get control of the map
            map.addControl(new mapboxgl.NavigationControl());
            
            //check
            let container = map.getCanvasContainer()
            
            //add to svg
            let svg = d3.select(container).append("svg")
        
        	let transform = d3.geoTransform({point: projectPoint}); 
        	// https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        	//https://github.com/d3/d3-geo/blob/master/README.md
        	
        	let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
        
            // TOOLTIP DIV
            var div = d3.select('body')
                         .append('div')	
                         .attr('class', 'tooltip');
                         
                         
          //LABEL
          svg.append('text')
                .attr('id','label1')
                .attr("x", window.innerWidth/5)
                .attr("y", 40)
                .text('AFRICA: POPULATION (2012-16)')
                .attr("font-family", "sans-serif")
                .style("font-size", 18)
                .style("fill", "white")
                .style("font-weight", 'bold');
            
            // SCALE
            var scale = new mapboxgl.ScaleControl({
                maxWidth: 80,
                 unit: 'imperial'
                    });
                map.addControl(scale);
                scale.setUnit('metric');
                
         	let featureElement = svg.selectAll("path")
        		.data(geojson.features)
        		.enter()
                .append("path")
                .attr("d", d3.geoPath().projection(transform))
                .attr("stroke", "none")
                .attr("fill", "gray")
                .attr("fill-opacity", (d)=> {return (d.properties.pop_est/20000000).toFixed(2)})
                .on('mouseover', function(d) {
                    d3.select(this).attr("fill", "dodgerblue")
                    d3.select(this).attr("fill-opacity", 0.8);
                    
                    console.log(d.properties.name);
                
                   d3.select("#hover")
                        //.text(d.properties.name.toUpperCase())
                        // .text(d.properties.name.toUpperCase()+': Population: ' + (d.properties.pop_est/2000000).toFixed(1) + ' Mio.')
                        .style("fill", "gold");
                        
                       var filtered = eng.filter((singleEng) => {
                        var ct = d.properties.name;
                        return singleEng.countryName === ct;
                    });
                       console.log(filtered[0]['eleTotal2012']); 
                        
                        
                        // TOOLTIP
                        div.transition()		
                        .duration(150)		
                        .style("opacity", .7)
                        .style("visibility", 'visible');
                        
                        div.html(d.properties.name.toUpperCase()+'\n'+(d.properties.pop_est/20000000).toFixed(2))	
                           .style("left", (d3.event.pageX) + "px")		
                           .style("top", (d3.event.pageY - 28) + "px");
                })
                .on('mouseout', function() {
                    d3.select(this).attr("fill", "gray");
                    d3.select(this).attr("fill-opacity", (d)=> {return (d.properties.pop_est/20000000).toFixed(2)});
                    d3.select("#hover").text()
                    
                })
                .on('mousemove', function(d) {
                    d3.select("#hover")
                        .attr('x', function() { return d3.mouse(this)[0] + 20; })
                        .attr('y', function() { return d3.mouse(this)[1] + 10; });
                });
        
            
                
            svg.append("text")
                .attr('id', 'hover');
                
    
            function update() {
                featureElement.attr("d", path);
            }
        
            /*map.on("viewreset", update)
            map.on("movestart", function(){
        		svg.classed("hidden", true);
        	});
            map.on("rotate", function(){
        		svg.classed("hidden", true);
        	});
            map.on("moveend", function(){
        		update();
        		svg.classed("hidden", false);
        	})*/
        
            update();
        
        	function projectPoint(lon, lat) {
                let point = map.project(new mapboxgl.LngLat(lon, lat));
        		this.stream.point(point.x, point.y);
        	}
  
        
  
      
      // https://www.mapbox.com/mapbox-gl-js/api/#map
            //load new map
            let map2 = new mapboxgl.Map({
                container: 'map2',
                style: 'mapbox://styles/mapbox/dark-v9',
                center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
                zoom: 2
            });
        
            //to get control of the map
            map2.addControl(new mapboxgl.NavigationControl());
            
            //check
            let container2 = map2.getCanvasContainer();
            
            //add to svg
            let svg2 = d3.select(container2).append("svg")
        
        	let transform2 = d3.geoTransform({point: projectPoint2}); 
        	// https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        	//https://github.com/d3/d3-geo/blob/master/README.md
        	
        	let path2 = d3.geoPath().projection(transform2); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
            
            
            //LABEL
          svg2.append('text')
                .attr('id','label1')
                .attr("x", window.innerWidth/7)
                .attr("y", 40)
                .text('AFRICA: ACCESS TO ELECTRICITY (2012-16)')
                .attr("font-family", "sans-serif")
                .style("font-size", 18)
                .style("fill", "white")
                .style("font-weight", 'bold');
                
                
            // SCALE
            var scale2 = new mapboxgl.ScaleControl({
                maxWidth: 80,
                 unit: 'imperial'
                    });
                map2.addControl(scale2);
                scale2.setUnit('metric');

                
         	let featureElement2 = svg2.selectAll("path")
        		.data(geojson.features)
        		.enter()
                .append("path")
                .attr("d", d3.geoPath().projection(transform2))
                .attr("stroke", "none")
                .attr("fill", "lightgray")
                //(d)=> {return (d.properties.pop_est/20000000).toFixed(2)}
                .attr("fill-opacity", 0.4)
                .on('mouseover', function(d) {
                    d3.select(this).attr("fill", "crimson").attr('fill-opacity', 0.4);
                    
                    var filtered = eng.filter((singleEng) => {
                        var ct = d.properties.name;
                        return singleEng.countryName === ct;
                    });
                    
                    d3.select("#hover2")
                    //   .text('2012: '+filtered[0].eleRural2012+'\n'+'2013: '+ filtered[0].eleRural2013)
                      .style("fill", "gold");
                    d3.select('#hover2').attr("fill-opacity", 1);
                    
                    
                    // TOOLTIP
                    div.transition()		
                        .duration(150)		
                        .style("opacity", .8)
                        .style("visibility", 'visible');
                        
                        div.html(d.properties.name.toUpperCase()+'\n'+(d.properties.pop_est/20000000).toFixed(2))	
                           .style("left", (d3.event.pageX) + "px")		
                           .style("top", (d3.event.pageY - 28) + "px");
                })
                 .on('click', function(e, i) {
                     
                    console.log(e.properties.name);
                    // make an other filter, find corresponding country
                    // then use that to draw the chart
                     
                     map2.flyTo({
                         center: e.geometry.coordinates[0][0],
                         zoom: 4
                     });


                    d3.select('body')
                      .attr('id','detail');
                      
                      plot(e.properties.brk_a3);  
                      
                    // svg2.append('rect')
                    //   .attr("x", window.innerWidth/3)
                    //   .attr('y', 0)
                    //   .attr('width', window.innerWidth/4)
                    //   .attr('height',  window.innerHeight)
                    //   .style('fill','#191a1a')
                })
                .on('mouseout', function() {
                    d3.select(this).attr("fill", "lightgray");
                    d3.select('#hover2').attr("fill-opacity", 0);
                })
                .on('mousemove', function(d) {
                    d3.select("#hover2")
                        .attr('x', function() { return d3.mouse(this)[0] + 20; })
                        .attr('y', function() { return d3.mouse(this)[1] + 10; });
                });
        
    
                   
            svg2.append("text")
                .attr('id', 'hover2');
        
            function update2() {
                featureElement2.attr("d", path2);
            }
        
        	
            map2.on("viewreset", update2)
            map2.on("movestart", function(){
        		svg2.classed("hidden", true);
        	});
            map2.on("rotate", function(){
        		svg2.classed("hidden", true);
        	});
        	
            map2.on("moveend", function(){
        		update2();
        		svg2.classed("hidden", false);
        	})
        
            update2();
            
            function projectPoint2(lon, lat) {
                let point = map2.project(new mapboxgl.LngLat(lon, lat));
        		this.stream.point(point.x, point.y);
        	}
      
          
       }); 
  });
  
  function plot(country){
      
 document.getElementById("overlay").style.visibility = "visible";
      
      
 var engData = [];
 var popData = [];
 var countryName;
 
 
 d3.json('data/allENERGYData.json').then((eng) => {
     d3.json('data/allPOPData1.json').then((pop) => {
     
    //  var country = 'BFA';
        
     
     for(var i=0;i<eng.length;i++){
        if (eng[i].countryCode === country){
        //  plotAxis(eng[i].eleRural2012 , eng[i].eleRural2013 , eng[i].eleRural2014 , eng[i].eleRural2015 , eng[i].eleRural2016); 
            engData.push(eng[i].eleRural2012); engData.push(eng[i].eleRural2013); engData.push(eng[i].eleRural2014); engData.push(eng[i].eleRural2015); engData.push(eng[i].eleRural2016); 
            popData.push(pop[i].ppur2012); popData.push(pop[i].ppur2013); popData.push(pop[i].ppur2014); popData.push(pop[i].ppur2015); popData.push(pop[i].ppur2016);
           
            countryName = eng[i].countryName;
        }
     }
    //  console.log(popData);

     //plotAxis1(eng);
    plotAxis(engData, popData, countryName);
});
});


// function plotAxis(eng12, eng13, eng14, eng15, eng16){
function plotAxis(inEngData, inPopData, name){
     
     console.log(inPopData);
    
    var marginTop= 50;
    var marginLeft=50;
    var marginRight=50;
    var marginBottom=50;
    
    width = 500;
    height = 250;


// NUMBER OF DIVISIONS
 var dataXpts= 5;
 var dataYpts= 100;
 
// SCALE (VALUE OF 1 DIVISION)
var xScale = d3.scaleLinear().domain([0, dataXpts]).range([0, 500]);
var yScale = d3.scaleLinear().domain([0,dataYpts]).range([200,0]);

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
    // .attr("width", width + marginLeft + marginRight)                    
    // .attr("height", height + marginTop + marginBottom)
    .attr("width", window.innerWidth/2)                    
    .attr("height", window.innerHeight)
    .attr("transform", "translate(" + (window.innerWidth/2)+ ",0)")
    .append("g")
    // .attr("transform", "translate(" + (window.innerWidth/2)+ ",0)");
    
    

    let overlay = svg3.append('g').attr('id', 'overlay')
                  .append('rect')
                  .attr("x", 0).attr('y', 0)
                  .attr('width', window.innerWidth/2).attr('height', window.innerHeight)
                  .style('fill','#191a1a')


    // TITLE
    svg3.append('text')
      .attr('x','180').attr('y','40')
      .text('% ACCESS TO ELECTRICITY & POPULATION (2012-16)')
      .attr('fill','white')
      .attr('stroke','white')
      .style("font-size", "14px")
      .style("font-family", "lato")
      
    // VIEW ALL LINK   
    svg3.append('a').attr("xlink:href", "https://htmlpreview.github.io/?https://github.com/aaditirokade/major_studio_1/blob/master/DynamicsInteractivityNarrative/assignment3_13NOV/page3/page3index.html")
      .append('text')
      .attr('x','600').attr('y','60')
      .text('VIEW ALL >>')
      .attr('fill','white')
      .attr('stroke','white')
      .style("font-size", "12px")
      .style("font-family", "lato")
      

    // COUNTRY NAME
   svg3.append('text')
      .attr('x','320').attr('y','100')
      .text(name)
      .attr('fill','white')
      .attr('stroke','white')
      .style("font-size", "18px")
      .style("font-family", "lato")

// DRAW X-AXIS
// add another group container
// asign it a class name - class can be used to identify more than one elements
// transform by height (x axis is positioned at the bottom of graph)

// d3.axisBottom --> Constructs a new bottom-oriented axis generator for the given scale, with empty 
//tick arguments, a tick size of 6 and padding of 3. In this orientation, ticks are drawn below the 
//horizontal domain path

// call the x axis in group tag using .call(scale) method

// svg3.append("g")
//     .attr("class", "x axis")
//     //.attr("transform", "translate(0," + height + ")")
//     .attr("transform", "translate(120," + (height+180)+ ")")
//     .call(d3.axisBottom(xScale))
//     .attr('fill','white').attr('color','#191a1a');



// DRAW Y-AXIS
// ADD SVG --> GROUP container
//y axis- no transformation needed as it's towards extrame right
// call the y axis in group tag using .call(scale) method

svg3.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(120,230)")
    .call(d3.axisLeft(yScale))
    .attr('color','white'); // Create an axis component with d3.axisLeft




// ADD SVG--> PATH container
// bind the data to PATH, and call the line generator 
// assign class for styling
// LINE GENERATOR : the shape of an SVG Path element is defined by one attribute: d
svg3.append("path")
    .datum(dataset) 
    .attr("class", "line")
    .attr("d", line)
    .attr("transform", "translate(120,230)");



// CIRCLE for each DATAPOINT
//dy defines a shift along the y-axis for each individual glyph relative to the preceding glyph
svg3.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3)
    .attr("transform", "translate(120,230)")
      .on("mouseover", function(a, b, c) { 
  			console.log(a) 
        // this.attr('class', 'focus')
		})
	   .on("mouseout", function() {  });


      
      
    //   // DROPDOWN
    //   var select = svg3.append('select').attr('class','select')
    // //   .on('change',onchange)
      
    //   var options = select.selectAll('option')
    //                       .data([1,2,3,4]).enter()
    //                       .append('option').text(function (d) { return d; });
                          
    //                 // function onchange() {
    //                 // 	selectValue = d3.select('select').property('value')
    //                 // 	d3.select('body')
    //                 // 		.append('p')
    //                 // 		.text(selectValue + ' is the last selected option.')
    //                 // };
      

    // CHART 2
    
    // svg3.append("g")
    // .attr("class", "x axis")
    // .attr("transform", "translate(120," + (height+420)+ ")")
    // .call(d3.axisBottom(xScale))
    // .attr('fill','white').attr('color','#191a1a');
    
    // svg3.append("g")
    // .attr("class", "y axis")
    // .attr("transform", "translate(120,470)")
    // .call(d3.axisLeft(yScale))
    // .attr('color','white');
    
    svg3.append("path")
    .datum(dataset2) 
    .attr("class", "line2")
    .attr("d", line)
    .attr("transform", "translate(120,230)");  //470
                  
                  
    svg3.selectAll(".dot2")
    .data(dataset2)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot2") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d,i) { return yScale(d.y) })
    .attr("r", 3)
    .attr("transform", "translate(120,230)")
      .on("mouseover", function(a, b, c) { 
  			console.log(a) 
        // this.attr('class', 'focus')
		})
	   .on("mouseout", function() {  });
	   
	   
	   // 2012    
svg3.append('text').attr('x','110').attr('y','460')
      .text('2012').attr('fill','white').attr('stroke','white')
      .style("font-size", "14px").style("font-family", "lato")
      
// 2013    
svg3.append('text').attr('x','210').attr('y','460')
      .text('2013').attr('fill','white').attr('stroke','white')
      .style("font-size", "14px").style("font-family", "lato")
      
// 2014    
svg3.append('text').attr('x','300').attr('y','460')
      .text('2014').attr('fill','white').attr('stroke','white')
      .style("font-size", "14px").style("font-family", "lato")

// 2015      
svg3.append('text').attr('x','400').attr('y','460')
      .text('2015').attr('fill','white').attr('stroke','white')
      .style("font-size", "14px").style("font-family", "lato")
      
// 2016        
svg3.append('text').attr('x','510').attr('y','460')
      .text('2016').attr('fill','white').attr('stroke','white')
      .style("font-size", "14px").style("font-family", "lato")
      
svg3.append('line').attr('x1','120').attr('y1','430').attr('x2','540').attr('y2','430')
      .attr('fill','white').attr('stroke','white')
    }

  }
