// ------------------------------
// Données : thèmes, difficultés, questions (niveau Première Générale)
// ------------------------------
const questionsData = {
  "Mathématiques": {
    facile: [
      {
        question: "Quelle est la dérivée de f(x) = x² ?",
        choices: ["x", "2x", "x³", "2"],
        answer: 1,
        explanation: "La dérivée de x² est 2x."
      },
      {
        question: "La fonction f(x) = 3x + 2 est :",
        choices: ["quadratique", "affine", "constante", "exponentielle"],
        answer: 1,
        explanation: "Une fonction de la forme ax + b est une fonction affine."
      },
      {
        question: "La solution de l’équation 2x = 10 est :",
        choices: ["x = 5", "x = 8", "x = 12", "x = 20"],
        answer: 0,
        explanation: "2x = 10 ⇒ x = 5."
      }
    ],
    moyen: [
      {
        question: "L’équation x² - 5x + 6 = 0 a pour solutions :",
        choices: ["x = 2 et x = 3", "x = -2 et x = -3", "x = 1 et x = 6", "x = 0 et x = 6"],
        answer: 0,
        explanation: "On factorise : x² - 5x + 6 = (x - 2)(x - 3)."
      },
      {
        question: "Si f est croissante sur un intervalle, alors :",
        choices: [
          "f(x1) < f(x2) quand x1 < x2",
          "f(x1) > f(x2) quand x1 < x2",
          "f(x1) = f(x2) pour tout x",
          "f n’a pas de variation"
        ],
        answer: 0,
        explanation: "Croissante signifie que f(x1) ≤ f(x2) si x1 ≤ x2."
      },
      {
        question: "La probabilité d’obtenir pile avec une pièce équilibrée est :",
        choices: ["1/4", "1/2", "1/3", "1"],
        answer: 1,
        explanation: "Deux issues équiprobables : pile ou face, donc 1/2."
      }
    ],
    difficile: [
      {
        question: "La dérivée de f(x) = 3x³ - x est :",
        choices: ["9x² - 1", "9x² - x", "3x² - 1", "x³ - 1"],
        answer: 0,
        explanation: "Dérivée de 3x³ : 9x², dérivée de -x : -1."
      },
      {
        question: "Une suite arithmétique (un) de premier terme u0 = 2 et de raison r = 3 vérifie :",
        choices: ["u3 = 5", "u3 = 8", "u3 = 11", "u3 = 2 + 3n"],
        answer: 2,
        explanation: "u3 = u0 + 3r = 2 + 3×3 = 11."
      },
      {
        question: "Si P(A) = 0,3 et P(B) = 0,5 et A et B sont indépendants, alors P(A ∩ B) =",
        choices: ["0,15", "0,8", "0,2", "0,35"],
        answer: 0,
        explanation: "Indépendance : P(A ∩ B) = P(A) × P(B) = 0,3 × 0,5 = 0,15."
      }
    ]
  },

  "Physique-Chimie": {
    facile: [
      {
        question: "L’unité de la tension électrique est :",
        choices: ["le watt", "le volt", "l’ampère", "le joule"],
        answer: 1,
        explanation: "La tension se mesure en volts (V)."
      },
      {
        question: "La lumière se propage :",
        choices: ["seulement dans l’air", "seulement dans le vide", "dans le vide et certains milieux matériels", "uniquement dans l’eau"],
        answer: 2,
        explanation: "La lumière se propage dans le vide et dans des milieux transparents."
      },
      {
        question: "La formule de l’eau est :",
        choices: ["CO₂", "H₂O", "O₂", "NaCl"],
        answer: 1,
        explanation: "L’eau est composée de deux atomes d’hydrogène et un d’oxygène."
      }
    ],
    moyen: [
      {
        question: "La vitesse se calcule par :",
        choices: ["v = d × t", "v = d / t", "v = t / d", "v = d + t"],
        answer: 1,
        explanation: "vitesse = distance / temps."
      },
      {
        question: "Une molécule contient :",
        choices: ["un seul atome", "plusieurs atomes liés entre eux", "uniquement des ions", "uniquement des protons"],
        answer: 1,
        explanation: "Une molécule est un assemblage d’atomes."
      },
      {
        question: "Une réaction acide-base met en jeu :",
        choices: ["un transfert d’électrons", "un transfert de protons H⁺", "un changement d’état", "une fission nucléaire"],
        answer: 1,
        explanation: "Une réaction acide-base implique un transfert de protons H⁺."
      }
    ],
    difficile: [
      {
        question: "L’énergie cinétique d’un objet de masse m et de vitesse v est :",
        choices: ["Ec = m × v", "Ec = 1/2 m v²", "Ec = m / v²", "Ec = m × g × h"],
        answer: 1,
        explanation: "Ec = 1/2 m v²."
      },
      {
        question: "La concentration molaire c d’une solution est définie par :",
        choices: ["c = n / V", "c = V / n", "c = m / V", "c = n × V"],
        answer: 0,
        explanation: "c = n (quantité de matière) / V (volume)."
      },
      {
        question: "Une onde sonore est :",
        choices: ["une onde électromagnétique", "une onde mécanique longitudinale", "une onde mécanique transversale", "une onde stationnaire uniquement"],
        answer: 1,
        explanation: "Le son est une onde mécanique longitudinale."
      }
    ]
  },

  "SES": {
    facile: [
      {
        question: "Que signifie « PIB » ?",
        choices: [
          "Produit Intérieur Brut",
          "Produit International Brut",
          "Prix Intérieur Brut",
          "Produit Industriel Brut"
        ],
        answer: 0,
        explanation: "PIB = Produit Intérieur Brut."
      },
      {
        question: "L’acteur principal de la consommation est :",
        choices: ["L’État", "Les ménages", "Les entreprises", "Les banques"],
        answer: 1,
        explanation: "Les ménages sont les principaux consommateurs."
      },
      {
        question: "Un bien est dit « rare » quand :",
        choices: [
          "il est gratuit",
          "il est disponible en quantité illimitée",
          "il est disponible en quantité limitée",
          "il est interdit"
        ],
        answer: 2,
        explanation: "La rareté signifie que les ressources sont limitées."
      }
    ],
    moyen: [
      {
        question: "La socialisation est :",
        choices: [
          "un processus d’apprentissage des normes et valeurs",
          "une activité économique",
          "une forme de chômage",
          "un type de marché"
        ],
        answer: 0,
        explanation: "La socialisation transmet normes et valeurs d’une société."
      },
      {
        question: "Une entreprise produit :",
        choices: [
          "uniquement des biens",
          "uniquement des services",
          "des biens et/ou des services",
          "uniquement pour l’exportation"
        ],
        answer: 2,
        explanation: "Une entreprise peut produire des biens et/ou des services."
      },
      {
        question: "La croissance économique se mesure principalement par :",
        choices: ["le taux de chômage", "l’inflation", "la variation du PIB", "le déficit public"],
        answer: 2,
        explanation: "On mesure la croissance par l’évolution du PIB."
      }
    ],
    difficile: [
      {
        question: "Comment appelle-t-on une hausse générale et durable des prix ?",
        choices: ["Déflation", "Inflation", "Stagnation", "Récession"],
        answer: 1,
        explanation: "L’inflation est une hausse générale et durable des prix."
      },
      {
        question: "La stratification sociale désigne :",
        choices: [
          "la répartition des individus en groupes sociaux hiérarchisés",
          "la mobilité géographique",
          "la répartition des revenus uniquement",
          "la structure de l’entreprise"
        ],
        answer: 0,
        explanation: "La stratification sociale classe les individus en groupes hiérarchisés."
      },
      {
        question: "Le chômage structurel est lié :",
        choices: [
          "à une baisse temporaire de la demande",
          "à des rigidités du marché du travail",
          "à une crise sanitaire",
          "à une erreur de mesure"
        ],
        answer: 1,
        explanation: "Le chômage structurel vient de rigidités durables du marché du travail."
      }
    ]
  },

  "SVT": {
    facile: [
      {
        question: "L’unité de base du vivant est :",
        choices: ["L’atome", "La cellule", "Le tissu", "L’organe"],
        answer: 1,
        explanation: "La cellule est l’unité de base du vivant."
      },
      {
        question: "Le support de l’information génétique est :",
        choices: ["L’ARN", "L’ADN", "Les protéines", "Les lipides"],
        answer: 1,
        explanation: "L’ADN porte l’information génétique."
      },
      {
        question: "Les globules blancs interviennent dans :",
        choices: ["la respiration", "la digestion", "l’immunité", "la reproduction"],
        answer: 2,
        explanation: "Les globules blancs participent à la défense immunitaire."
      }
    ],
    moyen: [
      {
        question: "Un allèle est :",
        choices: [
          "une version d’un gène",
          "un type de cellule",
          "une molécule d’ADN entière",
          "un organe"
        ],
        answer: 0,
        explanation: "Un allèle est une version possible d’un gène."
      },
      {
        question: "La synapse est :",
        choices: [
          "une cellule musculaire",
          "la zone de contact entre deux neurones",
          "une hormone",
          "un type de globule blanc"
        ],
        answer: 1,
        explanation: "La synapse permet la transmission du message nerveux."
      },
      {
        question: "La mitose permet :",
        choices: [
          "la formation de gamètes",
          "la division d’une cellule en deux cellules identiques",
          "la fécondation",
          "la production d’anticorps"
        ],
        answer: 1,
        explanation: "La mitose produit deux cellules filles identiques à la cellule mère."
      }
    ],
    difficile: [
      {
        question: "Une mutation génétique est :",
        choices: [
          "une modification de la séquence de l’ADN",
          "un changement de groupe sanguin",
          "une division cellulaire",
          "une infection virale"
        ],
        answer: 0,
        explanation: "Une mutation est une modification de la séquence nucléotidique."
      },
      {
        question: "Le système immunitaire adaptatif se caractérise par :",
        choices: [
          "une réponse rapide mais peu spécifique",
          "une réponse lente et spécifique",
          "une absence de mémoire",
          "une action uniquement locale"
        ],
        answer: 1,
        explanation: "L’immunité adaptative est spécifique et possède une mémoire."
      },
      {
        question: "La tectonique des plaques explique :",
        choices: [
          "la circulation sanguine",
          "la formation des continents et des océans",
          "la reproduction des espèces",
          "la photosynthèse"
        ],
        answer: 1,
        explanation: "La tectonique des plaques décrit les mouvements des plaques lithosphériques."
      }
    ]
  },

  "Histoire-Géo": {
    facile: [
      {
        question: "La Première Guerre mondiale commence en :",
        choices: ["1914", "1918", "1939", "1945"],
        answer: 0,
        explanation: "La Première Guerre mondiale débute en 1914."
      },
      {
        question: "La capitale de l’Italie est :",
        choices: ["Milan", "Rome", "Naples", "Turin"],
        answer: 1,
        explanation: "La capitale de l’Italie est Rome."
      },
      {
        question: "La France est située sur le continent :",
        choices: ["Asiatique", "Africain", "Européen", "Américain"],
        answer: 2,
        explanation: "La France se situe en Europe."
      }
    ],
    moyen: [
      {
        question: "Quel régime politique s’installe en URSS sous Staline ?",
        choices: ["Démocratie libérale", "Régime totalitaire", "Monarchie parlementaire", "Dictature militaire sans parti"],
        answer: 1,
        explanation: "L’URSS de Staline est un régime totalitaire."
      },
      {
        question: "La décolonisation désigne :",
        choices: [
          "la conquête de nouveaux territoires",
          "l’indépendance progressive des colonies",
          "la création de nouvelles colonies",
          "la fin des guerres mondiales"
        ],
        answer: 1,
        explanation: "La décolonisation est le processus d’accession à l’indépendance des colonies."
      },
      {
        question: "La mondialisation correspond à :",
        choices: [
          "la fermeture des frontières",
          "l’augmentation des échanges à l’échelle mondiale",
          "la disparition des États",
          "la fin des échanges commerciaux"
        ],
        answer: 1,
        explanation: "La mondialisation intensifie les échanges à l’échelle mondiale."
      }
    ],
    difficile: [
      {
        question: "Quel événement marque la fin de la Seconde Guerre mondiale en Europe ?",
        choices: [
          "La bataille de Stalingrad",
          "Le débarquement en Normandie",
          "La capitulation allemande",
          "La conférence de Yalta"
        ],
        answer: 2,
        explanation: "La capitulation allemande en mai 1945 marque la fin de la guerre en Europe."
      },
      {
        question: "Un territoire ultramarin français est :",
        choices: ["La Bretagne", "La Corse", "La Guadeloupe", "La Normandie"],
        answer: 2,
        explanation: "La Guadeloupe est un département et région d’outre-mer."
      },
      {
        question: "Un enjeu géopolitique majeur actuel est :",
        choices: [
          "la conquête de l’Ouest américain",
          "la gestion des ressources naturelles",
          "la colonisation de l’Afrique",
          "la fin de l’ONU"
        ],
        answer: 1,
        explanation: "Les ressources (eau, énergie, minerais) sont au cœur de nombreux enjeux géopolitiques."
      }
    ]
  },

  "Français": {
    facile: [
      {
        question: "Quel est le genre du texte qui raconte une histoire ?",
        choices: ["Argumentatif", "Narratif", "Descriptif", "Informatif"],
        answer: 1,
        explanation: "Un texte narratif raconte une histoire."
      },
      {
        question: "Quel est le registre dominant d’un texte qui cherche à faire rire ?",
        choices: ["Lyrique", "Comique", "Tragique", "Épique"],
        answer: 1,
        explanation: "Le registre comique vise à faire rire."
      },
      {
        question: "Quel est le type de phrase : « Il pleut. » ?",
        choices: ["Interrogative", "Exclamative", "Déclarative", "Injonctive"],
        answer: 2,
        explanation: "C’est une phrase déclarative."
      }
    ],
    moyen: [
      {
        question: "Quel mouvement littéraire du XIXᵉ siècle décrit la société de manière objective ?",
        choices: ["Classicisme", "Romantisme", "Réalisme", "Humanisme"],
        answer: 2,
        explanation: "Le réalisme décrit la société et ses inégalités."
      },
      {
        question: "Quelle figure de style consiste à exagérer fortement une idée ?",
        choices: ["Litote", "Hyperbole", "Métaphore", "Antithèse"],
        answer: 1,
        explanation: "L’hyperbole amplifie une idée."
      },
      {
        question: "Dans un commentaire, la première étape est :",
        choices: [
          "La conclusion",
          "L’annonce du plan",
          "L’introduction et la présentation du texte",
          "L’analyse ligne par ligne"
        ],
        answer: 2,
        explanation: "On commence par une introduction qui présente le texte."
      }
    ],
    difficile: [
      {
        question: "Quel mouvement littéraire valorise l’expression du moi et les sentiments ?",
        choices: ["Romantisme", "Symbolisme", "Surréalisme", "Baroque"],
        answer: 0,
        explanation: "Le romantisme met en avant le moi et les émotions."
      },
      {
        question: "Quelle figure de style rapproche deux éléments sans outil de comparaison ?",
        choices: ["Comparaison", "Métaphore", "Personnification", "Périphrase"],
        answer: 1,
        explanation: "La métaphore est une comparaison implicite."
      },
      {
        question: "Dans une dissertation, la conclusion doit :",
        choices: [
          "poser une nouvelle problématique",
          "répondre clairement à la problématique et ouvrir la réflexion",
          "répéter l’introduction",
          "ajouter de nouveaux arguments"
        ],
        answer: 1,
        explanation: "La conclusion répond à la problématique et peut proposer une ouverture."
      }
    ]
  },

  "Culture générale": {
    facile: [
      {
        question: "Quel est le plus grand océan du monde ?",
        choices: ["Atlantique", "Pacifique", "Indien", "Arctique"],
        answer: 1,
        explanation: "L’océan Pacifique est le plus vaste."
      },
      {
        question: "Qui a peint la Joconde ?",
        choices: ["Michel-Ange", "Raphaël", "Léonard de Vinci", "Rembrandt"],
        answer: 2,
        explanation: "La Joconde est une œuvre de Léonard de Vinci."
      },
      {
        question: "Berlin est la capitale de :",
        choices: ["L’Autriche", "La Suisse", "L’Allemagne", "Les Pays-Bas"],
        answer: 2,
        explanation: "Berlin est la capitale de l’Allemagne."
      }
    ],
    moyen: [
      {
        question: "Quel organisme international a pour mission principale le maintien de la paix ?",
        choices: ["OTAN", "ONU", "UE", "UNESCO"],
        answer: 1,
        explanation: "L’ONU a pour objectif principal le maintien de la paix."
      },
      {
        question: "Quel scientifique a proposé la théorie de la relativité restreinte ?",
        choices: ["Isaac Newton", "Albert Einstein", "Galilée", "Marie Curie"],
        answer: 1,
        explanation: "Albert Einstein a développé la théorie de la relativité."
      },
      {
        question: "Quel courant artistique est associé à Picasso ?",
        choices: ["Impressionnisme", "Cubisme", "Surréalisme", "Romantisme"],
        answer: 1,
        explanation: "Picasso est une figure majeure du cubisme."
      }
    ],
    difficile: [
      {
        question: "Quel philosophe a écrit « Le contrat social » ?",
        choices: ["Voltaire", "Rousseau", "Montesquieu", "Descartes"],
        answer: 1,
        explanation: "Jean-Jacques Rousseau est l’auteur du Contrat social."
      },
      {
        question: "Quel événement symbolise le début de la Révolution française ?",
        choices: [
          "La fuite à Varennes",
          "La prise de la Bastille",
          "La Terreur",
          "Le sacre de Napoléon"
        ],
        answer: 1,
        explanation: "La prise de la Bastille, le 14 juillet 1789, est un symbole fort."
      },
      {
        question: "Le rôle principal d’une constitution est de :",
        choices: [
          "fixer les impôts",
          "organiser les pouvoirs publics et garantir les droits fondamentaux",
          "gérer le budget de l’État",
          "définir la politique étrangère"
        ],
        answer: 1,
        explanation: "La constitution organise les pouvoirs et garantit les droits."
      }
    ]
  },

  "Informatique": {
    facile: [
      {
        question: "Que signifie « HTML » ?",
        choices: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        answer: 0,
        explanation: "HTML est le langage de structure des pages web."
      },
      {
        question: "Quel est le rôle principal d’un navigateur web ?",
        choices: [
          "Compiler du code",
          "Afficher des pages web",
          "Gérer le système d’exploitation",
          "Stocker des bases de données"
        ],
        answer: 1,
        explanation: "Le navigateur affiche et interprète les pages web."
      },
      {
        question: "Que signifie « URL » ?",
        choices: [
          "Universal Resource Locator",
          "Uniform Resource Locator",
          "Unified Resource Link",
          "Universal Reference Link"
        ],
        answer: 1,
        explanation: "URL signifie Uniform Resource Locator."
      }
    ],
    moyen: [
      {
        question: "En Python, que renvoie l’expression 3 * (2 + 1) ?",
        choices: ["5", "6", "9", "3"],
        answer: 2,
        explanation: "3 * (2 + 1) = 3 * 3 = 9."
      },
      {
        question: "Un algorithme est :",
        choices: [
          "un langage de programmation",
          "une suite d’instructions pour résoudre un problème",
          "un type de mémoire",
          "un composant matériel"
        ],
        answer: 1,
        explanation: "Un algorithme décrit une suite d’actions à effectuer."
      },
      {
        question: "Dans un réseau, une adresse IP sert à :",
        choices: [
          "identifier une machine sur le réseau",
          "stocker des fichiers",
          "afficher une page web",
          "chiffrer les données"
        ],
        answer: 0,
        explanation: "L’adresse IP identifie une machine sur un réseau."
      }
    ],
    difficile: [
      {
        question: "En Python, une liste [1, 2, 3] est :",
        choices: [
          "un type immuable",
          "un type mutable",
          "une chaîne de caractères",
          "un dictionnaire"
        ],
        answer: 1,
        explanation: "Les listes Python sont des types mutables."
      },
      {
        question: "Le protocole HTTP sert à :",
        choices: [
          "transférer des pages web",
          "envoyer des emails",
          "gérer les adresses IP",
          "chiffrer les disques durs"
        ],
        answer: 0,
        explanation: "HTTP est le protocole de transfert des pages web."
      },
      {
        question: "En SNT, une donnée personnelle est :",
        choices: [
          "une donnée publique",
          "une information permettant d’identifier une personne",
          "une information uniquement financière",
          "une donnée toujours anonyme"
        ],
        answer: 1,
        explanation: "Une donnée personnelle permet d’identifier directement ou indirectement une personne."
      }
    ]
  }
};

