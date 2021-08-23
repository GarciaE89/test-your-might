var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");


var currentQuestionIndex = 0;
var time = jsQuestions.length * 15;
var timerId;

function startQuiz() {
  
  var startScreenEl = document.querySelector("#start-screen");
  startScreenEl.setAttribute("class", "hide");

  
  questionsEl.removeAttribute("class");

  
  timerId = setInterval(clockTick, 1000);

  
  timerEl.textContent = time;

  getQuestion();
}

