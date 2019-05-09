window.addEventListener('load', init);

var output = document.getElementById('words-output');
var input = document.getElementById('words-input');
var timerClock = document.getElementById('timer')

var currentWord = ""
var currentlyEntered = ""
var isGameStarted = false;
var endOfGame = false;
var correctCounter = 0;
var allCounter = 0;

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
    var timerInterval = setInterval(() => {
      timerClock.textContent = seconds;
      if(seconds === 0){
        clearInterval(timerInterval);
        endOfGame = true;
      }
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
  if(endOfGame){
    input.value = "";
  }
  else {
    checkTimer();
    console.log("key: " + keynum)
    if(currentlyEntered === "" && ((keynum === 32) || keynum === 13)){
      console.log("empty")
      input.value = "";
    }
    else if (keynum === 32 || keynum === 13){
      input.value = "";
      console.log("checking word")
      checkWord(currentlyEntered);
      currentlyEntered = ""
    }
    else if(keynum === 8){
      currentlyEntered = currentlyEntered.substring(0, currentlyEntered.length-1);
      checkCurrentState();
    }
    else {
      currentlyEntered += String.fromCharCode(keynum);
      checkCurrentState();
    }
  }
}

function checkCurrentState(){
  console.log(currentWord.toLowerCase() + "-" + currentlyEntered.toLowerCase())
  var currentElement = document.querySelector(".current-word");
  if(currentlyEntered != ""){
    if(currentWord.toLowerCase().startsWith(currentlyEntered.toLowerCase())){
      currentElement.classList.add("correct");
      currentElement.classList.remove("incorrect")
    }
    else{
      currentElement.classList.add("incorrect");
      currentElement.classList.remove("correct")
    }
  }
  else{
    currentElement.classList.remove("incorrect")
    currentElement.classList.remove("correct")
  }
}

function checkWord(enteredWord){
  console.log("words:(" + enteredWord + "|" + currentWord+")")
  allCounter++;
  if(enteredWord.toLowerCase() === currentWord.toLowerCase()){
    console.log("match")
    correctCounter++;
    document.querySelector(".current-word").classList.add("correct")
  }
  else {
    document.querySelector(".current-word").classList.add("incorrect")
  }
  let current = document.querySelector(".current-word");
  current.nextSibling.classList.add("current-word")
  current.classList.remove("current-word")
  current = document.querySelector(".current-word");
  currentWord = current.textContent;
  console.log("new current word: " + currentWord)
  setCorrectCounter(correctCounter);
  setAllCounter(allCounter);
  setCorrectPerCent();
}

function setCorrectCounter(x){
  document.getElementById('correct-counter').innerHTML = x
}

function setAllCounter(x){
  document.getElementById('all-counter').innerHTML = x
}

function setCorrectPerCent(){
  var percent = Math.floor((correctCounter/allCounter)*100);
  document.getElementById('correct-percent').innerHTML = percent+"%"
}