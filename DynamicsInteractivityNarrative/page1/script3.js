
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
                
                   d3.select("#hover")
                        //.text(d.properties.name.toUpperCase())
                        // .text(d.properties.name.toUpperCase()+': Population: ' + (d.properties.pop_est/2000000).toFixed(1) + ' Mio.')
                        .style("fill", "gold");
                        
                        
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
        
            map.on("viewreset", update)
            map.on("movestart", function(){
        		svg.classed("hidden", true);
        	});
            map.on("rotate", function(){
        		svg.classed("hidden", true);
        	});
            map.on("moveend", function(){
        		update();
        		svg.classed("hidden", false);
        	})
        
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
                    console.log(filtered[0]['eleTotal2012']);
                    d3.select("#hover2").text('2012: '+filtered[0].eleRural2012+'\n'+'2013: '+ filtered[0].eleRural2013)
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
                 .on('click', function(d) {

                    svg2.append('rect')
                      .attr("x", window.innerWidth/3)
                      .attr('y', 0)
                      .attr('width', window.innerWidth/4)
                      .attr('height',  window.innerHeight)
                      .style('fill','#191a1a')
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