/* ========== TRANSITION & THEME ========== */

document.body.classList.add("page-transition");
window.addEventListener("load", () => {
  document.body.classList.remove("page-transition");
  document.body.classList.add("page-loaded");
});

function applySystemThemeIfNone() {
  if (localStorage.getItem("theme")) return;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.add(prefersDark ? "dark" : "light");
}
applySystemThemeIfNone();

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(savedTheme);
}

/* ========== UTILS ========== */

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const MATIERE_CONFIG = {
  maths: { class: "matiere-maths", icon: "📐", label: "Maths" },
  physique: { class: "matiere-physique", icon: "⚛️", label: "Physique" },
  ses: { class: "matiere-ses", icon: "📊", label: "SES" },
  svt: { class: "matiere-svt", icon: "🧬", label: "SVT" },
  histoiregeo: { class: "matiere-histoire", icon: "🌍", label: "Histoire-Géo" },
  francais: { class: "matiere-francais", icon: "📖", label: "Français" },
  culture: { class: "matiere-culture", icon: "🧠", label: "Culture" },
  info: { class: "matiere-info", icon: "💻", label: "Informatique" }
};

function applyMatiereTheme(matiereKey) {
  const conf = MATIERE_CONFIG[matiereKey];
  if (!conf) return;
  Object.values(MATIERE_CONFIG).forEach(c => {
    document.body.classList.remove(c.class);
  });
  document.body.classList.add(conf.class);

  const iconSpan = document.getElementById("matiereIcon");
  const nameSpan = document.getElementById("matiereName");
  if (iconSpan && nameSpan) {
    iconSpan.textContent = conf.icon;
    nameSpan.textContent = conf.label;
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ========== PAGE ACCUEIL ========== */

const matiereCards = document.querySelectorAll(".matiere-card");
if (matiereCards.length) {
  matiereCards.forEach(btn => {
    btn.addEventListener("click", () => {
      const matiere = btn.dataset.matiere;
      document.body.classList.add("page-transition");
      setTimeout(() => {
        window.location.href = `matiere.html?matiere=${matiere}`;
      }, 180);
    });
  });
}

/* ========== PAGE MATIERE ========== */

const chapList = document.getElementById("chapList");
if (chapList) {
  const matiere = getQueryParam("matiere");
  applyMatiereTheme(matiere);

  const matiereTitre = document.getElementById("matiereTitre");
  const backHome = document.getElementById("backHome");
  if (backHome) {
    backHome.addEventListener("click", () => {
      document.body.classList.add("page-transition");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 180);
    });
  }

  fetch(`data/${matiere}.json`)
    .then(r => r.json())
    .then(data => {
      matiereTitre.textContent = data.matiere;
      data.chapitres.forEach(chap => {
        const card = document.createElement("button");
        card.className = "chap-card fade-in";
        card.textContent = chap.titre;
        card.addEventListener("click", () => {
          document.body.classList.add("page-transition");
          setTimeout(() => {
            window.location.href = `quiz.html?matiere=${matiere}&chapitre=${chap.id}`;
          }, 180);
        });
        chapList.appendChild(card);
      });
    });
}

/* ========== PAGE QUIZ ========== */

let allQuestions = [];
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let combo = 0;
let level = "Débutant";
let mode = "normal";
let examTimer = null;
let examTimeLeft = 20 * 60;

const questionText = document.getElementById("questionText");
const choicesContainer = document.getElementById("choicesContainer");
const correctionText = document.getElementById("correctionText");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const questionIndex = document.getElementById("questionIndex");
const scoreInfo = document.getElementById("scoreInfo");
const comboInfo = document.getElementById("comboInfo");
const levelInfo = document.getElementById("levelInfo");
const progressBar = document.getElementById("progressBar");
const flipCard = document.querySelector(".flip-card");
const timerEl = document.getElementById("timer");
const timerValueEl = document.getElementById("timerValue");

if (questionText) {
  const matiere = getQueryParam("matiere");
  const chapitre = getQueryParam("chapitre");
  applyMatiereTheme(matiere);

  const backToChapters = document.getElementById("backToChapters");
  backToChapters.addEventListener("click", () => {
    document.body.classList.add("page-transition");
    setTimeout(() => {
      window.location.href = `matiere.html?matiere=${matiere}`;
    }, 180);
  });

  const modeButtons = document.querySelectorAll(".mode-btn");
  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      mode = btn.dataset.mode;
      resetQuizState();
      prepareQuestions();
    });
  });

  fetch(`data/${matiere}.json`)
    .then(r => r.json())
    .then(data => {
      const chap = data.chapitres.find(c => c.id === chapitre);
      document.getElementById("chapTitre").textContent = chap.titre;
      allQuestions = chap.questions;
      prepareQuestions();
    });
}

