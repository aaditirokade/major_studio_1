
  // GET BOTH DATA FILES
  d3.json('africa.geo.json').then((geojson) => {
        d3.json('data/allENERGYData.json').then((eng) => {
           
            
            // MAPBOX ACCESS TOKEN
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWFkaXRpcm9rYWRlMSIsImEiOiJjam5vdHA1NDIwMDl3M2pudmp2N3VnNjFuIn0.365E4Awu0MI2iuzZbYmaSQ';

            
            // LOAD NEW MAP
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/aaditirokade1/cjo95e47201fd2stfs0ywz2pq',
                center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
                zoom: 2
            });
        
            // NAV CONTROLS FOR NEW MAP (+,- and rotate buttons)
            //map.addControl(new mapboxgl.NavigationControl());
            
            // CONTAINER
            let container = map.getCanvasContainer()
            
            // ADD SVG TO CONTAINER
            let svg = d3.select(container).append("svg")
        
        
            // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        	// https://github.com/d3/d3-geo/blob/master/README.md
        	let transform = d3.geoTransform({point: projectPoint}); 
        
            // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
        	let path = d3.geoPath().projection(transform); 
        
            // TOOLTIP DIV
            var div = d3.select('body').append('div').attr('class','tooltip');
                         
            // MAP SCALE
            var scale = new mapboxgl.ScaleControl({
                maxWidth: 80, 
                unit: 'imperial' });
                map.addControl(scale);
                scale.setUnit('metric');
             
            // SVG OVERLAY   
         	let featureElement = svg.selectAll("path")
        		.data(geojson.features).enter()
                .append("path").attr("d", d3.geoPath().projection(transform))
                .attr("stroke", "none").attr("fill", "gray")
                .attr("fill-opacity", (d)=> {return (d.properties.pop_est/20000000).toFixed(2)})
                .on('mouseover', function(d) {
                    
                   d3.select(this).attr("fill", "dodgerblue")
                   d3.select(this).attr("fill-opacity", 0.5);
                        
                       // FILTER    
                       var filtered = eng.filter((singleEng) => {
                            var ct = d.properties.name;
                            return singleEng.countryName === ct;
                        });
                 
                        // TOOLTIP
                        div.transition().duration(150).style("opacity", 1).style("visibility", 'visible');
                        div.html(d.properties.name.toUpperCase()+'\n'+(d.properties.pop_est/20000000).toFixed(2))	
                           .style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                })
                .on('click', function(e, i) {
                     
                     map.flyTo({
                         center: e.geometry.coordinates[0][0],
                         zoom: 4
                     });

                    d3.select('body').attr('id','detail');
                    plot(e.properties.brk_a3); 
                    document.getElementById('map2').style.visibility = "hidden";
                      
                })
                .on('mouseout', function() {
                    
                    d3.select(this).attr("fill", "gray");
                   // d3.select(this).attr("fill-opacity", (d)=> {return (d.properties.pop_est/20000000).toFixed(2)});
                    d3.select(this).attr("fill-opacity", 0.5);
                    //d3.select("#hover").text()
                    
                })
                .on('mousemove', function(d) {
                    d3.select("#hover")
                        .attr('x', function() { return d3.mouse(this)[0] + 20; })
                        .attr('y', function() { return d3.mouse(this)[1] + 10; });
                });
                
            
            // UPDATES SVG (map overlay) with the base map
            function update() {featureElement.attr("d", path);}
        
            
            map.on("viewreset", update);
            map.on("movestart", function(){ svg.classed("hidden", true); });
            map.on("rotate", function(){ svg.classed("hidden", true); });
            map.on("moveend", function(){ update();svg.classed("hidden", false); });
        
            update();
        
        	function projectPoint(lon, lat) {
                let point = map.project(new mapboxgl.LngLat(lon, lat));
        		this.stream.point(point.x, point.y);
        	}
  
        
        // MAP1 TOGGLE BUTTONS
        var urbanButton = d3.select("#map").append('button').attr('id','urbtn1').text('URBAN')
        urbanButton.on('click', function() { console.log('here here'); })
        var ruralButton = d3.select("#map").append('button').attr('id','rubtn1').text('RURAL')
        ruralButton.on('click', function() { console.log('here here'); })
        
        
        d3.select("#map").append('text')
                .attr('id','label1')
                .attr("x", window.innerWidth/5)
                .attr("y", 40)
                .text('% POPULATION (2016)')
                .attr("font-family", "sans-serif")
                .style("font-size", 18)
                .style("fill", "white")
                .style("font-weight", 'bold');
                
        d3.select("#map2").append('text')
                .attr('id','label2')
                .attr("x", window.innerWidth/5)
                .attr("y", 40)
                .text('% ENERGY ACCESS (2016)')
                .attr("font-family", "sans-serif")
                .style("font-size", 18)
                .style("fill", "white")
                .style("font-weight", 'bold');
  
  
      // MAP2
      // https://www.mapbox.com/mapbox-gl-js/api/#map
            //load new map
            let map2 = new mapboxgl.Map({
                container: 'map2',
                style: 'mapbox://styles/aaditirokade1/cjo95e47201fd2stfs0ywz2pq',
                center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
                zoom: 2
            });
        
            //NAV CONTROLS (+,-, rotate)
            //map2.addControl(new mapboxgl.NavigationControl());
            
            // ADD CONTAINER
            let container2 = map2.getCanvasContainer();
            
            // ADD SVG TO CONTAINER
            let svg2 = d3.select(container2).append("svg")
        
        	let transform2 = d3.geoTransform({point: projectPoint2}); 
        	// https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        	//https://github.com/d3/d3-geo/blob/master/README.md
        	
        	let path2 = d3.geoPath().projection(transform2); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
            
                
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
                     
                     map2.flyTo({
                         center: e.geometry.coordinates[0][0],
                         zoom: 4
                     });

                    d3.select('body').attr('id','detail');
                    plot(e.properties.brk_a3);  
                      
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
      
          
        var urbanButton2 = d3.select("#map2").append('button').attr('id','urbtn2').text('URBAN')
            urbanButton2.on('click', function() { console.log('here here'); })
        
        
        var ruralButton2 = d3.select("#map2").append('button').attr('id','rubtn2').text('RURAL')
            ruralButton2.on('click', function() { console.log('here here'); })
          
       }); 
  });
  
  
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
                  .style('fill','#191a1a')


    // TITLE OVERLAY
    svg3.append('text').attr('id','label3')
      .attr('x','200').attr('y','60')
      .text('%ENERGY ACCESS & % POPULATION (2012-16)').attr('fill','#efefef')
      .style("font-size", "14px").style("font-family", "Lato")
      
      
    // VIEW ALL LINK   
    svg3.append('a').attr("xlink:href", "https://vfs.cloud9.us-east-1.amazonaws.com/vfs/a781720202c74ba080f5141c784fc66b/preview/assignment3/page1/page3index.html")
      .append('text').attr('x','600').attr('y','70').text('VIEW ALL').attr('fill','gold')
      .style('font-weight','bold').style('text-decoration','underline').style("font-size", "12px").style("font-family", "Lato")
      

    // COUNTRY NAME
   svg3.append('text').attr('x','320').attr('y','100')
      .text(name).attr('fill','white').attr('stroke','white')
      .style("font-size", "18px").style("font-family", "lato")
      
      
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
svg3.append('line').attr('x1','160').attr('y1','370').attr('x2','565').attr('y2','370')
    .attr('fill','white').attr('stroke','white')
    
