// variables created to store html id's so we can target them later in the code 
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
// Function to start the quiz
function startQuiz() {
  
    //  target the start screen id via querySelector and set class attribute
  var startScreenEl = document.querySelector("#start-screen");
  startScreenEl.setAttribute("class", "hide");

  
  questionsEl.removeAttribute("class");

  
  timerId = setInterval(clockTick, 1000);

  
  timerEl.textContent = time;

  getQuestion();
};
// this function will to get questions
function getQuestion() {
  
  var currentQuestion = jsQuestions[currentQuestionIndex];

  
  var titleEl = document.querySelector("#question-title");
  titleEl.textContent = currentQuestion.title;

  
  optionsEl.innerHTML = "";

  
  currentQuestion.options.forEach(function(choice, i) {
    
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;

    
    choiceBtn.onclick = questionClick;

    
    optionsEl.appendChild(choiceBtn);
  });
};

function questionClick() {
  
  if (this.value !== jsQuestions[currentQuestionIndex].answer) {
    
    time -= 15;

    if (time < 0) {
      time = 0;
    }
   
    timerEl.textContent = time;
    feedbackEl.textContent = "Failure";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
    feedbackEl.style.font = "copperplate"
  } else {
    feedbackEl.textContent = "Success";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
    feedbackEl.style.font = "copperplate"
  }

  
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionIndex++;

  
  if (currentQuestionIndex === jsQuestions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
};
function quizEnd() {
  
    clearInterval(timerId);
  
    
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
  
    
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    
    questionsEl.setAttribute("class", "hide");
  };
  
  function clockTick() {
    
    time--;
    timerEl.textContent = time;
  
    
    if (time <= 0) {
      quizEnd();
    }
  };
  
  function saveHighscore() {
    
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      
      var newScore = {
        score: time,
        initials: initials
      };
  
      
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      
      window.location.href = "high-scores.html";
    }
  };
  
  function checkForEnter(event) {
    
    if (event.key === "Enter") {
      saveHighscore();
    }
  };
  
  
  submitBtn.onclick = saveHighscore;
  
  
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;

