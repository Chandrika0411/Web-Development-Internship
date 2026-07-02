const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "/* only */"],
    answer: "//"
  },
  {
    question: "Which method is used to select an element by ID?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElementsByClassName()",
      "selectId()"
    ],
    answer: "getElementById()"
  },
  {
    question: "Which tag is used to link CSS file in HTML?",
    options: ["<style>", "<script>", "<link>", "<css>"],
    answer: "<link>"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "define"],
    answer: "var"
  },
  {
    question: "Which event occurs when a user clicks an element?",
    options: ["mouseover", "click", "keydown", "submit"],
    answer: "click"
  },
  {
    question: "Which property changes text color in CSS?",
    options: ["font-color", "text-color", "color", "background"],
    answer: "color"
  },
  {
    question: "Which of these is a JavaScript framework/library?",
    options: ["React", "Laravel", "Django", "Flask"],
    answer: "React"
  },
  {
    question: "What is DOM?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Ordinance Model",
      "Document Order Machine"
    ],
    answer: "Document Object Model"
  }
];

const startScreen = document.getElementById("startScreen");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const questionCount = document.getElementById("questionCount");
const timerText = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

const scoreText = document.getElementById("scoreText");
const message = document.getElementById("message");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hide");
  quizBox.classList.remove("hide");
  resultBox.classList.add("hide");

  currentQuestion = 0;
  score = 0;

  showQuestion();
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function showQuestion() {
  clearInterval(timer);

  timeLeft = 15;
  timerText.textContent = timeLeft + "s";

  const q = questions[currentQuestion];

  questionText.textContent = q.question;
  questionCount.textContent = `Question ${currentQuestion + 1}/${questions.length}`;

  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  optionsBox.innerHTML = "";

  const shuffledOptions = shuffleArray(q.options);

  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(button, q.answer);
    });

    optionsBox.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft + "s";

    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();

      setTimeout(() => {
        goToNextQuestion();
      }, 1000);
    }
  }, 1000);
}

function selectAnswer(selectedButton, correctAnswer) {
  clearInterval(timer);

  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(option => {
    option.disabled = true;

    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
  });

  if (selectedButton.textContent === correctAnswer) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }

  setTimeout(() => {
    goToNextQuestion();
  }, 1000);
}

function disableOptions() {
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(option => {
    option.disabled = true;

    if (option.textContent === questions[currentQuestion].answer) {
      option.classList.add("correct");
    }
  });
}

function goToNextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);

  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");

  const percentage = Math.round((score / questions.length) * 100);

  scoreText.textContent = `Your Score: ${score}/${questions.length} (${percentage}%)`;

  if (percentage >= 80) {
    message.textContent = "Excellent! You performed very well.";
  } else if (percentage >= 50) {
    message.textContent = "Good attempt! Keep practicing.";
  } else {
    message.textContent = "Needs improvement. Try again.";
  }
}

function restartQuiz() {
  clearInterval(timer);

  currentQuestion = 0;
  score = 0;

  resultBox.classList.add("hide");
  quizBox.classList.add("hide");
  startScreen.classList.remove("hide");
}