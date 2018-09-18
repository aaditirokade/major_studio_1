var lines1, lines2, lines3, lines4, lines5;
var counts1,counts2, counts3, counts4, counts5;
var textX = 0;

var field, button;

var wordList1 = [];
var wordList2 = [];
var wordList3 = [];
var wordList4 = [];
var wordList5 = [];

//var wordList1, wordList2, wordList2, wordList4, wordList5 =  [];

function preload() {
 /*loadStrings - reads the contents of a file and creates a String array of its individual lines*/

  lines1 = loadStrings('Goal7_target7-1_Indicator7-1-1.txt', callback1);
  lines2 = loadStrings('Goal7_target7-1_Indicator7-1-2.txt', callback2);
  lines3 = loadStrings('Goal7_target7-2_Indicator7-2-1.txt', callback3);
  lines4 = loadStrings('Goal7_target7-3_Indicator7-3-1.txt', callback4);
  lines5 = loadStrings('Goal7_target7-a_Indicator7-a-1.txt', callback5);
}

function setup() {

  field = createInput();                //input field
  button = createButton("map");         //button
  createCanvas(windowWidth, windowHeight);

/* RiTa.concordance(text, args) - creates a concordance, a list of words with their frequency of occurence, from the given text and (optional) options
* join(list, separator) - Combines an array of Strings into one String, each separated by the character(s) used for the separator parameter.*/

  counts1 = RiTa.concordance(lines1.join(" "));  //returns object
  counts2 = RiTa.concordance(lines2.join(" "));
  counts3 = RiTa.concordance(lines3.join(" "));
  counts4 = RiTa.concordance(lines4.join(" "));
  counts5 = RiTa.concordance(lines5.join(" "));

  //create UI
  /*createInput() - Creates an <input></input> element in the DOM for text input. */

  button.mousePressed(displayCount);

  //set drawing parameters
  background('white');
  textAlign(CENTER, CENTER);
  textSize(24);
  noStroke();
  fill(255);
  noLoop();
}

function callback1(el){
  el.forEach(function(phrases) {
  var words = phrases.split(' ');

   words.forEach(function(word){
     var filteredWords = wordList1.filter(function(element) {
                   //filter creates a new array with all elements that pass the test
                   return element.word == word;
               });

                if (filteredWords.length)
                filteredWords[0].count++;
                else
                wordList1.push({word: word, count: 1});
   });
  });
}

function callback2(el){
  el.forEach(function(phrases) {
  var words = phrases.split(' ');

   words.forEach(function(word){
     var filteredWords = wordList2.filter(function(element) {
                   //filter creates a new array with all elements that pass the test
                   return element.word == word;
               });

                if (filteredWords.length)
                filteredWords[0].count++;
                else
                wordList2.push({word: word, count: 1});
   });
  });
}

function callback3(el){
  el.forEach(function(phrases) {
  var words = phrases.split(' ');

   words.forEach(function(word){
     var filteredWords = wordList3.filter(function(element) {
                   //filter creates a new array with all elements that pass the test
                   return element.word == word;
               });

                if (filteredWords.length)
                filteredWords[0].count++;
                else
                wordList3.push({word: word, count: 1});
   });
  });
}

function callback4(el){
  el.forEach(function(phrases) {
  var words = phrases.split(' ');

   words.forEach(function(word){
     var filteredWords = wordList4.filter(function(element) {
                   //filter creates a new array with all elements that pass the test
                   return element.word == word;
               });

                if (filteredWords.length)
                filteredWords[0].count++;
                else
                wordList4.push({word: word, count: 1});
   });
  });
}

function callback5(el){
  el.forEach(function(phrases) {
  var words = phrases.split(' ');

   words.forEach(function(word){
     var filteredWords = wordList5.filter(function(element) {
                   //filter creates a new array with all elements that pass the test
                   return element.word == word;
               });

                if (filteredWords.length)
                filteredWords[0].count++;
                else
                wordList5.push({word: word, count: 1});
   });
  });
}



function displayCount() {

  var word = field.value();
  var wordCount = 0;

  /*hasOwnProperty - method returns a boolean indicating whether the object has the specified property as its own property*/
  if (counts1.hasOwnProperty(word) || counts2.hasOwnProperty(word) || counts3.hasOwnProperty(word) || counts4.hasOwnProperty(word) || counts5.hasOwnProperty(word)) {
    var wordCount = counts1[word] + counts2[word] + counts3[word] + counts4[word] + counts5[word];
  } else
    var wordCount = 0;

  r= random(0.255);
  g=random(0,255);
  b=random(0,255);

  fill(r,g,b, 20);
  //ellipse(random(0,300),random(0,300), wordCount*1.5, wordCount*1.5)
  push();
  push();
  translate(wordCount, 0);
  ellipse(100, height/2, wordCount/1.5, wordCount/1.5)
  pop();
  pop();
  //word.length +=word.length*10;
  fill('black');
  //text(wordCount,width-30, height/2);

}

function draw() {


}
