var textX = 0;
var myText1;
    
function setup() {
    createCanvas(windowWidth, windowHeight);
    background('lightblue');
    
    myText1 = new Text('EnergyAccess.txt', height/2);
    myFont = loadFont('Roboto-Regular.ttf'); 
    }

function Text(fileName, yPos) {
    
    console.log(fileName);
    
    var dictionary = [];
    loadStrings(fileName, callback); //***

    this.display = function() {
        push();
        translate(textX, yPos);
        
        for (var i=0; i<dictionary.length; i++) {
            textSize(7*dictionary[i].count);
            var txtWidth = textWidth(dictionary[i].word);
            text(dictionary[i].word, 0, 10*dictionary[i].count);
            translate(txtWidth, 0);
        }
        pop();
        }
      
    
    function callback(africa) {
        
        africa.forEach(function(phrases) {
            
            var words = phrases.split(' ');
            words.forEach(function(word){
               
               var filteredWords = dictionary.filter(function(element) {
                   //filter creates a new array with all elements that pass the test 
                   return element.word == word;
               });
                //console.log(filteredWords.length);
                if (filteredWords.length)
                  filteredWords[0].count++;
                else
                  dictionary.push({word: word, count: 1});
            });
            
        });
        
    }

}

function mouseDragged() {
    background('white');
    
    r = random(255);
    g = random(255);
    b = random(255);
    textFont(myFont);
    fill(r,g,b);
    myText1.display();
    textX += mouseX-pmouseX;
}
  
  