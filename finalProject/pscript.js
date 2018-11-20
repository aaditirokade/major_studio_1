//MAP

d3.json('data/africa.geo.json').then((geojson) => {
     
    d3.json('data/allGDPData.json').then((gdp)=>{
    
    d3.json('data/allENERGYData.json').then((eng)=>{
    

            // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
            //get mapbox access token
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWFkaXRpcm9rYWRlMSIsImEiOiJjam5vdHA1NDIwMDl3M2pudmp2N3VnNjFuIn0.365E4Awu0MI2iuzZbYmaSQ';

            // https://www.mapbox.com/mapbox-gl-js/api/#map
            //load new map
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/dark-v9',
                center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
                zoom: -10
            });
        
            //to get control of the map
            map.addControl(new mapboxgl.NavigationControl());
            
            //check
            let container = map.getCanvasContainer()
            
            //add to svg
            let svg = d3.select(container).append("svg")
        
        	let transform = d3.geoTransform({point: projectPoint}); 
        	//https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
        	//https://github.com/d3/d3-geo/blob/master/README.md
        	
        	let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md
        
         	let featureElement = svg.selectAll("path")
        		.data(geojson.features)
        		.enter()
                .append("path")
                .attr("d", d3.geoPath().projection(transform))
                .attr("stroke", "none")
                .attr("fill", "lightgray")
                .attr("fill-opacity", 0.5)
                .on('mouseover', function(d) {

                    d3.select(this).attr("fill", "salmon");
                    //we control name
                    //.text(d.properties.name.toUpperCase() + ' (Population: ' + (d.properties.pop_est/1000000).toFixed(1) + 'Mio.)');
                    


                    // PHILIPP MADE CHANGES HERE:  ---------------------------------

                    var filtered = eng.filter((singleEng) => {
                        var ct = d.properties.name;
                        return singleEng.countryName === ct;
                    });
                    d3.select("#hover").text('2012:'+filtered[0].eleRural2012+'\n'+'2013'+ filtered[0].eleRural2013).attr("fill", "lightgray");

                    // END OF PHILIPP'S CHANGES    ---------------------------------



                    d3.select('#hover').attr("fill-opacity", 5);
                })
                .on('mouseout', function() {
                    d3.select(this).attr("fill", "lightgray");
                    d3.select('#hover').attr("fill-opacity", 0);
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
        
            update()
        
        	function projectPoint(lon, lat) {
                let point = map.project(new mapboxgl.LngLat(lon, lat));
        		this.stream.point(point.x, point.y);
        	}
        	
        	
        });
    });
  
});