/* ============================================================
   🌗 MODE CLAIR / SOMBRE
   ============================================================ */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.remove("light", "dark");
  document.body.classList.add(savedTheme);
}



/* ============================================================
   📌 PAGE 1 : CHOIX DES MATIÈRES (index.html)
   ============================================================ */

const matiereButtons = document.querySelectorAll(".matiere-card");

if (matiereButtons.length > 0) {
  matiereButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const matiere = btn.dataset.matiere;
      window.location.href = `matiere.html?matiere=${matiere}`;
    });
  });
}



/* ============================================================
   📘 PAGE 2 : CHOIX DES CHAPITRES (matiere.html)
   ============================================================ */

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const chapList = document.getElementById("chapList");

if (chapList) {
  const matiere = getQueryParam("matiere");
  const matiereTitre = document.getElementById("matiereTitre");

  fetch(`data/${matiere}.json`)
    .then(res => res.json())
    .then(data => {
      matiereTitre.textContent = data.matiere;

      data.chapitres.forEach(chap => {
        const card = document.createElement("button");
        card.className = "chap-card fade-in";
        card.textContent = chap.titre;
        card.addEventListener("click", () => {
          window.location.href = `quiz.html?matiere=${matiere}&chapitre=${chap.id}`;
        });
        chapList.appendChild(card);
      });
    });
}



/* ============================================================
   🧠 PAGE 3 : QUIZ (quiz.html)
   ============================================================ */

let questions = [];
let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const choicesContainer = document.getElementById("choicesContainer");
const correctionText = document.getElementById("correctionText");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const questionIndex = document.getElementById("questionIndex");
const scoreInfo = document.getElementById("scoreInfo");

const flipCard = document.querySelector(".flip-card");

if (questionText) {
  const matiere = getQueryParam("matiere");
  const chapitre = getQueryParam("chapitre");

  document.getElementById("backToChapters").addEventListener("click", () => {
    window.location.href = `matiere.html?matiere=${matiere}`;
  });

  fetch(`data/${matiere}.json`)
    .then(res => res.json())
    .then(data => {
      const chap = data.chapitres.find(c => c.id === chapitre);
      document.getElementById("chapTitre").textContent = chap.titre;

      questions = chap.questions;

      if (questions.length === 0) {
        questionText.textContent = "Aucune question disponible pour ce chapitre.";
        return;
      }

      loadQuestion();
    });
}



/* ============================================================
   🔄 CHARGER UNE QUESTION
   ============================================================ */

function loadQuestion() {
  const q = questions[currentQuestion];

  questionText.textContent = q.question;
  choicesContainer.innerHTML = "";
  questionIndex.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
  scoreInfo.textContent = `Score : ${score}`;

  flipCard.classList.remove("flipped");

  q.choix.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn fade-in";
    btn.textContent = choice;

    btn.addEventListener("click", () => {
      showCorrection(index === q.reponse, q);
    });

    choicesContainer.appendChild(btn);
  });
}



/* ============================================================
   🔁 AFFICHER LA CORRECTION (flip-card)
   ============================================================ */

function showCorrection(isCorrect, question) {
  if (isCorrect) score++;

  correctionText.innerHTML = `
    <strong>${isCorrect ? "Bonne réponse !" : "Mauvaise réponse."}</strong><br><br>
    Réponse correcte : <strong>${question.choix[question.reponse]}</strong>
  `;

  flipCard.classList.add("flipped");
}



/* ============================================================
   ⏭️ QUESTION SUIVANTE
   ============================================================ */

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  });
}



/* ============================================================
   🏁 SCORE FINAL
   ============================================================ */

function showFinalScore() {
  flipCard.classList.remove("flipped");

  questionText.textContent = "Quiz terminé !";
  choicesContainer.innerHTML = "";
  correctionText.innerHTML = `
    Score final : <strong>${score} / ${questions.length}</strong>
  `;

  nextQuestionBtn.textContent = "Revenir aux chapitres";
  nextQuestionBtn.onclick = () => {
    const matiere = getQueryParam("matiere");
    window.location.href = `matiere.html?matiere=${matiere}`;
  };

  flipCard.classList.add("flipped");
}
