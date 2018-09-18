var textX = 0;
var myText1, myText2, myText3, myText4, myText5;
//var txtFont = ['Georgia', 'Lato', 'Gill Sans','Verdana', 'Arial'];

    
    
function setup() {
    createCanvas(windowWidth, windowHeight);
    background('lightblue');
    
    // loadStrings('sotu-t-2.txt', callback);
    myText1 = new Text('Goal7_target7-1_Indicator7-1-1.txt', height/5);
    myText2 = new Text('Goal7_target7-1_Indicator7-1-2.txt', height/5*2);
    //myText3 = new Text('Goal7_target7-2_Indicator7-2-1.txt', (height/5)*3);
   // myText4 = new Text('Goal7_target7-3_Indicator7-3-1.txt', (height/5)*4);
   // myText5 = new Text('Goal7_target7-a_Indicator7-a-1.txt', (height/5)*5);
       
    myFont = loadFont('Roboto-Regular.ttf'); 
    }

function Text(fileName, yPos) {
    
    console.log(fileName);
    
    var dictionary = [];
    loadStrings(fileName, callback);

    this.display = function() {
        push();
        push();
        translate(textX, yPos);
        for (var i=0; i<dictionary.length; i++) {
            
            //textSize(70);
            //text(addArray(dictionary[i].count), 0, 0);
            //console.log(addArray(dictionary[i].count));
            
            textSize(dictionary[i].count);
            //textSize(12 + (mouseX / width)*72);
            
            var txtWidth = textWidth(dictionary[i].word);
            //textAlign(CENTER, BOTTOM);
            // if (dictionary[i].count>100)
            // fill(255,0,0);
            
            textLeading((mouseX/width) * 30);
            if (dictionary[i].count < 7)
            fill('#00a86b');
            else if (dictionary[i].count > 7 && dictionary[i].count < 30)
            fill('#fcd12a');
            else 
            fill('#d21f3c');
            text(dictionary[i].word, 0, dictionary[i].count,200, 200);
            translate(txtWidth, 0);
        }
        pop();
        //console.log('Horizontal Speed', mouseX-pmouseX);
        pop();
  
    }

    
    function addArray(el){
        for (i=0; i<=el.length; i++){
        return summ += el[i]+el[i++];}
    }
    
    function callback(africa) {
        // console.log(sotu);
        
        africa.forEach(function(phrases) {
            // console.log(phrases);
            
            var words = phrases.split(' ');
            words.forEach(function(word){
               
               var filteredWords = dictionary.filter(function(element) {
                  return element.word == word;
                });
          
                if (filteredWords.length)
                  filteredWords[0].count++;
                else
                  dictionary.push({word: word, count: 1});
                
            });
            
        });
        console.log(dictionary);
    }
}

function mouseDragged() {
    background('white');
    
    r = random(255);
    g = random(255);
    b = random(255);
    
    //var r,g,b = random(0,255);
    textFont('Georgia');
    //fill(r,g,b);
    myText1.display();
    
    textFont(myFont);
    // if (mouseIsPressed) {
    // stroke(70,145,56);
    // }
    
    //fill(r,g,b);
    myText2.display();
    
    // textFont('Arial Narrow');
    // fill(163,230,120);
    // //myText3.display();
    
    // textFont('Gill sans');
    // fill(210,123,34);
    // //myText4.display();
    
    // textFont('Verdana');
    // fill(145,67,105);
    // //myText5.display();
    
     textX += mouseX-pmouseX;
}
  
  