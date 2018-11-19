d3.select('body').append('div').attr("class","heading2").append('text').text(' GAP BETWEEN THE ENERGY ACCESS OF URBAN & RURAL AFRICA ').attr('class','title')
                
                var urbanButton4 = d3.select('body').append('button').attr('id','urbtn4').text('URBAN')
                urbanButton4.on('click', function() { rural(); })
                var ruralButton4 = d3.select('body').append('button').attr('id','rubtn4').text('RURAL')
                ruralButton4.on('click', function() { urban(); })
                
                //append svg to append text
                var label = d3.select('body').append('svg').attr('width',window.innerWidth).attr('height','20%')
                
                label.append('text').attr('x','38%').attr('y','60%')
                .attr('class','leftlabel').text('% POPULATION ').style('fill','white').style('font-size','14px')
                
                label.append('text').attr('x','55%').attr('y','60%')
                .attr('class','rightlabel').text('% ENERGY ACCESS').style('fill','white').style('font-size','14px')
                
                
                label.append('rect').attr('x','23%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#9ac7f4')
                label.append('text').attr('x','24.5%').attr('y','82%').text('2012').style('fill','white').style('font-size','12px').attr('font-family','Lato')
                
                label.append('rect').attr('x','28%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#76b5f4')
                label.append('text').attr('x','29.5%').attr('y','82%').text('2013').style('fill','white').style('font-size','12px').attr('font-family','Lato')

                label.append('rect').attr('x','33%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#55aaff')
                label.append('text').attr('x','34.5%').attr('y','82%').text('2014').style('fill','white').style('font-size','12px').attr('font-family','Lato')
                
                label.append('rect').attr('x','38%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#2994ff')
                label.append('text').attr('x','39.5%').attr('y','82%').text('2015').style('fill','white').style('font-size','12px').attr('font-family','Lato')
               
                label.append('rect').attr('x','43%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#0080ff')
                label.append('text').attr('x','44.5%').attr('y','82%').text('2015').style('fill','white').style('font-size','12px').attr('font-family','Lato')
               
               // ENERGY ACCESS LEGENDS
                label.append('rect').attr('x','54.5%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#ddb1b1')
                label.append('text').attr('x','56%').attr('y','82%').text('2012').style('fill','white').style('font-size','12px').attr('font-family','Lato')
                
                label.append('rect').attr('x','59.5%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#d89191')
                label.append('text').attr('x','61%').attr('y','82%').text('2013').style('fill','white').style('font-size','12px').attr('font-family','Lato')

                label.append('rect').attr('x','64.5%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#d16f6f')
                label.append('text').attr('x','66%').attr('y','82%').text('2014').style('fill','white').style('font-size','12px').attr('font-family','Lato')
                
                label.append('rect').attr('x','69.5%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#d84444')
                label.append('text').attr('x','71%').attr('y','82%').text('2015').style('fill','white').style('font-size','12px').attr('font-family','Lato')
               
                label.append('rect').attr('x','74.5%').attr('y','75%').attr('width','12').attr('height','12').attr('fill','#d60f0f')
                label.append('text').attr('x','76%').attr('y','82%').text('2015').style('fill','white').style('font-size','12px').attr('font-family','Lato')
              
              
 // *******RURAL*************