// ------------------------------
// État de l’application
// ------------------------------
let selectedTheme = null;
let selectedDifficulty = null;
let currentQuestions = [];
let currentIndex = 0;
let currentScore = 0;
let lastThemeForRetry = null;

const PROGRESS_KEY = "quiz_etudiant_progress";

function loadProgress() {
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) {
    return { quizzesDone: 0, bestScore: 0, totalScore: 0 };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { quizzesDone: 0, bestScore: 0, totalScore: 0 };
  }
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// ------------------------------
// Navigation entre écrans
// ------------------------------
const screens = {
  home: document.getElementById("screen-home"),
  setup: document.getElementById("screen-setup"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result"),
  stats: document.getElementById("screen-stats")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ------------------------------
// Thèmes & difficultés
// ------------------------------
const themeListEl = document.getElementById("themeList");
const launchQuizBtn = document.getElementById("launchQuizBtn");

function renderThemes() {
  themeListEl.innerHTML = "";
  Object.keys(questionsData).forEach(theme => {
    const div = document.createElement("div");
    div.className = "theme-card";
    div.textContent = theme;
    div.dataset.theme = theme;
    div.addEventListener("click", () => {
      selectedTheme = theme;
      document
        .querySelectorAll(".theme-card")
        .forEach(el => el.classList.remove("selected"));
      div.classList.add("selected");
      updateLaunchButtonState();
    });
    themeListEl.appendChild(div);
  });
}

function updateLaunchButtonState() {
  launchQuizBtn.disabled = !(selectedTheme && selectedDifficulty);
}

document.querySelectorAll(".difficulty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedDifficulty = btn.dataset.diff;
    document
      .querySelectorAll(".difficulty-btn")
      .forEach(el => el.classList.remove("selected"));
    btn.classList.add("selected");
    updateLaunchButtonState();
  });
});

