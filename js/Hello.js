window.addEventListener('load', init);

var output = document.getElementById('words-output');
var input = document.getElementById('words-input');
var timerClock = document.getElementById('timer')

var currentWord = ""
var currentlyEntered = ""
var isGameStarted = false;
var counter = 0;

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

function checkTimer() {
  if(!isGameStarted){
    isGameStarted = true;
    var seconds = 60;
    setInterval(function () {
      timerClock.textContent = seconds;
      seconds--;
    }, 1000);
  }
  else if(seconds === 0){
    isGameStarted = false;
    seconds = 60;
    return false;
  }
  return true;
}


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
  output.firstElementChild.classList.add("current-word");
  currentWord = output.firstChild.textContent
  console.log("current start: " + currentWord)
}

function handleKeyPressed(e){ 
  keynum = e.keyCode;

  checkTimer();

  if(currentlyEntered === "" && keynum === 32){
    console.log("empty")
    input.value = "";
  }
  else if (keynum === 32){
    input.value = "";
    console.log("checking word")
    checkWord(currentlyEntered);
    currentlyEntered = ""
  }
  else if(keynum === 8){
    currentlyEntered = currentlyEntered.substring(0, currentlyEntered.length-1);
  }
  else {
    currentlyEntered += String.fromCharCode(keynum);
  }
}

function checkWord(enteredWord){
  console.log("words:(" + enteredWord + "|" + currentWord+")")
  if(enteredWord.toLowerCase() === currentWord.toLowerCase()){
    console.log("match")
    counter++;
  }
  let current = document.querySelector(".current-word");
  current.nextSibling.classList.add("current-word")
  current.classList.remove("current-word")
  current = document.querySelector(".current-word");
  currentWord = current.textContent;
  console.log("new current word: " + currentWord)
  document.getElementById('correct-counter').innerHTML =counter
  
}