function rural(){
 
 d3.json('data/africa.geo.json').then((geojson) => {
    d3.json('data/allPOPData1.json').then((pop)=>{
         d3.json('data/allENERGYData.json').then((eng)=>{
          
                // ARRAYS for % POPULATION DATA  
                 eng.forEach((engg)=>{
                  
                     var result = pop.filter((popp)=>{return popp.countryCode === engg.countryCode;})
                     
                     engg.ppru2012 = (result[0] !== undefined) ? result[0].ppru2012 : null;
                     engg.ppru2013 = (result[0] !== undefined) ? result[0].ppru2013 : null;
                     engg.ppru2014 = (result[0] !== undefined) ? result[0].ppru2014 : null;
                     engg.ppru2015 = (result[0] !== undefined) ? result[0].ppru2015 : null;
                     engg.ppru2016 = (result[0] !== undefined) ? result[0].ppru2016 : null;
                 });

	             //ACCESS TO ENERGY      
	             svg(eng);
	             
            });
    });
});



       // SVG : ACCESS TO ELECTRICITY
let svg = (data) => {
 
           
           // TOOLTIP DIV
            var div = d3.select('body').append('div').attr('class', 'tooltip');
                         
           // % ENERGY ACCESS RURAL
           var e12=[]; data.forEach((d)=>{ if(d.eleRural2012==='NA'){d.eleRural2012=0;}e12.push(d.eleRural2012);});
           var e13=[]; data.forEach((d)=>{ if(d.eleRural2013==='NA'){d.eleRural2013=0;}e13.push(d.eleRural2013);});
           var e14=[]; data.forEach((d)=>{ if(d.eleRural2014==='NA'){d.eleRural2014=0;}e14.push(d.eleRural2014);});
           var e15=[]; data.forEach((d)=>{ if(d.eleRural2015==='NA'){d.eleRural2015=0;}e15.push(d.eleRural2015);});
           var e16=[]; data.forEach((d)=>{ if(d.eleRural2016==='NA'){d.eleRural2016=0;}e16.push(d.eleRural2016);});
           
           // %POPULATION RURAL
           var p12=[]; data.forEach((d)=>{ if(d.ppru2012==='NA'){d.ppru2012=0;}p12.push(d.ppru2012);});
           var p13=[]; data.forEach((d)=>{ if(d.ppru2013==='NA'){d.ppru2013=0;}p13.push(d.ppru2013);});
           var p14=[]; data.forEach((d)=>{ if(d.ppru2014==='NA'){d.ppru2014=0;}p14.push(d.ppru2014);});
           var p15=[]; data.forEach((d)=>{ if(d.ppru2015==='NA'){d.ppru2015=0;}p15.push(d.ppru2015);});
           var p16=[]; data.forEach((d)=>{ if(d.ppru2016==='NA'){d.ppru2016=0;}p16.push(d.ppru2016);});
           
           
           let graph = d3.select('body').append('svg').attr('id','svg').attr('width', window.innerWidth + 'px').attr('height', 3500);
	      
            
            // MOTHER OF ALL GROUPS : ONE FOR EACH ENTRY
             let group1 = graph.append('g').attr('id', 'group1');
                    
            // DIV for TOOLTIP
            var div = d3.select('body').append('div').attr('class', 'tooltip');
             
                  
             // COUNTRY LABELS : GROUP1 selection variable
            let label = group1.selectAll('g').data(data).enter().append('g')
                              .attr('transform', (d, i) => {return `translate(0, ${i * 3000/data.length})`;})
                    
      
             
            // COUNTRY LABELS : TEXT      
            label.append('text').attr('class', 'labels')
                  .text( (d,i) => { return d.countryCode; })
                  .attr("x", window.innerWidth/2) .attr("y",60) // starting point
                  .attr("font-family", "sans-serif").attr("fill", '#efefef').attr('id', 'txt')
                  .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html(d.countryName).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });;
                  
                 
            // GROUP OF BARS
            // 2012 EN: GROUP1 >> GROUP2
            let group2 = group1.append('g').attr('id', 'group2');
            
            // 2013 EN: GROUP1 >> GROUP3
            let group3 = group1.append('g').attr('id', 'group3');
            
            // 2014 EN: GROUP1 >> GROUP4
            let group4 = group1.append('g').attr('id', 'group4');
                    
            // 2015 EN: GROUP1 >> GROUP5
            let group5 = group1.append('g').attr('id', 'group5');
                    
            // 2016 EN: GROUP1 >> GROUP6
            let group6 = group1.append('g').attr('id', 'group6');
            
            // 2012 POP: GROUP1 >> GROUP7
            let group7 = group1.append('g').attr('id', 'group7');
            
            // 2013 POP: GROUP1 >> GROUP8
            let group8 = group1.append('g').attr('id', 'group8');
            
            // 2014 POP: GROUP1 >> GROUP9
            let group9 = group1.append('g').attr('id', 'group9');
                    
            // 2015 POP: GROUP1 >> GROUP10
            let group10 = group1.append('g').attr('id', 'group10');
                    
            // 2016 POP: GROUP1 >> GROUP11
            let group11 = group1.append('g').attr('id', 'group11');
            
            
            //---- ENERGY ------
            // 2012 SELECTION VAR
             let bar12 = group2.selectAll('g').data(e12).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+46})`;})
            
            
            // 2012 EMPTY BARS
            bar12.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
                 
            // 2012 BARS
            bar12.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#efcaca').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2012 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
            
            // 2013 SELECTION VAR
             let bar13 = group3.selectAll('g').data(e13).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+51})`;})
            
            // 2013 EMPTY BARS
            bar13.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
                 
            // 2013 BARS
            bar13.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#e59c9c').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2013 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
            
            // 2014 SELECTION VAR
             let bar14 = group4.selectAll('g').data(e14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+56})`;})
            
            // 2014 EMPTY BARS
            bar14.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
            // 2014 BARS
            bar14.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#dd7373').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2014 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
            // 2015 SELECTION VAR
             let bar15 = group5.selectAll('g').data(e15).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+61})`;})
            
            // 2015 EMPTY BARS
            bar15.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
            // 2015 BARS
            bar15.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#d64d4d').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2015 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
            // 2016 SELECTION VAR
             let bar16 = group6.selectAll('g').data(e16).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+66})`;})
            
            // 2016 EMPTY BARS
            bar16.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
            // 2016 BARS
            bar16.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')  // TODO
                 .attr('x',0).attr('y', 0)
                 .style('fill','#ce1515').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2016 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
                 
                 
       // ----- POPULATION --------
       
            // 2012 SELECTION VAR
             let bar17 = group7.selectAll('g').data(p12).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+46})`;})
            
            
            // 2012 BARS
            bar17.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#a2d2f9').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2012 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
             
                 
            // 2013 SELECTION VAR
             let bar18 = group8.selectAll('g').data(p13).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+51})`;})
            
            // 2013 BARS
            bar18.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#77b1f2').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2013 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
         
            // 2014 SELECTION VAR
             let bar19 = group9.selectAll('g').data(p14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+56})`;})
            
            // 2014 BARS
            bar19.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#55aaff').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2014 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
            // 2015 SELECTION VAR
             let bar110 = group10.selectAll('g').data(p14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+61})`;})
            
            // 2015 BARS
            bar110.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#2994ff').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2015 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
            
            // 2016 SELECTION VAR
             let bar111 = group11.selectAll('g').data(p14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+66})`;})
            
            // 2016 BARS
            bar111.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#0080ff').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2016 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
        }
 
}



 // ******* URBAN *************
 
