/* ========== THEME ========== */
(function () {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.add(saved || (prefersDark ? "dark" : "light"));
})();

window.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      document.body.classList.toggle("dark", !isDark);
      document.body.classList.toggle("light", isDark);
      localStorage.setItem("theme", isDark ? "light" : "dark");
    });
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("page-transition");
  document.body.classList.add("page-loaded");
});

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function navigate(url) {
  document.body.classList.add("page-transition");
  document.body.classList.remove("page-loaded");
  setTimeout(() => { window.location.href = url; }, 160);
}

const MATIERE_CONFIG = {
  maths:       { icon: "📐", label: "Maths" },
  physique:    { icon: "⚛️", label: "Physique" },
  ses:         { icon: "📊", label: "SES" },
  svt:         { icon: "🧬", label: "SVT" },
  histoiregeo: { icon: "🌍", label: "Histoire-Géo" },
  francais:    { icon: "📖", label: "Français" },
  culture:     { icon: "🧠", label: "Culture G." },
  info:        { icon: "💻", label: "Informatique" }
};

function applyMatiereTheme(matiereKey) {
  const conf = MATIERE_CONFIG[matiereKey];
  if (!conf) return;
  const iconSpan = document.getElementById("matiereIcon");
  const nameSpan = document.getElementById("matiereName");
  if (iconSpan) iconSpan.textContent = conf.icon;
  if (nameSpan) nameSpan.textContent = conf.label;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.querySelectorAll(".matiere-card, .m-card").forEach(btn => {
  btn.addEventListener("click", () => {
    navigate(`matiere.html?matiere=${btn.dataset.matiere}`);
  });
});

const chapList = document.getElementById("chapList");
if (chapList) {
  const matiere = getQueryParam("matiere");
  applyMatiereTheme(matiere);
  const backHome = document.getElementById("backHome");
  if (backHome) backHome.addEventListener("click", () => navigate("index.html"));
  const matiereTitre = document.getElementById("matiereTitre");
  fetch(`data/${matiere}.json`)
    .then(r => r.json())
    .then(data => {
      if (matiereTitre) matiereTitre.textContent = data.matiere;
      data.chapitres.forEach((chap, i) => {
        const card = document.createElement("button");
        card.className = "chap-card fade-in";
        card.style.animationDelay = `${i * 0.06}s`;
        card.style.opacity = "0";
        card.textContent = chap.titre;
        card.addEventListener("click", () => navigate(`quiz.html?matiere=${matiere}&chapitre=${chap.id}`));
        chapList.appendChild(card);
      });
    })
    .catch(() => { if (matiereTitre) matiereTitre.textContent = "Matière introuvable"; });
}

let allQuestions = [], questions = [];
let currentQuestionIndex = 0, score = 0, combo = 0, level = "Débutant", mode = "normal";
let examTimer = null, examTimeLeft = 20 * 60;

const questionText     = document.getElementById("questionText");
const choicesContainer = document.getElementById("choicesContainer");
const correctionText   = document.getElementById("correctionText");
const nextQuestionBtn  = document.getElementById("nextQuestionBtn");
const questionIndex    = document.getElementById("questionIndex");
const scoreInfo        = document.getElementById("scoreInfo");
const comboInfo        = document.getElementById("comboInfo");
const levelInfo        = document.getElementById("levelInfo");
const progressBar      = document.getElementById("progressBar");
const flipCard         = document.querySelector(".flip-card");
const timerEl          = document.getElementById("timer");
const timerValueEl     = document.getElementById("timerValue");

if (questionText) {
  const matiere  = getQueryParam("matiere");
  const chapitre = getQueryParam("chapitre");
  applyMatiereTheme(matiere);
  const backToChapters = document.getElementById("backToChapters");
  if (backToChapters) backToChapters.addEventListener("click", () => navigate(`matiere.html?matiere=${matiere}`));
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
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
      if (!chap) return;
      const chapTitre = document.getElementById("chapTitre");
      if (chapTitre) chapTitre.textContent = chap.titre;
      allQuestions = chap.questions;
      prepareQuestions();
    });
}

function resetQuizState() {
  score = 0; combo = 0; currentQuestionIndex = 0;
  updateScoreUI(); updateComboUI(); updateLevel();
  stopExamTimer();
  if (timerEl) timerEl.classList.add("hidden");
}

function prepareQuestions() {
  if (!allQuestions.length) return;
  if (mode === "normal" || mode === "learning") questions = [...allQuestions];
  else if (mode === "random") questions = shuffleArray([...allQuestions]);
  else if (mode === "exam") { questions = shuffleArray([...allQuestions]).slice(0, 20); startExamTimer(); }
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  if (!q) return;
  questionText.textContent = q.question;
  choicesContainer.innerHTML = "";
  correctionText.innerHTML = "";
  flipCard.classList.remove("flipped");
  if (questionIndex) questionIndex.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
  updateProgressBar();
  const type = q.type || "qcm";
  if (type === "vrai_faux") createVraiFauxButtons(q);
  else if (type === "multi") createMultiChoiceButtons(q);
  else if (type === "trou") createTrouQuestion(q);
  else createQCMButtons(q);
}

