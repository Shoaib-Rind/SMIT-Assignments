
const quizData = [
  {
      quiz: "What is Machine Learning?",
      options: ["A mathematical model", "A type of AI", "A human skill", "None of these"],
      answer: "A type of AI"
  },
  {
      quiz: "What is AI?",
      options: ["Artificial Intelligence", "Automated Input", "Abstract Indexing", "None of these"],
      answer: "Artificial Intelligence"
  },
  {
      quiz: "What is JavaScript?",
      options: ["A scripting language", "A framework", "A compiler", "None of these"],
      answer: "A scripting language"
  },
  {
      quiz: "HTML stands for?",
      options: ["Hypertext Markup Language", "Hyperlink Markup Language", "Hypermedia Language", "None of these"],
      answer: "Hypertext Markup Language"
  },
  {
      quiz: "What is CSS?",
      options: ["Cascading Style Sheets", "Cascading System Sheets", "Code Style System", "None of these"],
      answer: "Cascading Style Sheets"
  },
  {
      quiz: "What is React?",
      options: ["A JavaScript library", "A Java framework", "A compiler", "None of these"],
      answer: "A JavaScript library"
  },
  {
      quiz: "What is Python?",
      options: ["A programming language", "A snake", "A framework", "None of these"],
      answer: "A programming language"
  }
];

let currentQuestionIndex = 0;
let userAnswers = Array(quizData.length).fill(null);
let timer;
let timeLeft = 30 * 60;

function randomQuiz(data, count) {
  let shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const randomQuestions = randomQuiz(quizData, 7);

function showQuestion(index) {
  const container = document.getElementById("containerQuiz");
  container.innerHTML = "";

  const questionBlock = document.createElement("div");
  questionBlock.classList.add("quiz-question");
  questionBlock.innerHTML = `
    <p>${index + 1}. ${randomQuestions[index].quiz}</p>
    ${randomQuestions[index].options.map((option) => `<label><input type="radio" name="question${index}" value="${option}" ${userAnswers[index] === option ? 'checked' : ''}>${option}</label>`).join("")}
  `;

  container.appendChild(questionBlock);

  const backButton = document.getElementById("back-btn");
  backButton.style.display = index > 0 ? "block" : "none";
}

function saveAnswer(index) {
  const selected = document.querySelector(`input[name="question${index}"]:checked`);
  if (selected) {
    userAnswers[index] = selected.value;
  }
}

function nextQuestion() {
  saveAnswer(currentQuestionIndex);

  if (currentQuestionIndex < randomQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  } else {
    finishQuiz();
  }
}

function previousQuestion() {
  saveAnswer(currentQuestionIndex);

  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
}

function finishQuiz() {
  clearInterval(timer);
  const score = randomQuestions.reduce((score, question, index) => {
    return score + (userAnswers[index] === question.answer ? 1 : 0);}, 0);

  document.getElementById("containerQuiz").innerHTML = `
    <div id="modal" onClick="closeModal()"><div id="result">Your score is: ${score}/${randomQuestions.length}<a id="hlink" href="#">Close</a></div></div>`;
    let backBtn = document.getElementById("back-btn")
    backBtn.disabled = true ;
}

function closeModal(){
    modal.style.display = "none"
    location.reload();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      finishQuiz();
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("containerQuiz");

  // Initial setup
  showQuestion(currentQuestionIndex);
  startTimer();

  document.getElementById("next-btn").addEventListener("click", () => {
    saveAnswer(currentQuestionIndex);
    nextQuestion();
  });

  document.getElementById("back-btn").addEventListener("click", previousQuestion);
});



