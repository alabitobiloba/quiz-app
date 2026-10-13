// DOM DECLARATION
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const scoreScreen = document.querySelector("#score-screen");

const questionContainer = document.querySelector("#question-container");
const optionBtn = document.querySelectorAll(".option-btn");

const startButton = document.querySelector("#start-btn");
const previousButton = document.querySelector("#previous-btn");
const submitButton = document.querySelector("#submit-btn");
const nextButton = document.querySelector("#next-btn");
const restartButton = document.querySelector("#restart-btn");
const reviewButton = document.querySelector("#review-btn");
const finalScoreContainer = document.querySelector("#final-score");

const finishReviewButton = document.querySelector("#finish-review-btn");

// IMPORTANT VARIABLES
let currentQuestionIndex = 0;
let userScore = 0;
let selectedOption = null;
let isReviewing = false;
// MY SHUFFLING FUNCTION
const shuffleQuestion = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// MY QUESTION BANK
const quizQuestions = [
  {
    question: "Which country won the 2022 FIFA World Cup?",
    options: ["Brazil", "Argentina", "France", "Croatia"],
    correctAnswer: "Argentina",
  },
  {
    question: "Who has won the most Ballon d'Or awards in history?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Ronaldinho"],
    correctAnswer: "Lionel Messi",
  },
  {
    question: "Which club has won the most UEFA Champions League titles?",
    options: ["AC Milan", "Bayern Munich", "Real Madrid", "Barcelona"],
    correctAnswer: "Real Madrid",
  },
  {
    question: "Which nation won the inaugural FIFA World Cup in 1930?",
    options: ["Uruguay", "Argentina", "Brazil", "Italy"],
    correctAnswer: "Uruguay",
  },
  {
    question: "Who is the all-time top scorer in FIFA World Cup history?",
    options: ["Cristiano Ronaldo", "Miroslav Klose", "Pelé", "Ronaldo Nazário"],
    correctAnswer: "Miroslav Klose",
  },
  {
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    correctAnswer: "Brazil",
  },
  {
    question: "In which year did Lionel Messi win his first Ballon d'Or?",
    options: ["2007", "2008", "2009", "2010"],
    correctAnswer: "2009",
  },
  {
    question:
      "Which Premier League club went entire 2003–04 season undefeated?",
    options: ["Manchester United", "Arsenal", "Chelsea", "Liverpool"],
    correctAnswer: "Arsenal",
  },
  {
    question:
      "Who holds the record for the most goals scored in a single calendar year (91 goals)?",
    options: [
      "Cristiano Ronaldo",
      "Lionel Messi",
      "Robert Lewandowski",
      "Gerd Müller",
    ],
    correctAnswer: "Lionel Messi",
  },
  {
    question:
      "Which goalkeeper has kept the most clean sheets in Premier League history?",
    options: [
      "Petr Čech",
      "David de Gea",
      "Edwin van der Sar",
      "Peter Schmeichel",
    ],
    correctAnswer: "Petr Čech",
  },
];

let userAnswers = [];

// QUESTION FETCHING FUNCTION
const displayQuestion = () => {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  optionBtn.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.classList.remove("selected", "correct", "wrong");

    if (button.textContent === userAnswers[currentQuestionIndex]) {
      button.classList.add("selected");
    }
  });

  if (currentQuestionIndex === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }

  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
  selectedOption = null;
};

//CORRECT OPTION SELECTION FUNCTION
const selectOption = (clickedButton) => {
  if (isReviewing) return; // NEW

  optionBtn.forEach((button) => {
    button.classList.remove("selected");
  });

  clickedButton.classList.add("selected");
  selectedOption = clickedButton.textContent;

  userAnswers[currentQuestionIndex] = selectedOption;
};

// ANSWER EVALUATION FUNCTION
const checkAnswer = () => {
  userScore = 0;

  quizQuestions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      userScore++;
    }
  });

  showFinalScore();
};

// PREVIOUS QUESTION FUNCTION
const previousQuestion = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;

    if (isReviewing) {
      displayResultsReview();
    } else {
      displayQuestion();
    }
  }
};

// NEXT QUESTION FUNCTION
const nextQuestion = () => {
  if (isReviewing) {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      displayResultsReview();
    }
    return;
  }

  if (userAnswers[currentQuestionIndex] === undefined) {
    alert("Please select an answer before moving to the next question!");
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  }
};

// FINAL SCORE DISPLAY FUNCTION
const showFinalScore = () => {
  quizScreen.style.display = "none";
  scoreScreen.style.display = "block";
  finalScoreContainer.textContent = `You scored ${userScore} out of ${quizQuestions.length}`;
};

// ANSWER REVIEW FUNCTION
const displayResultsReview = () => {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const userSelection = userAnswers[currentQuestionIndex];

  questionContainer.textContent = `[Score: ${userScore}/${quizQuestions.length}] ${currentQuestion.question}`;

  optionBtn.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.classList.remove("selected", "correct", "wrong");

    if (button.textContent === currentQuestion.correctAnswer) {
      button.classList.add("correct");
    }

    if (
      button.textContent === userSelection &&
      userSelection !== currentQuestion.correctAnswer
    ) {
      button.classList.add("wrong");
    }
  });

  if (currentQuestionIndex === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextButton.style.display = "none";
    finishReviewButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    finishReviewButton.style.display = "none";
  }

  submitButton.style.display = "none";
};

// RESTART QUIZ FUNCTION
const restartQuiz = () => {
  currentQuestionIndex = 0;
  userScore = 0;
  selectedOption = null;
  userAnswers = [];
  isReviewing = false;
  finishReviewButton.style.display = "none";

  shuffleQuestion(quizQuestions);
  scoreScreen.style.display = "none";
  quizScreen.style.display = "block";

  displayQuestion();
};

// EVENT LISTENERS

startButton.addEventListener("click", () => {
  shuffleQuestion(quizQuestions);
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  displayQuestion();
});

optionBtn.forEach((button) => {
  button.addEventListener("click", () => selectOption(button));
});

previousButton.addEventListener("click", previousQuestion);
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
reviewButton.addEventListener("click", () => {
  isReviewing = true;
  currentQuestionIndex = 0;
  scoreScreen.style.display = "none";
  quizScreen.style.display = "block";
  displayResultsReview();
});
finishReviewButton.addEventListener("click", () => {
  finishReviewButton.style.display = "none";
  showFinalScore();
});
restartButton.addEventListener("click", restartQuiz);