function urban(){

 d3.json('data/africa.geo.json').then((geojson) => {
    d3.json('data/allPOPData1.json').then((pop)=>{
         d3.json('data/allENERGYData.json').then((eng)=>{
          
                // ARRAYS for % POPULATION DATA  
                 eng.forEach((engg)=>{
                     var result = pop.filter((popp)=>{return popp.countryCode === engg.countryCode;})
                     
                     engg.ppur2012 = (result[0] !== undefined) ? result[0].ppur2012 : null;
                     engg.ppur2013 = (result[0] !== undefined) ? result[0].ppur2013 : null;
                     engg.ppur2014 = (result[0] !== undefined) ? result[0].ppur2014 : null;
                     engg.ppur2015 = (result[0] !== undefined) ? result[0].ppur2015 : null;
                     engg.ppur2016 = (result[0] !== undefined) ? result[0].ppur2016 : null;
                     
                 });

	             svg(eng);
	             
         });
    });
});



       
      let svg = (data) => {
           
           // TOOLTIP DIV
            var div = d3.select('body').append('div').attr('class', 'tooltip');
                         
           // % ENERGY ACCESS RURAL
           var e12=[]; data.forEach((d)=>{ if(d.eleUrban2012==='NA'){d.eleUrban2012=0;}e12.push(d.eleUrban2012);});
           var e13=[]; data.forEach((d)=>{ if(d.eleUrban2013==='NA'){d.eleUrban2013=0;}e13.push(d.eleUrban2013);});
           var e14=[]; data.forEach((d)=>{ if(d.eleUrban2014==='NA'){d.eleUrban2014=0;}e14.push(d.eleUrban2014);});
           var e15=[]; data.forEach((d)=>{ if(d.eleUrban2015==='NA'){d.eleUrban2015=0;}e15.push(d.eleUrban2015);});
           var e16=[]; data.forEach((d)=>{ if(d.eleUrban2016==='NA'){d.eleUrban2016=0;}e16.push(d.eleUrban2016);});
           
           // %POPULATION RURAL
           var p12=[]; data.forEach((d)=>{ if(d.ppur2012==='NA'){d.ppur2012=0;}p12.push(d.ppur2012);});
           var p13=[]; data.forEach((d)=>{ if(d.ppur2013==='NA'){d.ppur2013=0;}p13.push(d.ppur2013);});
           var p14=[]; data.forEach((d)=>{ if(d.ppur2014==='NA'){d.ppur2014=0;}p14.push(d.ppur2014);});
           var p15=[]; data.forEach((d)=>{ if(d.ppur2015==='NA'){d.ppur2015=0;}p15.push(d.ppur2015);});
           var p16=[]; data.forEach((d)=>{ if(d.ppur2016==='NA'){d.ppur2016=0;}p16.push(d.ppur2016);});
           
           
           let graph = d3.select('body').append('svg').attr('id','svg').attr('width', window.innerWidth + 'px').attr('height', 3500);
	      
            
            // MOTHER OF ALL GROUPS : ONE FOR EACH ENTRY
             let group1 = graph.append('g').attr('id', 'group1');
                    
            // DIV for TOOLTIP
            var div = d3.select('body').append('div').attr('class', 'tooltip');
             
                  
             // COUNTRY LABELS : GROUP1 selection variable
            let label = group1.selectAll('g').data(data).enter().append('g')
                              .attr('transform', (d, i) => {return `translate(0, ${i * 3000/data.length})`;})
                    
      
             
            // COUNTRY LABELS : TEXT      
            label.append('text').attr('class', 'labels')
                  .text( (d,i) => { return d.countryCode; })
                  .attr("x", window.innerWidth/2) .attr("y",60) // starting point
                  .attr("font-family", "sans-serif").attr("fill", '#efefef').attr('id', 'txt')
                  .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html(d.countryName).style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });;
                  
                 
            // GROUP OF BARS
            // 2012 EN: GROUP1 >> GROUP2
            let group2 = group1.append('g').attr('id', 'group2');
            
            // 2013 EN: GROUP1 >> GROUP3
            let group3 = group1.append('g').attr('id', 'group3');
            
            // 2014 EN: GROUP1 >> GROUP4
            let group4 = group1.append('g').attr('id', 'group4');
                    
            // 2015 EN: GROUP1 >> GROUP5
            let group5 = group1.append('g').attr('id', 'group5');
                    
            // 2016 EN: GROUP1 >> GROUP6
            let group6 = group1.append('g').attr('id', 'group6');
            
            // 2012 POP: GROUP1 >> GROUP7
            let group7 = group1.append('g').attr('id', 'group7');
            
            // 2013 POP: GROUP1 >> GROUP8
            let group8 = group1.append('g').attr('id', 'group8');
            
            // 2014 POP: GROUP1 >> GROUP9
            let group9 = group1.append('g').attr('id', 'group9');
                    
            // 2015 POP: GROUP1 >> GROUP10
            let group10 = group1.append('g').attr('id', 'group10');
                    
            // 2016 POP: GROUP1 >> GROUP11
            let group11 = group1.append('g').attr('id', 'group11');
            
            
            //---- ENERGY ------
            // 2012 SELECTION VAR
             let bar12 = group2.selectAll('g').data(e12).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+46})`;})
            
            
            // 2012 EMPTY BARS
            bar12.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
                 
            // 2012 BARS
            bar12.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#efcaca').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2012 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
            
            // 2013 SELECTION VAR
             let bar13 = group3.selectAll('g').data(e13).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+51})`;})
            
            // 2013 EMPTY BARS
            bar13.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
                 
            // 2013 BARS
            bar13.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#e59c9c').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2013 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
            
            // 2014 SELECTION VAR
             let bar14 = group4.selectAll('g').data(e14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+56})`;})
            
            // 2014 EMPTY BARS
            bar14.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
            // 2014 BARS
            bar14.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#dd7373').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2014 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
            // 2015 SELECTION VAR
             let bar15 = group5.selectAll('g').data(e15).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+61})`;})
            
            // 2015 EMPTY BARS
            bar15.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
            // 2015 BARS
            bar15.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#d64d4d').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2015 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
            // 2016 SELECTION VAR
             let bar16 = group6.selectAll('g').data(e16).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${window.innerWidth/2+70}, ${i * 3000/data.length+66})`;})
            
            // 2016 EMPTY BARS
            bar16.append('rect')
                 .attr('width', 300).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','transparent').style('stroke', '#666').style('stroke-width', 0.25).attr('id', 'rct1')
                 
            // 2016 BARS
            bar16.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')  // TODO
                 .attr('x',0).attr('y', 0)
                 .style('fill','#ce1515').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2016 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
                 
                 
       // ----- POPULATION --------
       
            // 2012 SELECTION VAR
             let bar17 = group7.selectAll('g').data(p12).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+46})`;})
            
            
            // 2012 BARS
            bar17.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#a2d2f9').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2012 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
             
                 
            // 2013 SELECTION VAR
             let bar18 = group8.selectAll('g').data(p13).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+51})`;})
            
            // 2013 BARS
            bar18.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#77b1f2').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2013 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
         
            // 2014 SELECTION VAR
             let bar19 = group9.selectAll('g').data(p14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+56})`;})
            
            // 2014 BARS
            bar19.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#55aaff').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2014 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
            // 2015 SELECTION VAR
             let bar110 = group10.selectAll('g').data(p14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+61})`;})
            
            // 2015 BARS
            bar110.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#2994ff').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2015 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
            
            // 2016 SELECTION VAR
             let bar111 = group11.selectAll('g').data(p14).enter().append('g')
                    .attr('transform', (d, i) => {return `translate(${(window.innerWidth/2-50)-d*3}, ${i * 3000/data.length+66})`;})
            
            // 2016 BARS
            bar111.append('rect')
                 .attr('width', (d,i) =>{return d*3;}).attr('height', '5px')
                 .attr('x',0).attr('y', 0)
                 .style('fill','#0080ff').attr('id', 'rct1')
                 .on('mouseover',(d)=>{
                  
                  // HIGHLIGHT
                  // bar12.select(this).style('background','cornsilk')
                  
                  // TOOLTIP
                  div.transition().duration(90).style("opacity", 1).style("visibility", 'visible');
                  div.html('2016 : '+d.toFixed(2)+'%').style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY - 28) + "px");
                 });
                 
        }
 
}