// X-AXIS LABELS 
var xlabels = svg3.append('g').attr('class','xlabels'); 
xlabels.append('text').attr('x','140').attr('y','400').text('2012'); xlabels.append('text').attr('x','240').attr('y','400').text('2013'); 
xlabels.append('text').attr('x','340').attr('y','400').text('2014'); xlabels.append('text').attr('x','440').attr('y','400').text('2015'); 
xlabels.append('text').attr('x','540').attr('y','400').text('2016');
    
    
// Y-AXIS
svg3.append("g").attr("class", "y axis").attr("transform", "translate(160,170)")
    .call(d3.axisLeft(yScale)).attr('color','white');


// PATHS
// ***LINE GENERATOR : the shape of an SVG Path element is defined by one attribute: d
svg3.append("path").datum(urEngData).attr("class", "line1").attr("d", line).attr("transform", "translate(160,170)");
svg3.append("path").datum(urPopData).attr("class", "line2").attr("d", line).attr("transform", "translate(160,170)");

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
// *********** CHART2 *************
// X-AXIS
svg3.append('line').attr('x1',160).attr('y1',370+diff).attr('x2',565).attr('y2',370+diff)
    .attr('fill','white').attr('stroke','white')
    
// X-AXIS LABELS 
var xlabels = svg3.append('g').attr('class','xlabels'); 
xlabels.append('text').attr('x','140').attr('y',400+diff).text('2012'); xlabels.append('text').attr('x','240').attr('y',400+diff).text('2013'); 
xlabels.append('text').attr('x','340').attr('y',400+diff).text('2014'); xlabels.append('text').attr('x','440').attr('y',400+diff).text('2015'); 
xlabels.append('text').attr('x','540').attr('y',400+diff).text('2016');

// Y-AXIS
svg3.append("g").attr("class", "y axis").attr("transform", `translate(160,${170+diff})`)
    .call(d3.axisLeft(yScale)).attr('color','white');
    
// PATHS
// ***LINE GENERATOR : the shape of an SVG Path element is defined by one attribute: d
svg3.append("path").datum(ruEngData).attr("class", "line1").attr("d", line).attr("transform",`translate(160,${170+diff})`);
svg3.append("path").datum(ruPopData).attr("class", "line2").attr("d", line).attr("transform",`translate(160,${170+diff})`);


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

    }

  }