function createQCMButtons(q) {
  q.choix.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn fade-in";
    btn.style.animationDelay = `${index * 0.05}s`;
    btn.style.opacity = "0";
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer([index], q));
    choicesContainer.appendChild(btn);
  });
}

function createVraiFauxButtons(q) {
  ["Vrai", "Faux"].forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn fade-in";
    btn.textContent = label;
    btn.addEventListener("click", () => handleAnswer([], q, q.vrai_faux === (idx === 0)));
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
      selected.has(index) ? selected.delete(index) : selected.add(index);
      btn.classList.toggle("selected", selected.has(index));
    });
    choicesContainer.appendChild(btn);
  });
  const vBtn = document.createElement("button");
  vBtn.className = "choice-btn validate-btn";
  vBtn.textContent = "Valider";
  vBtn.addEventListener("click", () => handleAnswer([...selected], q));
  choicesContainer.appendChild(vBtn);
}

function createTrouQuestion(q) {
  const input = document.createElement("input");
  input.type = "text"; input.className = "choice-input"; input.placeholder = "Ta réponse…";
  choicesContainer.appendChild(input);
  const vBtn = document.createElement("button");
  vBtn.className = "choice-btn validate-btn";
  vBtn.textContent = "Voir la correction";
  vBtn.addEventListener("click", () => handleAnswer([], q, null));
  choicesContainer.appendChild(vBtn);
}

function handleAnswer(indices, question, forcedCorrect = null) {
  const type = question.type || "qcm";
  let isCorrect;
  if (mode === "learning" && type === "trou") isCorrect = false;
  else if (forcedCorrect !== null) isCorrect = forcedCorrect;
  else if (type === "multi") {
    const cs = new Set(question.reponses_multiples || []);
    const ch = new Set(indices);
    isCorrect = cs.size === ch.size && [...cs].every(i => ch.has(i));
  } else isCorrect = indices[0] === question.reponse;
  if (mode !== "learning") {
    if (isCorrect) { combo++; score += 10; if (combo >= 3) score += 5; }
    else combo = 0;
    updateScoreUI(); updateComboUI(); updateLevel();
  }
  showCorrection(isCorrect, question);
}

function showCorrection(isCorrect, question) {
  let html = "";
  if (question.type !== "trou") {
    html += `<strong style="color:${isCorrect ? "var(--green)" : "var(--red)"}">${isCorrect ? "✓ Bonne réponse !" : "✗ Mauvaise réponse."}</strong><br><br>`;
  }
  if (question.type === "multi" && question.reponses_multiples) {
    html += `Réponses : <strong>${question.reponses_multiples.map(i => question.choix[i]).join(", ")}</strong><br>`;
  } else if (typeof question.reponse === "number" && question.choix) {
    html += `Réponse : <strong>${question.choix[question.reponse]}</strong><br>`;
  }
  if (question.explication) html += `<br><span style="opacity:.75;font-weight:600">${question.explication}</span>`;
  correctionText.innerHTML = html;
  flipCard.classList.add("flipped");
}

function updateScoreUI()  { if (scoreInfo) scoreInfo.textContent = `${score} pts`; }
function updateComboUI()  { if (comboInfo) comboInfo.textContent = combo >= 2 ? `🔥 x${combo}` : ""; }
function updateLevel() {
  if (score < 200) level = "Débutant";
  else if (score < 600) level = "Confirmé";
  else if (score < 1500) level = "Expert";
  else level = "Maître";
  if (levelInfo) levelInfo.textContent = level;
}
function updateProgressBar() {
  if (progressBar && questions.length)
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}
function startExamTimer() {
  if (!timerEl || !timerValueEl) return;
  examTimeLeft = 20 * 60; timerEl.classList.remove("hidden"); updateTimerDisplay();
  examTimer = setInterval(() => {
    examTimeLeft--;
    if (examTimeLeft <= 0) { stopExamTimer(); showFinalScore(true); }
    else updateTimerDisplay();
  }, 1000);
}
function stopExamTimer() { if (examTimer) { clearInterval(examTimer); examTimer = null; } }
function updateTimerDisplay() {
  const m = Math.floor(examTimeLeft / 60), s = examTimeLeft % 60;
  timerValueEl.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) loadQuestion();
    else showFinalScore(false);
  });
}
function showFinalScore(timeOver) {
  flipCard.classList.remove("flipped");
  stopExamTimer();
  questionText.textContent = timeOver ? "⏱ Temps écoulé !" : "🎉 Quiz terminé !";
  choicesContainer.innerHTML = "";
  const pct = score / (questions.length * 10);
  correctionText.innerHTML = `
    Score : <strong>${score} pts</strong><br>
    Niveau : <strong>${level}</strong><br><br>
    ${pct >= .8 ? '<span style="color:var(--green)">Excellent ! Tu gères 💪</span>'
      : pct >= .5 ? '<span style="color:var(--amber)">Pas mal, continue ! 📚</span>'
      : '<span style="color:var(--red)">Encore un effort ! 🔄</span>'}
  `;
  nextQuestionBtn.textContent = "← Retour";
  nextQuestionBtn.onclick = () => navigate(`matiere.html?matiere=${getQueryParam("matiere")}`);
  flipCard.classList.add("flipped");
}
