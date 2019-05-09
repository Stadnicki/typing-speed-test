window.addEventListener('load', init);

var output = document.getElementById('words-output');
var input = document.getElementById('words-input"');

const popularWords = [
    'the',
    'be',
    'to',
    'of',
    'and',
    'in',
    'that',
    'have',
    'it',
    'for',
    'not',
    'on',
    'with',
    'he',
    'as',
    'you',
    'do',
    'at'
  ];

  var gameWords = []


function init() {
  loadWords(popularWords)
}

function loadWords(wordsArray){
  var outputString = '';
  var word = '';
  for(var i = 0; i < 200; i++){
    word = wordsArray[Math.floor(Math.random()*wordsArray.length)];
    outputString += '<span>'+word+'</span>'
  }
  output.innerHTML = outputString
}