// ------------------------------
// Quiz
// ------------------------------
const quizThemeEl = document.getElementById("quizTheme");
const quizDifficultyEl = document.getElementById("quizDifficulty");
const quizProgressEl = document.getElementById("quizProgress");
const questionTextEl = document.getElementById("questionText");
const choicesContainerEl = document.getElementById("choicesContainer");
const validateBtn = document.getElementById("validateBtn");
const feedbackEl = document.getElementById("feedback");

let selectedChoiceIndex = null;

function startQuiz() {
  if (!selectedTheme || !selectedDifficulty) return;

  const themeData = questionsData[selectedTheme];
  const diffKey = selectedDifficulty; // "facile" / "moyen" / "difficile"
  const pool = themeData[diffKey] || [];

  // On mélange et on prend jusqu'à 10 questions (ou moins si pas assez)
  currentQuestions = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
  currentIndex = 0;
  currentScore = 0;
  lastThemeForRetry = selectedTheme;

  quizThemeEl.textContent = selectedTheme;
  quizDifficultyEl.textContent = `Difficulté : ${selectedDifficulty}`;
  showScreen("quiz");
  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const q = currentQuestions[currentIndex];
  if (!q) {
    endQuiz();
    return;
  }

  quizProgressEl.textContent = `Question ${currentIndex + 1} / ${currentQuestions.length}`;
  questionTextEl.textContent = q.question;
  choicesContainerEl.innerHTML = "";
  feedbackEl.textContent = "";
  selectedChoiceIndex = null;
  validateBtn.disabled = true;

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      selectedChoiceIndex = index;
      document
        .querySelectorAll(".choice-btn")
        .forEach(el => el.classList.remove("selected"));
      btn.classList.add("selected");
      validateBtn.disabled = false;
    });
    choicesContainerEl.appendChild(btn);
  });
}

