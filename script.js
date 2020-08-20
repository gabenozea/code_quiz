//Create relatable variables to build with
var viewHighscores = document.querySelector("body > ul > li > a");
var secondsLeft = document.querySelector(".seconds");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var quizContainer = document.querySelector("#card");
var questionNumber = document.querySelector("#question-number");
// Setting timer to a locked 75 seconds to count back from
var sec = 75;


// Setting the currentQIndex to begin at 0
var currentQuestionIndex = 0;
//Declare the timer as a global scope to access in and outside of functions.
var timerId;

//Function that clears the current window to begin the quiz and initiate timer. I attempted a slideshow but hide command works easier
    function renderQuiz () {
      var quizArea = document.querySelector("#card > div > p")
      quizArea.setAttribute("class", "hide");
      startBtn.setAttribute("class", "hide");
      questionNumber.setAttribute("class", "hide");
      questionsEl.removeAttribute("class");
//Nest functioning timer to start of quiz
      timerId = setInterval(timer, 1000);

      secondsLeft.textContent = sec;
      retrieveQues();
    }

// Creating a function that reveals the quiz questions in a forEach loop, rendering each quiz question attribute
    function retrieveQues () {
      var currentQuestion = myQuestions[currentQuestionIndex];
      var titleEl = document.querySelector("#question-header");
      titleEl.textContent = currentQuestion.title;
      choicesEl.innerHTML = "";
// Loops for choices.
      currentQuestion.choices.forEach(function(choice) {
// Creates a new button for each choice with their corresponding value
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.setAttribute("class", "choicebtn");
//sets the choices in each button for the corresponding question
        choiceBtn.textContent = choice;
// Adding a click event to start a function that checks the matching selected value and moves on to the next question
        choiceBtn.onclick = questionCheck;
        choicesEl.appendChild(choiceBtn);
      });
    }

    
// Adding a function that advances the question while keeping track of the timer
    function questionCheck () {
//'this' refers to the upmost scope where it is defined, in this case it is used as an object method to bind .value to CurrentQuestionIndex, if the answer doesnt match with the value, deduct 15 seconds
      if (this.value !== myQuestions[currentQuestionIndex].answer) {
        sec -= 15;

        if (sec < 0) {
          sec = 0;
        }
        secondsLeft.textContent = sec;
      }  
// Advance to the next question     
        currentQuestionIndex ++;
// if the quiz length exceeds the amount of remaining questions, end the quiz
        if (currentQuestionIndex === myQuestions.length) {
          quizEnd();
        } else {
          retrieveQues();
        }
    }
//Triggers the end of the quiz by clearing the timer, combining the final tally with outcome of the timer
    function quizEnd () {
      var gameOverEl = document.querySelector("#gameOver");
      var finalScoreEl = document.querySelector("#finalScore");

      clearInterval(timerId);

      gameOverEl.removeAttribute("class");
      finalScoreEl.textContent = sec;
      questionsEl.setAttribute("class", "hide");
    }
//Functioning timer
    function timer () {
      sec--;
      secondsLeft.textContent = sec;

      if (sec <= 0) {
        quizEnd();
      }
    }
    
//Click event for the "Start Quiz" button
startBtn.onclick = renderQuiz;






