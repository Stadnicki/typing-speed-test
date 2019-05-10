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

const popularWords = ['the', 'of', 'and','to', 'in','is','you','that','it','he','was','for','on','are','as','with','his','they',
'at','be','this','have','from','or','one','had','by','word','but','not','what','all','were','we','when','your','car', 'said',
'there','use','each','which','she','do', 'how','their','will','other','about','many','then','these','so',
'some','her','would','make','like','him','into','time','has','look','two','more','write','go','see','number','way','could','people',
'my','than','first','water','been','call','who','now','find','long','down','day','did','get','come','made','may','part'];

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
  let previous = document.querySelector(".current-word");
  previous.classList.add("ready")
  previous.nextSibling.classList.add("current-word")
  previous.classList.remove("current-word")
  let current = document.querySelector(".current-word");
  currentWord = current.textContent;
  console.log("new current word: " + currentWord)
  setCorrectCounter(correctCounter);
  setAllCounter(allCounter);
  setCorrectPerCent();
  console.log(previous.offsetTop + "-"+current.offsetTop);
  var allPreviousWords = document.getElementsByClassName("ready");
  if(current.offsetTop - previous.offsetTop > 10){
    console.log("i will remove: " + allPreviousWords.length + " elements");
    var numberOfReadyElements = allPreviousWords.length;
    for(var i = 0; i < numberOfReadyElements; i++){
      console.log("i: " + i)
      output.removeChild(output.firstChild);
    }
  }
}

function setCorrectCounter(x){
  document.getElementById('correct-counter').innerHTML = x;
}

function setAllCounter(x){
  document.getElementById('all-counter').innerHTML = x;
}

function setCorrectPerCent(){
  var percent = Math.floor((correctCounter/allCounter)*100);
  document.getElementById('correct-percent').innerHTML = percent+"%";
}