validateBtn.addEventListener("click", () => {
  const q = currentQuestions[currentIndex];
  if (selectedChoiceIndex === null) return;

  const isCorrect = selectedChoiceIndex === q.answer;
  if (isCorrect) {
    currentScore++;
    feedbackEl.textContent = "Bonne réponse ! " + (q.explanation || "");
  } else {
    const correctText = q.choices[q.answer];
    feedbackEl.textContent =
      `Mauvaise réponse. La bonne réponse était : "${correctText}". ` +
      (q.explanation || "");
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex >= currentQuestions.length) {
      endQuiz();
    } else {
      renderCurrentQuestion();
    }
  }, 1200);
});

// ------------------------------
// Résultats & progression
// ------------------------------
const finalScoreEl = document.getElementById("finalScore");
const finalPercentEl = document.getElementById("finalPercent");
const finalMessageEl = document.getElementById("finalMessage");

function endQuiz() {
  const total = currentQuestions.length || 10;
  const percent = Math.round((currentScore / total) * 100);

  finalScoreEl.textContent = `Score : ${currentScore} / ${total}`;
  finalPercentEl.textContent = `Soit ${percent}%`;

  let message = "";
  if (percent >= 80) {
    message = "Excellent travail, continue comme ça !";
  } else if (percent >= 50) {
    message = "Bon résultat, tu es sur la bonne voie.";
  } else {
    message = "Continue à t’entraîner, tu vas progresser !";
  }
  finalMessageEl.textContent = message;

  const progress = loadProgress();
  progress.quizzesDone += 1;
  progress.totalScore += percent;
  if (percent > progress.bestScore) {
    progress.bestScore = percent;
  }
  saveProgress(progress);

  updateStatsScreen();
  showScreen("result");
}