/* ========== QUIZ LOGIC ========== */

function resetQuizState() {
  score = 0;
  combo = 0;
  currentQuestionIndex = 0;
  updateScoreUI();
  updateComboUI();
  updateLevel();
  stopExamTimer();
  if (timerEl) timerEl.classList.add("hidden");
}

function prepareQuestions() {
  if (!allQuestions.length) return;

  if (mode === "normal" || mode === "learning") {
    questions = [...allQuestions];
  } else if (mode === "random") {
    questions = shuffleArray([...allQuestions]);
  } else if (mode === "exam") {
    questions = shuffleArray([...allQuestions]).slice(0, 20);
    startExamTimer();
  }

  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  if (!q) return;

  questionText.textContent = q.question;
  choicesContainer.innerHTML = "";
  correctionText.innerHTML = "";
  flipCard.classList.remove("flipped");

  questionIndex.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  updateProgressBar();

  const type = q.type || "qcm";

  if (type === "vrai_faux") {
    createVraiFauxButtons(q);
  } else if (type === "multi") {
    createMultiChoiceButtons(q);
  } else if (type === "trou") {
    createTrouQuestion(q);
  } else {
    createQCMButtons(q);
  }
}

function createQCMButtons(q) {
  q.choix.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn fade-in";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      handleAnswer([index], q);
    });
    choicesContainer.appendChild(btn);
  });
}

function createVraiFauxButtons(q) {
  ["Vrai", "Faux"].forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn fade-in";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      const isTrue = idx === 0;
      const correct = q.vrai_faux === isTrue;
      handleAnswer([], q, correct);
    });
    choicesContainer.appendChild(btn);
  });
}

function createMultiChoiceButtons(q) {
  const selected = new Set();
  q.choix.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn fade-in";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      if (selected.has(index)) {
        selected.delete(index);
        btn.classList.remove("selected");
      } else {
        selected.add(index);
        btn.classList.add("selected");
      }
    });
    choicesContainer.appendChild(btn);
  });

  const validateBtn = document.createElement("button");
  validateBtn.className = "choice-btn validate-btn";
  validateBtn.textContent = "Valider";
  validateBtn.addEventListener("click", () => {
    handleAnswer([...selected], q);
  });
  choicesContainer.appendChild(validateBtn);
}

function createTrouQuestion(q) {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "choice-input";
  input.placeholder = "Réponse (tu verras la correction derrière)";
  choicesContainer.appendChild(input);

  const validateBtn = document.createElement("button");
  validateBtn.className = "choice-btn validate-btn";
  validateBtn.textContent = "Afficher la correction";
  validateBtn.addEventListener("click", () => {
    handleAnswer([], q, null);
  });
  choicesContainer.appendChild(validateBtn);
}

