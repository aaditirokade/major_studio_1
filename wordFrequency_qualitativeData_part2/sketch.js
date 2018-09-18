var dictionary = [];
var textX = 0;


//canvas is to check if the code is running fine
//loadstrings loads the words from textfile in array: dictinary
function setup() {
    createCanvas(windowWidth, windowHeight);
    background('lightblue');
    loadStrings('UNDP_Africa_Policy_Brief.txt', callback);  //load text file
}


//to add words to dictionary
function callback(africa){                  //takes text file as attribute
    //console.log(africa);                  //display text in console
    
    africa.forEach(function(phrases){        //for each phrase
            //console.log(phrases);            //displays phrases
            
            var words = phrases.split(' ');  //splits phrases into words
            words.forEach(function(word){    //displays words
                //console.log(words);
                
            //function to store words into a disctionary
              var filteredWords = dictionary.filter(function(element) {   
                  
                  //anonymous function expression: var myFunction = function() {statements}
                  //element: The current element being processed in the array.
                  //dictionary: The array filter was called upon.
                  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                  
               return element.word == word; 
              });
              
              if (filteredWords.length)
              filteredWords[0].count++;  //????
              else
              dictionary.push({word: word, count: 1});
              //The push() method adds one or more elements to the end of an array and returns the new length of the array.
              
            });
            
            console.log(dictionary);
        });
}


//to display words to canvas
function display() {
    background('lightblue');
    
    push();
    // The push() function saves the current drawing style settings and transformations
    
        translate(textX, height/2);                       //start at textX and canvasHeight/2
        for (var i=0; i<dictionary.length; i++) {         //for all elecments in disctionary
        
        textSize(dictionary[i].count);                //Sets/gets the current font size- here, a function of word count
        
        var txtWidth = textWidth(dictionary[i].word); //Calculates and returns the width of any character or text string
        text(dictionary[i].word, 0, 0);               //Draws text to the screen.
        translate(txtWidth, 0);                       //to display words in sequence
        
    }
    pop();
    //pop() restores the settings stored by push()
    
    console.log('Horizontal Speed', mouseX-pmouseX);
}  

//call display on mouse event
function mouseDragged() {
    display();
    textX += mouseX-pmouseX;
}