function updateStatsScreen() {
  const progress = loadProgress();
  const statQuizzesEl = document.getElementById("statQuizzes");
  const statBestEl = document.getElementById("statBest");
  const statAverageEl = document.getElementById("statAverage");

  statQuizzesEl.textContent = progress.quizzesDone;
  statBestEl.textContent = `${progress.bestScore} / 100`;
  const avg =
    progress.quizzesDone === 0
      ? 0
      : Math.round(progress.totalScore / progress.quizzesDone);
  statAverageEl.textContent = `${avg}%`;
}

// ------------------------------
// Navigation boutons
// ------------------------------
document.getElementById("startBtn").addEventListener("click", () => {
  showScreen("setup");
});

launchQuizBtn.addEventListener("click", () => {
  startQuiz();
});

document.getElementById("retryBtn").addEventListener("click", () => {
  if (!lastThemeForRetry) {
    showScreen("setup");
    return;
  }
  startQuiz();
});

document.getElementById("changeThemeBtn").addEventListener("click", () => {
  showScreen("setup");
});

document.querySelectorAll("[data-screen]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-screen");
    if (target === "stats") {
      updateStatsScreen();
    }
    showScreen(target);
  });
});

// ------------------------------
// Mode sombre
// ------------------------------
const toggleBtn = document.getElementById("toggleTheme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("quiz_theme");

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark");
  if (toggleBtn) toggleBtn.textContent = "☀️";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("quiz_theme", isDark ? "dark" : "light");
  });
}

// ------------------------------
// Initialisation
// ------------------------------
renderThemes();
updateStatsScreen();
showScreen("home");