function handleAnswer(indicesChoisis, question, forcedCorrect = null) {
  const type = question.type || "qcm";
  let isCorrect;

  if (mode === "learning" && type === "trou") {
    isCorrect = false;
  } else if (forcedCorrect !== null) {
    isCorrect = forcedCorrect;
  } else if (type === "multi") {
    const correctSet = new Set(question.reponses_multiples || []);
    const chosenSet = new Set(indicesChoisis);
    isCorrect =
      correctSet.size === chosenSet.size &&
      [...correctSet].every(i => chosenSet.has(i));
  } else {
    isCorrect = indicesChoisis[0] === question.reponse;
  }

  if (mode !== "learning") {
    if (isCorrect) {
      combo++;
      score += 10;
      if (combo >= 3) score += 5;
    } else {
      combo = 0;
    }
    updateScoreUI();
    updateComboUI();
    updateLevel();
  }

  showCorrection(isCorrect, question);
}

function showCorrection(isCorrect, question) {
  let html = "";

  if (question.type !== "trou") {
    html += `<strong>${isCorrect ? "Bonne réponse !" : "Mauvaise réponse."}</strong><br><br>`;
  }

  if (question.type === "multi" && question.reponses_multiples) {
    const bonnes = question.reponses_multiples.map(i => question.choix[i]).join(", ");
    html += `Réponses correctes : <strong>${bonnes}</strong><br>`;
  } else if (typeof question.reponse === "number" && question.choix) {
    html += `Réponse correcte : <strong>${question.choix[question.reponse]}</strong><br>`;
  }

  if (question.explication) {
    html += `<br>${question.explication}`;
  }

  correctionText.innerHTML = html;
  flipCard.classList.add("flipped");
}

/* ========== SCORE / COMBO / NIVEAU ========== */

function updateScoreUI() {
  if (scoreInfo) scoreInfo.textContent = `Score : ${score}`;
}

function updateComboUI() {
  if (!comboInfo) return;
  if (combo >= 2) comboInfo.textContent = `Combo x${combo}`;
  else comboInfo.textContent = "";
}

function updateLevel() {
  const old = level;
  if (score < 200) level = "Débutant";
  else if (score < 600) level = "Confirmé";
  else if (score < 1500) level = "Expert";
  else level = "Maître";

  if (levelInfo) levelInfo.textContent = `Niveau : ${level}`;
  if (old !== level) {
    // petite animation possible
  }
}

/* ========== PROGRESS BAR ========== */

function updateProgressBar() {
  if (!progressBar || !questions.length) return;
  const ratio = (currentQuestionIndex + 1) / questions.length;
  progressBar.style.width = `${ratio * 100}%`;
}

/* ========== EXAM TIMER ========== */

function startExamTimer() {
  if (!timerEl || !timerValueEl) return;
  examTimeLeft = 20 * 60;
  timerEl.classList.remove("hidden");
  updateTimerDisplay();
  examTimer = setInterval(() => {
    examTimeLeft--;
    if (examTimeLeft <= 0) {
      stopExamTimer();
      showFinalScore(true);
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function stopExamTimer() {
  if (examTimer) {
    clearInterval(examTimer);
    examTimer = null;
  }
}

function updateTimerDisplay() {
  const min = Math.floor(examTimeLeft / 60);
  const sec = examTimeLeft % 60;
  timerValueEl.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/* ========== NEXT QUESTION / SCORE FINAL ========== */

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showFinalScore(false);
    }
  });
}

function showFinalScore(timeOver) {
  flipCard.classList.remove("flipped");
  stopExamTimer();

  questionText.textContent = timeOver ? "Temps écoulé !" : "Quiz terminé !";
  choicesContainer.innerHTML = "";

  const maxScore = questions.length * 10 + Math.max(0, questions.length - 2) * 5;
  correctionText.innerHTML = `
    Score final : <strong>${score}</strong><br>
    Niveau atteint : <strong>${level}</strong>
  `;

  nextQuestionBtn.textContent = "Retour aux chapitres";
  nextQuestionBtn.onclick = () => {
    const matiere = getQueryParam("matiere");
    document.body.classList.add("page-transition");
    setTimeout(() => {
      window.location.href = `matiere.html?matiere=${matiere}`;
    }, 180);
  };

  flipCard.classList.add("flipped");
}
