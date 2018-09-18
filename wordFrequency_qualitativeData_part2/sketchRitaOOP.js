var myTxt1, myTxt2, myTxt3;
var field, button;

function setup(){
 createCanvas(windowWidth, windowHeight);
 background ('white');
 myFont = loadFont('Roboto-Regular.ttf');
 
 myTxt1 = new Txt('Goal7_target7-1_Indicator7-1-1.txt', height/4);
 myTxt2 = new Txt('Goal7_target7-1_Indicator7-1-2.txt', (height/4)*2);
}

function Txt(fileName, yPosition){
    var wordList= [];
    loadStrings(fileName, callback);
    
    this.display = function (){
        
        for(i=0; i<wordList.length; i++){
            
        }
    }
    
    function callback(handle){
        
        handle.forEach(function(phrases){
            var words = phrases.split(' ');
            
            var finteredWords = wordList.filter(function(element){
                return element.word == word; 
                
            });
            
            if(wordList.length)
            filteredWords[0].count++;
            else
            wordList.push({word: word, count: 1})
        });
    }
    //console.log(wordList);
}