const STORAGE_KEY = "revision-lab-v2";

const DATASETS = [
  {
    id: "houseprice",
    name: "House Price Prediction",
    file: "HousePricePrediction.csv",
    rows: 2919,
    cols: 13,
    task: "Regression",
    target: "SalePrice",
    summary: "Ames-style housing data where only part of the table is labelled with sale prices.",
    exampleRow: {
      Id: "1",
      MSSubClass: "60",
      MSZoning: "RL",
      LotArea: "8450",
      OverallCond: "5",
      TotalBsmtSF: "856",
      SalePrice: "208500"
    },
    stats: [
      "1460 labelled rows",
      "1459 rows with missing SalePrice",
      "Strong signal from basement size and build year"
    ],
    studyPoints: [
      "Do not train on rows where SalePrice is missing.",
      "One-hot encoding is needed for mixed categorical columns.",
      "RMSE and R2 are more appropriate than accuracy."
    ]
  },
  {
    id: "weather",
    name: "Hourly Weather Records",
    file: "Weather-data.csv",
    rows: 8784,
    cols: 8,
    task: "Time Series / Classification / Regression",
    target: "Weather or Temp_C",
    summary: "Hourly weather observations suited to time features, pattern analysis, and prediction.",
    exampleRow: {
      "Date/Time": "1/1/2012 00:00",
      Temp_C: "-1.8",
      "Rel Hum_%": "86",
      "Wind Speed_km/h": "4",
      Visibility_km: "8",
      Press_kPa: "101.24",
      Weather: "Fog"
    },
    stats: [
      "No missing values reported",
      "Good for datetime feature extraction",
      "Supports both label and numeric prediction"
    ],
    studyPoints: [
      "Parse the datetime column before analysis.",
      "Chronology matters for forecasting-style tasks.",
      "Seasonal and hourly patterns are central."
    ]
  },
  {
    id: "electionpoll",
    name: "Election Poll Tracking",
    file: "electionpoll.csv",
    rows: 365,
    cols: 8,
    task: "Time Series / Comparative EDA",
    target: "No fixed target",
    summary: "Daily party support percentages stored in wide format across a single year.",
    exampleRow: {
      "Date \\ Party": "1/1/2019",
      "Alliance Party": "27",
      "Civic Party": "26",
      "Workers' Party": "23",
      "People's Party": "20"
    },
    stats: [
      "One row per day",
      "Naturally suited to line plots and rolling averages",
      "Wide format often needs melting"
    ],
    studyPoints: [
      "Wide-to-long conversion helps grouped analysis.",
      "Do not ignore temporal order in forecasting questions.",
      "Comparative trend interpretation is often the real task."
    ]
  },
  {
    id: "framingham",
    name: "Framingham Heart Disease",
    file: "framingham_heart_disease.csv",
    rows: 4238,
    cols: 16,
    task: "Binary Classification",
    target: "TenYearCHD",
    summary: "Clinical risk factors used to predict whether coronary heart disease occurs within ten years.",
    exampleRow: {
      male: "1",
      age: "39",
      currentSmoker: "0",
      totChol: "195",
      sysBP: "106",
      glucose: "77",
      TenYearCHD: "0"
    },
    stats: [
      "Binary target with class imbalance",
      "Missingness in clinical variables such as glucose",
      "Recall matters for missed-risk cases"
    ],
    studyPoints: [
      "Accuracy alone is weak on an imbalanced target.",
      "Stratified splitting is usually the safer baseline.",
      "Confusion matrix and recall are important."
    ]
  },
  {
    id: "googleplay",
    name: "Google Play Store",
    file: "googleplaystore.csv",
    rows: 10841,
    cols: 13,
    task: "EDA / Cleaning / Optional Regression",
    target: "Usually Rating after cleaning",
    summary: "App marketplace data with duplicates, malformed numeric fields, and invalid values that need cleaning first.",
    exampleRow: {
      App: "Sketch - Draw & Paint",
      Category: "ART_AND_DESIGN",
      Rating: "4.5",
      Reviews: "215644",
      Installs: "50,000,000+",
      Type: "Free",
      Price: "0"
    },
    stats: [
      "Duplicates by app name are common",
      "Installs and Price need numeric cleaning",
      "Invalid ratings exist in raw data"
    ],
    studyPoints: [
      "Cleaning quality is more important than jumping into modelling.",
      "Check duplicates before summarising categories or ratings.",
      "Do not trust raw rating values without validation."
    ]
  },
  {
    id: "housing",
    name: "USA Housing",
    file: "housing.csv",
    rows: 5000,
    cols: 7,
    task: "Regression",
    target: "Price",
    summary: "A cleaner housing regression dataset with numeric predictors and one address-like field.",
    exampleRow: {
      "Avg. Area Income": "79545.46",
      "Avg. Area House Age": "5.68",
      "Avg. Area Number of Rooms": "7.01",
      "Area Population": "23086.80",
      Price: "1059033.56"
    },
    stats: [
      "No headline missing-value problem",
      "Address behaves like a near-identifier",
      "Good baseline dataset for linear regression"
    ],
    studyPoints: [
      "Drop Address from a simple baseline model.",
      "RMSE and residual analysis are useful here.",
      "Start with interpretable regression before overcomplicating."
    ]
  }
];

const ALGO_TOPICS = [
  {
    id: "complexity",
    name: "Complexity and Growth",
    focus: "Asymptotic notation, complexity classes, recurrence growth, and function comparison.",
    summary: "Core exam material on Big O, P versus NP, and matching functions to growth curves.",
    stats: ["Big O and complexity classes", "Recurrences and growth order", "Curve-matching questions"],
    studyPoints: [
      "Separate decidability or tractability claims from proof claims.",
      "Big O is dominated by the fastest-growing term.",
      "Curve sketches are about long-run behaviour, not tiny n."
    ]
  },
  {
    id: "searching",
    name: "Searching, Trees, and Hashing",
    focus: "Interpolation search, tree traversals, linked structures, matrices, and hash-table applications.",
    summary: "Algorithm tracing questions that mix data structures with traversal order and search logic.",
    stats: ["Interpolation search traces", "Tree traversal counting", "Linked list versus matrix reasoning"],
    studyPoints: [
      "State the first inspected values in search-trace questions.",
      "Traversal answers depend on the exact visit order.",
      "Hash tables are about fast lookup from keys to positions."
    ]
  },
  {
    id: "concurrency",
    name: "Threads and Synchronisation",
    focus: "Multithreading, multiprocessing, race conditions, shared state, and locking.",
    summary: "Theory and code-reading questions on concurrent updates to shared global state.",
    stats: ["Race condition diagnosis", "Lock placement", "Thread behaviour"],
    studyPoints: [
      "Race conditions come from unsynchronised shared writes.",
      "A lock must wrap the critical section, not just be imported.",
      "Multithreading and multiprocessing are not the same model."
    ]
  },
  {
    id: "graphs",
    name: "Sorting and Graph Algorithms",
    focus: "In-place quick sort, greedy path construction, labelled graphs, and algorithm design.",
    summary: "Long-form pseudocode questions with graphs and constrained path selection.",
    stats: ["Pseudocode writing", "Greedy choices", "Graph path constraints"],
    studyPoints: [
      "Greedy algorithms need a precise local-choice rule.",
      "In-place quick sort relies on partitioning and recursive bounds.",
      "Graph questions often test whether you preserve legality constraints."
    ]
  }
];

const MODULES = {
  "5004cmd": {
    id: "5004cmd",
    name: "5004CMD",
    label: "Data Science",
    itemLabel: "Datasets",
    itemType: "dataset",
    allLabel: "All 5004CMD datasets",
    items: DATASETS,
    dashboard: {
      eyebrow: "5004CMD Dashboard",
      title: "Data Science revision across six datasets",
      copy: "Use the dataset cards to review what each table is for, what the target or analytical angle is, and what kind of cleaning or evaluation the exam is likely to expect."
    },
    flashcardsCopy: {
      title: "5004CMD Flashcards",
      copy: "These decks cover datasets, targets, preprocessing, evaluation, and common exam mistakes.",
      note: "Cards stay unique until the chosen 5004CMD pool has been fully used."
    },
    examsCopy: {
      title: "5004CMD Mock Exams",
      copy: "These mock papers keep the data-science style: pandas setup, cleaning, splitting, modelling, plotting, and interpretation.",
      note: "Each 5004CMD focus area rotates through different short-answer and code-style questions."
    },
    historyCopy: {
      title: "5004CMD Answered History",
      copy: "Review saved data-science decks and mock exams for this module only."
    }
  },
  "5002cmd": {
    id: "5002cmd",
    name: "5002CMD",
    label: "Advanced Algorithms",
    itemLabel: "Topics",
    itemType: "topic",
    allLabel: "All 5002CMD topics",
    items: ALGO_TOPICS,
    dashboard: {
      eyebrow: "5002CMD Dashboard",
      title: "Advanced Algorithms revision without dataset cards",
      copy: "This module does not revolve around CSV datasets, so the dashboard tracks topic clusters instead: complexity, searching structures, concurrency, and graph or sorting algorithms."
    },
    flashcardsCopy: {
      title: "5002CMD Flashcards",
      copy: "These decks focus on advanced algorithms theory, tracing, concurrency, data structures, and pseudocode reasoning in the style of the attached mock paper.",
      note: "Cards stay unique until the chosen 5002CMD topic pool has been fully used."
    },
    examsCopy: {
      title: "5002CMD Mock Exams",
      copy: "These mock papers mirror the style of the images you attached: short theory prompts, traversal traces, growth-curve matching, threaded-code questions, and graph-based pseudocode tasks.",
      note: "Several 5002CMD questions include figures or diagrams directly in the paper."
    },
    historyCopy: {
      title: "5002CMD Answered History",
      copy: "Review saved advanced-algorithms decks and mock exams for this module only."
    }
  }
};

const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".nav-link");
const flashcardDatasetSelect = document.getElementById("flashcardDataset");
const flashcardCountInput = document.getElementById("flashcardCount");
const examDatasetSelect = document.getElementById("examDataset");
const examCountInput = document.getElementById("examCount");
const flashcardEmpty = document.getElementById("flashcardEmpty");
const flashcardLoading = document.getElementById("flashcardLoading");
const flashcardSession = document.getElementById("flashcardSession");
const flashcardTitle = document.getElementById("flashcardTitle");
const flashcardMeta = document.getElementById("flashcardMeta");
const flashcardSeenNotice = document.getElementById("flashcardSeenNotice");
const flashcardProgress = document.getElementById("flashcardProgress");
const flashcardQuestion = document.getElementById("flashcardQuestion");
const flashcardAnswer = document.getElementById("flashcardAnswer");
const flashcardAnswerWrap = document.getElementById("flashcardAnswerWrap");
const flashcardReviewList = document.getElementById("flashcardReviewList");
const flashcardLoadingTitle = document.getElementById("flashcardLoadingTitle");
const flashcardLoadingCopy = document.getElementById("flashcardLoadingCopy");
const revealFlashcardBtn = document.getElementById("revealFlashcard");
const markFlashcardRightBtn = document.getElementById("markFlashcardRight");
const markFlashcardWrongBtn = document.getElementById("markFlashcardWrong");
const prevFlashcardBtn = document.getElementById("prevFlashcard");
const nextFlashcardBtn = document.getElementById("nextFlashcard");
const submitFlashcardsBtn = document.getElementById("submitFlashcards");
const examEmpty = document.getElementById("examEmpty");
const examLoading = document.getElementById("examLoading");
const examForm = document.getElementById("examForm");
const examTitle = document.getElementById("examTitle");
const examMeta = document.getElementById("examMeta");
const examQuestionCount = document.getElementById("examQuestionCount");
const examQuestions = document.getElementById("examQuestions");
const examResults = document.getElementById("examResults");
const historyFilter = document.getElementById("historyFilter");
const historyList = document.getElementById("historyList");
const historyDetail = document.getElementById("historyDetail");
const dashboardGrid = document.getElementById("dashboardGrid");
const datasetModal = document.getElementById("datasetModal");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalPreview = document.getElementById("modalPreview");
const answersModal = document.getElementById("answersModal");
const answersModalEyebrow = document.getElementById("answersModalEyebrow");
const answersModalTitle = document.getElementById("answersModalTitle");
const answersModalMeta = document.getElementById("answersModalMeta");
const answersModalPreview = document.getElementById("answersModalPreview");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("heroTitle");
const heroCopy = document.getElementById("heroCopy");
const metricPrimary = document.getElementById("metricPrimary");
const metricPrimaryLabel = document.getElementById("metricPrimaryLabel");
const metricFlashcards = document.getElementById("metricFlashcards");
const metricExamQuestions = document.getElementById("metricExamQuestions");
const flashcardsHeaderTitle = document.getElementById("flashcardsHeaderTitle");
const flashcardsHeaderCopy = document.getElementById("flashcardsHeaderCopy");
const flashcardControlNote = document.getElementById("flashcardControlNote");
const examsHeaderTitle = document.getElementById("examsHeaderTitle");
const examsHeaderCopy = document.getElementById("examsHeaderCopy");
const examControlNote = document.getElementById("examControlNote");
const historyHeaderTitle = document.getElementById("historyHeaderTitle");
const historyHeaderCopy = document.getElementById("historyHeaderCopy");

let state = loadState();
let flashcardPools = {};
let examPools = {};
let currentFlashcardSession = null;
let currentExamSession = null;
let currentModuleId = "5004cmd";
let currentViewId = "dashboard";

init();

function init() {
  buildAllPools();
  bindEvents();
  syncContentToModule();
  renderHistory();
}

function buildAllPools() {
  flashcardPools = {
    "5004cmd": Object.fromEntries(DATASETS.map((profile) => [profile.id, build5004FlashcardPool(profile)])),
    "5002cmd": Object.fromEntries(ALGO_TOPICS.map((topic) => [topic.id, build5002FlashcardPool(topic)]))
  };

  examPools = {
    "5004cmd": Object.fromEntries(DATASETS.map((profile) => [profile.id, build5004ExamPool(profile)])),
    "5002cmd": Object.fromEntries(ALGO_TOPICS.map((topic) => [topic.id, build5002ExamPool(topic)]))
  };
}

function bindEvents() {
  navLinks.forEach((button) => {
    button.addEventListener("click", () => {
      currentModuleId = button.dataset.module;
      currentViewId = button.dataset.view;
      syncContentToModule();
    });
  });

  document.getElementById("generateFlashcards").addEventListener("click", handleGenerateFlashcards);
  revealFlashcardBtn.addEventListener("click", revealFlashcard);
  markFlashcardRightBtn.addEventListener("click", () => markFlashcard(true));
  markFlashcardWrongBtn.addEventListener("click", () => markFlashcard(false));
  prevFlashcardBtn.addEventListener("click", () => moveFlashcard(-1));
  nextFlashcardBtn.addEventListener("click", () => moveFlashcard(1));
  submitFlashcardsBtn.addEventListener("click", submitFlashcardDeck);
  document.getElementById("generateExam").addEventListener("click", handleGenerateExam);
  examForm.addEventListener("submit", finishExam);
  examDatasetSelect.addEventListener("change", syncExamControls);
  historyFilter.addEventListener("change", renderHistory);
  document.getElementById("clearHistory").addEventListener("click", clearHistory);
  document.getElementById("closeDatasetModal").addEventListener("click", closeDatasetModal);
  datasetModal.addEventListener("click", (event) => {
    if (event.target === datasetModal) {
      closeDatasetModal();
    }
  });
  document.getElementById("closeAnswersModal").addEventListener("click", closeAnswersModal);
  answersModal.addEventListener("click", (event) => {
    if (event.target === answersModal) {
      closeAnswersModal();
    }
  });
  historyDetail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='open-answers-modal']");
    if (button) {
      openAnswersModal(button.dataset.attemptId);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAnswersModal();
      closeDatasetModal();
    }
  });
}

function syncContentToModule() {
  setActiveView(currentViewId);
  updateHeaders();
  populateSelects();
  syncExamControls();
  renderDashboard();
  updateMetrics();
  renderHistory();
}

function setActiveView(viewId) {
  views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  navLinks.forEach((button) => {
    button.classList.toggle("active", button.dataset.module === currentModuleId && button.dataset.view === viewId);
  });
}

function updateHeaders() {
  const module = getModule();
  heroEyebrow.textContent = module.dashboard.eyebrow;
  heroTitle.textContent = module.dashboard.title;
  heroCopy.textContent = module.dashboard.copy;
  flashcardsHeaderTitle.textContent = module.flashcardsCopy.title;
  flashcardsHeaderCopy.textContent = module.flashcardsCopy.copy;
  flashcardControlNote.textContent = module.flashcardsCopy.note;
  examsHeaderTitle.textContent = module.examsCopy.title;
  examsHeaderCopy.textContent = module.examsCopy.copy;
  examControlNote.textContent = module.examsCopy.note;
  historyHeaderTitle.textContent = module.historyCopy.title;
  historyHeaderCopy.textContent = module.historyCopy.copy;
}

function populateSelects() {
  const module = getModule();
  const options = [`<option value="all">${module.allLabel}</option>`]
    .concat(module.items.map((item) => `<option value="${item.id}">${item.name}</option>`))
    .join("");
  flashcardDatasetSelect.innerHTML = options;
  examDatasetSelect.innerHTML = currentModuleId === "5002cmd"
    ? `<option value="actual-mock">Actual Mock</option>${options}`
    : options;
}

function syncExamControls() {
  const isActualMock = examDatasetSelect.value === "actual-mock";
  examCountInput.disabled = isActualMock;
  if (isActualMock) {
    examCountInput.value = currentModuleId === "5002cmd" ? 8 : 8;
    examControlNote.textContent = currentModuleId === "5002cmd"
      ? "Actual Mock uses a fixed 8-question paper styled after the 2025 practice paper you uploaded."
      : "Actual Mock uses a fixed paper-style layout with longer exam questions for this module.";
    return;
  }

  examCountInput.disabled = false;
  examControlNote.textContent = getModule().examsCopy.note;
}

async function handleGenerateExam() {
  const selected = examDatasetSelect.value;
  const isActualMock = selected === "actual-mock";
  const scopeLabel = isActualMock
    ? "actual mock exam"
    : selected === "all"
      ? `${getModule().allLabel.toLowerCase()} mock exam`
      : `${getItem(selected).name} mock exam`;
  try {
    showExamLoading(
      isActualMock ? "Creating actual mock" : "Creating mock exam",
      isActualMock
        ? currentModuleId === "5002cmd"
          ? "Preparing one of the 8 mock papers."
          : "Preparing the paper-style exam layout."
        : `Preparing your ${scopeLabel}.`
    );
    await new Promise((resolve) => setTimeout(resolve, 650));
    generateExam();
  } finally {
    hideExamLoading();
  }
}

async function handleGenerateFlashcards() {
  const selected = flashcardDatasetSelect.value;
  const scopeLabel = selected === "all"
    ? getModule().allLabel.toLowerCase()
    : getItem(selected).name;
  try {
    showFlashcardLoading(
      "Creating flashcards",
      `Preparing your ${scopeLabel} revision deck.`
    );
    await new Promise((resolve) => setTimeout(resolve, 650));
    generateFlashcardDeck();
  } finally {
    hideFlashcardLoading();
  }
}

function renderDashboard() {
  const module = getModule();
  dashboardGrid.innerHTML = module.items.map((item) => renderDashboardCard(module, item)).join("");
  dashboardGrid.querySelectorAll(".dataset-card").forEach((card) => {
    card.addEventListener("click", () => openPreviewModal(card.dataset.itemId));
  });
}

function renderDashboardCard(module, item) {
  const pills = module.id === "5004cmd"
    ? [`${item.rows} rows`, `${item.cols} columns`, `Target: ${item.target}`]
    : [item.focus, item.stats[0], item.stats[1]];

  return `
    <article class="dataset-card" data-item-id="${item.id}">
      <p class="eyebrow">${module.id === "5004cmd" ? escapeHtml(item.task) : "Advanced Algorithms"}</p>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <div class="pill-row">
        ${pills.map((pill) => `<span class="pill">${escapeHtml(pill)}</span>`).join("")}
      </div>
      <div class="review-item">
        <p><strong>Key exam angle:</strong> ${escapeHtml(item.studyPoints[0])}</p>
      </div>
    </article>
  `;
}

function updateMetrics() {
  const module = getModule();
  metricPrimary.textContent = String(module.items.length);
  metricPrimaryLabel.textContent = module.itemLabel;
  metricFlashcards.textContent = String(sumPoolCounts(flashcardPools[currentModuleId]));
  metricExamQuestions.textContent = String(sumPoolCounts(examPools[currentModuleId]));
}

function sumPoolCounts(poolMap) {
  return Object.values(poolMap).reduce((sum, items) => sum + items.length, 0);
}

function build5004FlashcardPool(profile) {
  const cards = [];
  const columns = Object.keys(profile.exampleRow);

  cards.push(makeCard(profile.id, `${profile.id}-summary`, `What is the main revision story of ${profile.file}?`, profile.summary));
  cards.push(makeCard(profile.id, `${profile.id}-task`, `What kind of task is ${profile.file}?`, `${profile.file} is mainly a ${profile.task.toLowerCase()} problem focused on ${profile.target}.`));
  cards.push(makeCard(profile.id, `${profile.id}-target`, `What should your answer focus on as the main target or analytical goal in ${profile.file}?`, `${profile.target} is the main outcome or analytical focus. Strong answers link preprocessing and evaluation directly to that goal.`));
  cards.push(makeCard(profile.id, `${profile.id}-shape`, `Why does the shape of ${profile.file} matter in an exam answer?`, `It has ${profile.rows} rows and ${profile.cols} columns, so you should comment on scale, cleaning needs, and whether the feature set suits the target.`));
  cards.push(makeCard(profile.id, `${profile.id}-columns`, `Which fields would you mention early when introducing ${profile.file}?`, columns.join(", ")));
  cards.push(makeCard(profile.id, `${profile.id}-workflow`, `What is a safe first workflow step when answering a coding question on ${profile.name}?`, `Inspect the data first, check structure or missingness, then move to cleaning, feature definition, modelling, and evaluation.`));
  cards.push(makeCard(profile.id, `${profile.id}-metric-fit`, `Why should your evaluation metric match the task type in ${profile.file}?`, `Metrics should match whether the outcome is continuous, categorical, temporal, or purely exploratory. Using the wrong metric weakens the answer.`));

  profile.stats.forEach((note, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-stat-${index}`, `What dataset fact helps you discuss ${profile.name}?`, note));
    cards.push(makeCard(profile.id, `${profile.id}-stat-meaning-${index}`, `Why is this fact important for an exam answer on ${profile.name}: ${note}?`, `Use it to justify your preprocessing, modelling, plotting, or interpretation decisions instead of giving generic answers.`));
  });

  profile.studyPoints.forEach((point, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-study-${index}`, `What important revision point should you remember for ${profile.name}?`, point));
    cards.push(makeCard(profile.id, `${profile.id}-study-use-${index}`, `How would you use this point in an exam answer on ${profile.name}?`, `State the point directly, then connect it to the modelling or interpretation step the question is asking for.`));
  });

  columns.forEach((column, index) => {
    if (index < 6) {
      cards.push(makeCard(profile.id, `${profile.id}-column-${index}`, `Why might the column ${column} matter in ${profile.name}?`, `You should explain what ${column} represents and whether it behaves as a predictor, identifier, timestamp, category, or target-related feature.`));
    }
  });

  cards.push(makeCard(profile.id, `${profile.id}-sample-row`, `Why is looking at a sample row useful before modelling ${profile.name}?`, `A sample row shows the feature types, mixed data formats, and possible cleaning issues before you start coding.`));
  cards.push(makeCard(profile.id, `${profile.id}-train-test`, `What should you always think about before splitting or evaluating ${profile.name}?`, `Check for leakage, task type, missing values, and whether the split should be random, stratified, or chronological.`));
  cards.push(makeCard(profile.id, `${profile.id}-plot`, `Why are plots often useful in answers on ${profile.name}?`, `Plots help you explain relationships, trends, outliers, and whether predictions align with real values.`));
  cards.push(makeCard(profile.id, `${profile.id}-cleaning`, `What is the role of cleaning in ${profile.name}?`, `Cleaning makes the dataset trustworthy enough for analysis by addressing structure, invalid values, missingness, duplication, or encoding needs.`));

  return dedupeById(cards);
}

function build5002FlashcardPool(topic) {
  const shared = {
    complexity: [
      ["What do we currently know about whether P equals NP?", "We do not know whether P equals NP. It remains an open problem."],
      ["Give one example of a problem in class P.", "Examples include sorting, shortest path in a graph with non-negative weights, or searching a sorted array."],
      ["Give one example of an NP problem.", "Examples include SAT, Hamiltonian cycle, travelling salesperson decision, or subset sum decision."],
      ["How do you identify the dominant term for Big O?", "Keep the fastest-growing term as n becomes large and ignore constants and lower-order terms."],
      ["Why can two functions with different small-n values have the same Big O?", "Big O compares long-run growth behaviour, not exact outputs at small n."],
      ["What does a recurrence relation describe?", "It defines a problem in terms of smaller instances, often capturing recursive work and subproblem structure."],
      ["Why does factorial growth outpace polynomial growth?", "n! multiplies many increasing terms together, so it eventually dominates any fixed-degree polynomial."],
      ["What should you mention when matching a function to a graph?", "Mention overall growth rate, curvature, and whether the rise is linear, polynomial, exponential, or faster."],
      ["What does Big O ignore in a function?", "It ignores constant factors and lower-order terms because it focuses on long-run growth."],
      ["What is the typical growth order from small to large?", "A common order is O(1), O(log n), O(n), O(n log n), O(n^2), O(n^3), O(2^n), O(n!)."],
      ["Why is O(n log n) usually better than O(n^2)?", "Because n log n grows more slowly than n^2 for large input sizes."],
      ["What is the dominant term of 4n^3 + 2n^2 + 7?", "The dominant term is n^3, so the function is O(n^3)."],
      ["What is the Big O of a geometric sum like 1 + 2 + 4 + ... + 2^n?", "The largest term dominates, so the sum is O(2^n)."],
      ["Why is O(2^n) considered expensive?", "Exponential growth doubles with each extra unit of input, so it becomes huge very quickly."],
      ["What is the Big O of a constant-time algorithm?", "It is O(1), because the work does not grow with input size."],
      ["What is the Big O of scanning an array once?", "It is O(n), because each element is visited once."],
      ["Why is n(n^2 - 1) still cubic?", "Expanding gives n^3 - n, and n^3 dominates as n becomes large."],
      ["What does a recurrence base case do?", "It stops the recursion and gives a known answer for small input sizes."],
      ["Why can recursive algorithms use more space than iterative ones?", "Each recursive call adds a frame to the call stack."],
      ["What should you do first in a Big O algebra question?", "Expand products or identify the fastest-growing term before simplifying."],
      ["What distinguishes polynomial growth from exponential growth?", "Polynomial growth uses powers of n, while exponential growth raises a constant to the power n."],
      ["Why is SAT often used as an NP example?", "Because a proposed assignment can be checked quickly, even though finding one may be hard."],
      ["What does it mean for a problem to be in P?", "It means the problem can be solved in polynomial time."],
      ["What does it mean for a problem to be in NP?", "It means a proposed solution can be verified in polynomial time."],
      ["Why are curve-matching questions about shape rather than exact values?", "Because asymptotic analysis compares how fast functions grow, not just their values at one point."]
    ],
    searching: [
      ["What does post-order traversal do on a binary tree?", "It visits left subtree, then right subtree, then the root."],
      ["Why is interpolation search only suitable in limited cases?", "It assumes sorted data and works best when values are fairly uniformly distributed."],
      ["What does a hash table provide well?", "Fast average-case key lookup, insertion, and deletion."],
      ["When is a matrix representation of a graph preferable to an adjacency list?", "When the graph is dense or adjacency checks must be constant time."],
      ["What is a typical advantage of a linked list?", "It supports insertion or deletion after a known node without shifting later elements."],
      ["What makes traversal-count questions easy to lose marks on?", "Using the wrong visit order or forgetting whether counting starts at 0 or 1."],
      ["How do you answer a search-trace question cleanly?", "Write the inspected values in order and explain why the next probe position changes."],
      ["What is an application of hash tables?", "Symbol tables, dictionaries, caches, compiler lookup tables, or fast membership tests."],
      ["What does in-order traversal do?", "It visits left subtree, then root, then right subtree."],
      ["What does pre-order traversal do?", "It visits root, then left subtree, then right subtree."],
      ["Why is a sorted list important for interpolation search?", "The algorithm estimates the likely position from the numeric scale, which only makes sense on sorted data."],
      ["What is a key advantage of hash tables over linked lists for lookup?", "Hash tables usually provide much faster average-case key lookup."],
      ["When is an adjacency matrix wasteful?", "It is wasteful on sparse graphs because it stores many empty edge positions."],
      ["What is a key strength of adjacency lists?", "They store only existing edges, so they are efficient for sparse graphs."],
      ["Why must you read the traversal direction carefully?", "The left-right order changes the visit sequence and therefore the counted answer."],
      ["What should you do before tracing interpolation search?", "Write the low index, high index, and target value so you can track each probe clearly."],
      ["Why are hash collisions important?", "Different keys can map to the same slot, so the table needs a collision-handling method."],
      ["What is one simple collision-handling strategy?", "Chaining, where each table position stores a list of items with the same hash slot."],
      ["Why is deletion easy after a known node in a linked list?", "Because you can relink pointers without shifting later elements."],
      ["Why is random access slower in linked lists than arrays?", "You usually have to follow links node by node rather than jump directly to an index."],
      ["What kind of graph benefits most from a matrix representation?", "A dense graph with many edges."],
      ["What is the first thing to state in a trace question answer?", "The order of values or nodes visited."],
      ["Why are hash tables popular in compilers?", "They make identifier lookup and symbol-table operations fast."],
      ["What is the difference between search correctness and search efficiency?", "Correctness is about finding the target when present, while efficiency is about how quickly the algorithm does it."],
      ["Why can interpolation search outperform binary search on some data?", "If the data is uniformly distributed, its estimated probe can jump very close to the target."],
      ["What is the safest way to count traversal positions?", "Write each visited node in order and number them one by one."]
    ],
    concurrency: [
      ["What is the difference between multithreading and multiprocessing?", "Multithreading runs threads within one process sharing memory, while multiprocessing uses separate processes with separate address spaces."],
      ["What problem appears when two threads write shared state without synchronisation?", "A race condition."],
      ["What is a critical section?", "The part of code that accesses shared mutable state and must be protected from concurrent interference."],
      ["Why is importing Lock not enough by itself?", "You also need to create a lock object and acquire or release it around the critical section."],
      ["What does join() do on a thread?", "It waits for that thread to finish before the program continues."],
      ["Why can shared global variables be dangerous in threaded code?", "Updates may interleave unpredictably and produce lost writes or inconsistent states."],
      ["What should go inside a lock-protected block?", "Only the code that reads or writes shared state that must remain consistent."],
      ["What kind of exam wording signals a synchronisation question?", "References to shared score, balance, counter, or two threads modifying the same variable."],
      ["What is a race condition?", "It is a bug where the result depends on the unpredictable timing of concurrent operations."],
      ["Why is shared memory central to multithreading questions?", "Because threads in the same process can interfere with each other's updates to shared variables."],
      ["What does a lock prevent?", "It prevents multiple threads entering a critical section at the same time."],
      ["Why must a lock object be created before use?", "Because importing the Lock class only gives the type; you still need an instance to control access."],
      ["What is a thread target?", "It is the function a thread runs when started."],
      ["Why can the final value of a shared counter be wrong without locks?", "Concurrent reads and writes can overwrite each other, causing lost updates."],
      ["What does with lock: do in Python?", "It acquires the lock before the block and releases it automatically when the block ends."],
      ["Why is deadlock different from a race condition?", "Deadlock stops progress because threads wait forever, while a race condition gives unpredictable results from unsafe interleaving."],
      ["What is thread-safe code?", "Code designed so concurrent execution does not corrupt shared state or produce invalid behaviour."],
      ["Why should long unrelated work stay outside a lock?", "Holding a lock too long increases blocking and reduces concurrency."],
      ["What does start() do on a thread?", "It begins executing the target function in a separate thread of control."],
      ["Why is join() often used before printing final shared results?", "It ensures all worker threads have finished updating shared state first."],
      ["What is shared mutable state?", "Data that multiple threads can modify."],
      ["Why is reading and then writing a shared variable risky?", "Another thread may change it between the read and write steps."],
      ["What is the aim of synchronisation?", "To coordinate concurrent execution so shared data stays correct."],
      ["Why are bank-balance or score examples common in exams?", "They make lost updates and race conditions easy to see."],
      ["What should you identify first in a concurrency debugging question?", "The shared variable and the exact lines where concurrent updates happen."]
    ],
    graphs: [
      ["What does in-place quick sort rely on?", "Partitioning the array around a pivot and recursively sorting subranges without creating a second full array."],
      ["What is out-of-place quick sort?", "A quick-sort style approach that builds separate lower, equal, and higher collections around a pivot instead of partitioning the original array directly."],
      ["What is in-place merge sort?", "A merge-sort variant that tries to merge within the original array storage, usually with more complicated element movement than the standard version."],
      ["What is out-of-place merge sort?", "The standard merge sort that uses extra temporary storage while merging sorted halves."],
      ["What is in-place insertion sort?", "The standard insertion sort shifts items inside the same array and inserts the current key into its correct position."],
      ["What is out-of-place insertion sort?", "An insertion-style method that builds a separate sorted output structure rather than updating the original array in place."],
      ["What is in-place bubble sort?", "The standard bubble sort repeatedly swaps adjacent elements directly inside the original array."],
      ["What is out-of-place bubble sort?", "A bubble-style pass that writes results into another structure rather than swapping in the original array."],
      ["What is the core greedy-algorithm idea?", "Make the best local choice according to a rule and hope it leads to a good global solution."],
      ["Why must graph-algorithm pseudocode name its input and output clearly?", "Because marks often depend on stating the graph, vertices, constraints, and returned path or failure case explicitly."],
      ["What is a legal-path constraint?", "A rule that restricts which paths may be used, such as a maximum total edge-label sum or no repeated vertices."],
      ["What should partition pseudocode track in quick sort?", "The pivot, left and right indices, swapping logic, and recursive bounds."],
      ["How do you improve a long pseudocode answer?", "Use clear steps, named variables, termination conditions, and a precise update rule."],
      ["Why is a greedy choice not automatically correct?", "Because it must be justified or designed for a problem where local choices preserve progress toward a valid solution."],
      ["What does non-decreasing order mean in sorting?", "Values are allowed to stay equal or increase from left to right."],
      ["What is the role of the pivot in quick sort?", "It is the reference value used to split the array into lower and higher parts."],
      ["Why is quick sort called in-place in this context?", "Because partitioning rearranges elements inside the original array rather than building a full second array."],
      ["Why is out-of-place quick sort easier to explain than in-place quick sort?", "Because it can describe the algorithm using separate lower and higher lists rather than pointer-based partitioning swaps."],
      ["What should a recursive quick sort call receive?", "The array plus the left and right bounds of the subarray to sort."],
      ["What does partitioning achieve?", "It places the pivot in its correct region and separates smaller and larger elements."],
      ["Why does standard merge sort count as out-of-place?", "Because merging normally uses extra temporary arrays or lists to combine sorted halves."],
      ["Why is in-place merge sort harder than standard merge sort?", "Because it must merge while reusing the same array storage, which makes element movement more complex."],
      ["Why is insertion sort usually considered in-place?", "Because it sorts by shifting values inside the same array and uses only a small constant amount of extra space."],
      ["Why is bubble sort usually considered in-place?", "Because it sorts by swapping adjacent elements directly in the original array."],
      ["What is the main space trade-off between in-place and out-of-place sorting?", "In-place methods try to minimise extra memory, while out-of-place methods use extra storage to simplify movement or merging."],
      ["What is the basic idea of merge sort?", "Split the input, sort each half recursively, then merge the sorted halves."],
      ["What is the basic idea of insertion sort?", "Grow a sorted prefix by inserting each new element into the correct position."],
      ["What is the basic idea of bubble sort?", "Repeatedly compare adjacent elements and swap them so larger values move toward the end over repeated passes."],
      ["Why must greedy path algorithms track used vertices in some questions?", "Because the path may become illegal if it repeats vertices."],
      ["What should a legal-path algorithm track besides the current node?", "The running edge-label sum and any visited-vertex constraint."],
      ["Why can a locally small edge be a sensible greedy choice?", "It leaves more remaining budget under the path constraint for later steps."],
      ["What is the danger of a greedy algorithm?", "A good-looking local choice can still block the best global solution if the rule is poor."],
      ["What should the output of a graph-path pseudocode say?", "Whether a legal path was found and what that path is."],
      ["Why are base cases needed in recursive sort pseudocode?", "They stop recursion when the subarray has size zero or one."],
      ["What is a swap in sorting?", "Exchanging the positions of two elements."],
      ["Why should pseudocode mention initialisation explicitly?", "Marks are often attached to setting counters, sums, path lists, or bounds before loops start."],
      ["What makes a graph path legal in the attached style of question?", "It must not intersect itself and its running or total edge-label sum must stay within the limit."],
      ["Why is clear variable naming useful in pseudocode?", "It makes the algorithm easier to follow and shows what each value represents."],
      ["What is one sign of a strong greedy-algorithm answer?", "It states the selection rule and how the algorithm checks legality after each choice."],
      ["Why can quick sort degrade badly with a poor pivot choice?", "Very unbalanced partitions increase recursion depth and total work."],
      ["What should happen after partitioning in quick sort?", "Recursively sort the left and right partitions."],
      ["What extra storage is typical in out-of-place merge sort?", "A temporary array or list used while merging the sorted halves."],
      ["What operation usually makes insertion sort in-place?", "Shifting elements within the same array until the key can be inserted."],
      ["What operation usually makes bubble sort in-place?", "Adjacent swaps performed directly in the original array."],
      ["When is an out-of-place version easier to reason about in pseudocode?", "When separating data into new arrays or lists makes the algorithm steps clearer than index-heavy in-place movement."]
    ]
  };

  return shared[topic.id].map(([question, answer], index) => makeCard(topic.id, `${topic.id}-card-${index}`, question, answer));
}

function build5004ExamPool(profile) {
  if (profile.id === "housing") {
    return buildHousingExamPool(profile);
  }
  if (profile.id === "houseprice") {
    return buildHousePriceExamPool(profile);
  }
  if (profile.id === "googleplay") {
    return buildGooglePlayExamPool(profile);
  }
  if (profile.id === "framingham") {
    return buildFraminghamExamPool(profile);
  }
  if (profile.id === "weather") {
    return buildWeatherExamPool(profile);
  }
  if (profile.id === "electionpoll") {
    return buildElectionExamPool(profile);
  }
  return [];
}

function buildHousingExamPool(profile) {
  return dedupeById([
    codeQuestion(profile.id, `${profile.id}-read-a`, "Write pandas code to read housing.csv into a DataFrame named df.", ["pd.read_csv", "housing.csv", "df"], "df = pd.read_csv('../datasets/housing.csv')", "A correct answer should use pandas and read the housing dataset into a DataFrame."),
    codeQuestion(profile.id, `${profile.id}-head-a`, "Write code to display the first 10 rows of the housing dataset.", ["head", "10"], "df.head(10)", "The answer should call head(10) on the DataFrame."),
    codeQuestion(profile.id, `${profile.id}-tail-a`, "Write code to display the last 10 rows of the housing dataset.", ["tail", "10"], "df.tail(10)", "The answer should call tail(10) on the DataFrame."),
    codeQuestion(profile.id, `${profile.id}-missing-a`, "Write code to check missing values for every column in the housing dataset.", ["isnull", "sum"], "df.isnull().sum()", "The standard pandas pattern is df.isnull().sum()."),
    codeQuestion(profile.id, `${profile.id}-dupes-a`, "Write code to check for duplicated rows in the housing dataset.", ["duplicated", "sum"], "df.duplicated().sum()", "The answer should count duplicate rows with duplicated().sum()."),
    codeQuestion(profile.id, `${profile.id}-describe-a`, "Write code to display summary statistics for the numeric columns.", ["describe"], "df.describe()", "describe() is the standard summary-statistics method."),
    codeQuestion(profile.id, `${profile.id}-dropna-a`, "Write code to remove rows with missing values and save the cleaned result back into df.", ["dropna", "df"], "df = df.dropna()", "A valid answer should use dropna and assign the cleaned frame."),
    codeQuestion(profile.id, `${profile.id}-features-a`, "Write code to define the features X and target y for predicting house price, excluding the Address column.", ["drop", "Price", "Address", "X", "y"], "X = df.drop(columns=['Price', 'Address'])\ny = df['Price']", "X should exclude the target and the near-identifier Address column."),
    codeQuestion(profile.id, `${profile.id}-split-a`, "Write code to split X and y into training and testing sets using train_test_split with test_size=0.2 and random_state=42.", ["train_test_split", "test_size", "0.2", "random_state", "42"], "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", "A standard supervised-learning split is expected here."),
    codeQuestion(profile.id, `${profile.id}-model-a`, "Write code to create a LinearRegression model named lm and fit it on the training data.", ["LinearRegression", "lm", "fit", "X_train", "y_train"], "lm = LinearRegression()\nlm.fit(X_train, y_train)", "The answer should both instantiate and train the model."),
    codeQuestion(profile.id, `${profile.id}-coef-a`, "Write code to print the coefficients and intercept of the linear regression model.", ["coef", "intercept"], "print(lm.coef_)\nprint(lm.intercept_)", "LinearRegression exposes coef_ and intercept_."),
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to predict on the test set and evaluate the model using RMSE and R2.", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "A full answer should predict first, then compute RMSE and R2."),
    codeQuestion(profile.id, `${profile.id}-plot-a`, "Write code to create a scatter plot of actual vs predicted house prices.", ["scatter", "y_test", "y_pred", "xlabel", "ylabel"], "plt.scatter(y_test, y_pred)\nplt.xlabel('Actual Price')\nplt.ylabel('Predicted Price')\nplt.title('Actual vs Predicted House Prices')\nplt.show()", "The plot should compare actual and predicted values."),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Interpret an actual-vs-predicted housing plot in 2 or 3 short points.", ["diagonal", "close", "spread", "error", "outliers"], "Points close to the diagonal indicate accurate predictions. Wider spread suggests larger errors. Outliers or clear patterns may show where the model struggles.", "A good interpretation should mention closeness to the diagonal, spread of errors, or outliers.", 2),
    codeQuestion(profile.id, `${profile.id}-corr-a`, "Write code to display the correlation of all numeric variables with Price, sorted from highest to lowest.", ["corr", "Price", "sort_values"], "df.corr(numeric_only=True)['Price'].sort_values(ascending=False)", "This is a useful interpretation-oriented follow-up for the housing dataset."),
    codeQuestion(profile.id, `${profile.id}-rooms-a`, "Write code to create a new feature named rooms_per_bedroom from Avg. Area Number of Rooms and Avg. Area Number of Bedrooms.", ["rooms_per_bedroom", "Avg. Area Number of Rooms", "Avg. Area Number of Bedrooms"], "df['rooms_per_bedroom'] = df['Avg. Area Number of Rooms'] / df['Avg. Area Number of Bedrooms']", "The new feature should divide rooms by bedrooms."),
    keywordQuestion(profile.id, `${profile.id}-metric-a`, "Why is RMSE a suitable metric for this housing task?", ["continuous", "target", "error", "price"], "RMSE is suitable because Price is a continuous target and RMSE measures the typical prediction error magnitude.", "A strong answer links RMSE to continuous-value prediction.", 2)
  ]);
}

function buildHousePriceExamPool(profile) {
  return dedupeById([
    codeQuestion(profile.id, `${profile.id}-read-a`, "Write pandas code to read HousePricePrediction.csv into df.", ["pd.read_csv", "HousePricePrediction.csv", "df"], "df = pd.read_csv('../datasets/HousePricePrediction.csv')", "Use pandas to load the dataset."),
    codeQuestion(profile.id, `${profile.id}-info-a`, "Write code to inspect the structure of the dataset and column data types.", ["info"], "df.info()", "info() is the standard structural inspection step."),
    codeQuestion(profile.id, `${profile.id}-saleprice-missing-a`, "Write code to count how many rows have missing SalePrice values.", ["SalePrice", "isnull", "sum"], "df['SalePrice'].isnull().sum()", "This dataset is known to have many rows without SalePrice."),
    codeQuestion(profile.id, `${profile.id}-train-subset-a`, "Write code to keep only rows with a non-missing SalePrice in a new DataFrame named train_df.", ["SalePrice", "notnull", "train_df"], "train_df = df[df['SalePrice'].notnull()].copy()", "Training should use the labelled rows only."),
    codeQuestion(profile.id, `${profile.id}-feature-missing-a`, "Write code to check missing values in the training subset.", ["isnull", "sum", "train_df"], "train_df.isnull().sum()", "After isolating labelled rows, you should check remaining missingness."),
    codeQuestion(profile.id, `${profile.id}-dupes-a`, "Write code to check duplicated rows in train_df.", ["duplicated", "sum"], "train_df.duplicated().sum()", "Duplicate checking is part of the cleaning stage."),
    codeQuestion(profile.id, `${profile.id}-describe-a`, "Write code to display summary statistics for train_df.", ["describe"], "train_df.describe()", "describe() is the expected statistics summary."),
    codeQuestion(profile.id, `${profile.id}-prep-a`, "Write code to create a modelling table with one-hot encoded categorical variables from train_df.", ["get_dummies", "drop_first"], "model_df = pd.get_dummies(train_df, drop_first=True)", "A correct answer should use one-hot encoding for categorical columns."),
    codeQuestion(profile.id, `${profile.id}-xy-a`, "Write code to define X and y for predicting SalePrice, dropping Id and SalePrice from X.", ["drop", "Id", "SalePrice", "X", "y"], "X = model_df.drop(columns=['Id', 'SalePrice'])\ny = model_df['SalePrice']", "The target is SalePrice and Id should not be used as a predictor."),
    codeQuestion(profile.id, `${profile.id}-split-a`, "Write code to split the house-price data into training and testing sets.", ["train_test_split", "test_size", "0.2", "random_state", "42"], "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", "A normal hold-out split is appropriate after selecting labelled rows."),
    codeQuestion(profile.id, `${profile.id}-fit-a`, "Write code to create and fit a LinearRegression model named lm.", ["LinearRegression", "lm", "fit"], "lm = LinearRegression()\nlm.fit(X_train, y_train)", "The model must be instantiated and fitted."),
    codeQuestion(profile.id, `${profile.id}-predict-a`, "Write code to predict sale prices for the test set.", ["predict", "X_test", "y_pred"], "y_pred = lm.predict(X_test)", "Prediction should be done with the fitted model on X_test."),
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to evaluate the model using RMSE and R2.", ["mean_squared_error", "r2_score", "sqrt"], "rmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "A strong answer includes both RMSE and R2."),
    codeQuestion(profile.id, `${profile.id}-plot-a`, "Write code to visualise actual vs predicted SalePrice values using a scatter plot.", ["scatter", "y_test", "y_pred", "show"], "plt.scatter(y_test, y_pred)\nplt.xlabel('Actual SalePrice')\nplt.ylabel('Predicted SalePrice')\nplt.title('Actual vs Predicted SalePrice')\nplt.show()", "The plot should compare actual target values to predictions."),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Why should rows with missing SalePrice not be used as labelled training data?", ["missing", "target", "unlabeled", "train"], "Those rows are unlabeled because the target SalePrice is missing, so they should not be used as supervised training examples.", "A correct explanation must connect missing SalePrice to unlabeled data.", 2),
    codeQuestion(profile.id, `${profile.id}-corr-a`, "Write code to compute the correlation of numeric variables with SalePrice in the labelled subset.", ["corr", "SalePrice", "sort_values"], "train_df.corr(numeric_only=True)['SalePrice'].sort_values(ascending=False)", "This supports feature interpretation."),
    keywordQuestion(profile.id, `${profile.id}-metric-a`, "Why is R2 useful in this house-price regression task?", ["variance", "explained", "regression"], "R2 is useful because it shows how much of the variation in SalePrice is explained by the regression model.", "A good answer should connect R2 to explained variance.", 2)
  ]);
}

function buildGooglePlayExamPool(profile) {
  return dedupeById([
    codeQuestion(profile.id, `${profile.id}-read-a`, "Write pandas code to read googleplaystore.csv into df.", ["pd.read_csv", "googleplaystore.csv", "df"], "df = pd.read_csv('../datasets/googleplaystore.csv')", "Load the Google Play dataset with pandas."),
    codeQuestion(profile.id, `${profile.id}-head-a`, "Write code to display the first 10 rows of the Google Play dataset.", ["head", "10"], "df.head(10)", "The answer should use head(10)."),
    codeQuestion(profile.id, `${profile.id}-missing-a`, "Write code to show missing values for each column in the Google Play dataset.", ["isnull", "sum"], "df.isnull().sum()", "Missing values should be checked column by column."),
    codeQuestion(profile.id, `${profile.id}-dupes-a`, "Write code to count duplicate apps based on the App column.", ["duplicated", "App", "sum"], "df['App'].duplicated().sum()", "The dataset contains many repeated app names."),
    codeQuestion(profile.id, `${profile.id}-clean-rating-a`, "Write code to keep only rows where Rating is less than or equal to 5.", ["Rating", "<=", "5"], "df = df[df['Rating'] <= 5]", "The dataset contains invalid rating values and should be filtered."),
    codeQuestion(profile.id, `${profile.id}-dropna-a`, "Write code to drop rows with missing Rating values.", ["dropna", "Rating"], "df = df.dropna(subset=['Rating'])", "Rating is a common target candidate, so missing values should be removed or handled."),
    codeQuestion(profile.id, `${profile.id}-numeric-a`, "Write code to convert Reviews to numeric values.", ["to_numeric", "Reviews"], "df['Reviews'] = pd.to_numeric(df['Reviews'], errors='coerce')", "Reviews should be numeric before modelling."),
    codeQuestion(profile.id, `${profile.id}-installs-a`, "Write code to convert the Installs column into numeric form by removing commas and plus signs.", ["Installs", "replace", "to_numeric"], "df['Installs'] = pd.to_numeric(df['Installs'].str.replace(',', '').str.replace('+', '', regex=False), errors='coerce')", "The formatted install counts need cleaning before numeric use."),
    codeQuestion(profile.id, `${profile.id}-price-a`, "Write code to convert the Price column into numeric form by removing the dollar sign.", ["Price", "replace", "to_numeric"], "df['Price'] = pd.to_numeric(df['Price'].str.replace('$', '', regex=False), errors='coerce')", "Price must be cleaned from string formatting."),
    codeQuestion(profile.id, `${profile.id}-xy-a`, "Write code to define X and y for predicting Rating using Reviews, Size, Installs and Price.", ["X", "y", "Rating", "Reviews", "Size", "Installs", "Price"], "X = df[['Reviews', 'Size', 'Installs', 'Price']]\ny = df['Rating']", "This defines a simple baseline modelling set."),
    codeQuestion(profile.id, `${profile.id}-split-a`, "Write code to split the Google Play data into training and testing sets.", ["train_test_split", "test_size", "0.2", "random_state", "42"], "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", "A standard train/test split is expected."),
    codeQuestion(profile.id, `${profile.id}-fit-a`, "Write code to create and fit a LinearRegression model named lm for Rating prediction.", ["LinearRegression", "lm", "fit"], "lm = LinearRegression()\nlm.fit(X_train, y_train)", "The model should be fitted on the training set."),
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to evaluate the Google Play model using RMSE and R2.", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "The evaluation stage should include prediction and regression metrics."),
    codeQuestion(profile.id, `${profile.id}-plot-a`, "Write code to create an actual-vs-predicted scatter plot for app ratings.", ["scatter", "y_test", "y_pred", "show"], "plt.scatter(y_test, y_pred)\nplt.xlabel('Actual Rating')\nplt.ylabel('Predicted Rating')\nplt.title('Actual vs Predicted App Ratings')\nplt.show()", "The plot should compare actual ratings to predicted ratings."),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Why is duplicate checking especially important in the Google Play dataset?", ["duplicate", "app", "bias", "repeated"], "Duplicate apps can bias summaries and models because the same app may be counted multiple times.", "A correct answer should connect duplicates to distorted analysis.", 2),
    keywordQuestion(profile.id, `${profile.id}-quality-a`, "Why is the observed maximum rating of 19 a serious warning sign?", ["invalid", "clean", "rating", "error"], "A maximum rating of 19 is invalid for a typical app-rating scale, so the data must be cleaned before trustworthy analysis.", "A strong answer should mention invalid data and cleaning.", 2),
    codeQuestion(profile.id, `${profile.id}-category-a`, "Write code to display the top 5 most common app categories.", ["value_counts", "head", "Category"], "df['Category'].value_counts().head(5)", "This is a standard EDA question for the app dataset.")
  ]);
}

function buildFraminghamExamPool(profile) {
  return dedupeById([
    codeQuestion(profile.id, `${profile.id}-read-a`, "Write pandas code to read framingham_heart_disease.csv into df.", ["pd.read_csv", "framingham_heart_disease.csv", "df"], "df = pd.read_csv('../datasets/framingham_heart_disease.csv')", "Load the Framingham dataset into a DataFrame."),
    codeQuestion(profile.id, `${profile.id}-info-a`, "Write code to display the structure and data types of the Framingham dataset.", ["info"], "df.info()", "info() gives the structure and dtypes."),
    codeQuestion(profile.id, `${profile.id}-missing-a`, "Write code to display missing values for each column.", ["isnull", "sum"], "df.isnull().sum()", "This dataset has important clinical missingness."),
    codeQuestion(profile.id, `${profile.id}-glucose-a`, "Write code to count missing values in the glucose column.", ["glucose", "isnull", "sum"], "df['glucose'].isnull().sum()", "glucose is one of the biggest missing-value columns."),
    codeQuestion(profile.id, `${profile.id}-impute-a`, "Write code to fill missing glucose values with the median glucose value.", ["fillna", "median", "glucose"], "df['glucose'] = df['glucose'].fillna(df['glucose'].median())", "Median imputation is a simple, defensible baseline."),
    codeQuestion(profile.id, `${profile.id}-class-balance-a`, "Write code to display the class distribution of the TenYearCHD target.", ["value_counts", "TenYearCHD"], "df['TenYearCHD'].value_counts()", "Class balance should be checked before modelling."),
    codeQuestion(profile.id, `${profile.id}-xy-a`, "Write code to define X and y for predicting TenYearCHD.", ["drop", "TenYearCHD", "X", "y"], "X = df.drop(columns=['TenYearCHD'])\ny = df['TenYearCHD']", "The target column should be separated from the predictors."),
    codeQuestion(profile.id, `${profile.id}-split-a`, "Write code to split the Framingham data using a stratified train/test split.", ["train_test_split", "stratify", "y", "random_state", "42"], "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)", "Stratification helps preserve the minority class proportion."),
    codeQuestion(profile.id, `${profile.id}-fit-a`, "Write code to create a LogisticRegression model named model and fit it on the training data.", ["LogisticRegression", "fit", "model"], "model = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)", "A logistic-regression baseline fits the binary target."),
    codeQuestion(profile.id, `${profile.id}-predict-a`, "Write code to generate predictions for the test set.", ["predict", "X_test", "y_pred"], "y_pred = model.predict(X_test)", "Prediction should use the trained classifier."),
    codeQuestion(profile.id, `${profile.id}-report-a`, "Write code to print the classification report for the test predictions.", ["classification_report", "print"], "print(classification_report(y_test, y_pred))", "The classification report summarises precision, recall and F1."),
    codeQuestion(profile.id, `${profile.id}-cm-a`, "Write code to print the confusion matrix for the Framingham model.", ["confusion_matrix", "print"], "print(confusion_matrix(y_test, y_pred))", "The confusion matrix is central for classification interpretation."),
    codeQuestion(profile.id, `${profile.id}-roc-a`, "Write code to calculate ROC-AUC using predicted probabilities.", ["predict_proba", "roc_auc_score"], "y_prob = model.predict_proba(X_test)[:, 1]\nroc_auc = roc_auc_score(y_test, y_prob)\nprint(roc_auc)", "ROC-AUC requires probabilities rather than just class labels."),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Why is recall important for this heart-disease dataset?", ["positive", "cases", "miss", "patients", "risk"], "Recall matters because missing real positive heart-disease cases can be costly, so the model should capture as many true-risk patients as possible.", "A correct interpretation should mention the cost of missing positive cases.", 2),
    keywordQuestion(profile.id, `${profile.id}-imbalance-a`, "Why can accuracy be misleading on this dataset?", ["imbalanced", "positive", "majority"], "Accuracy can be misleading because the positive class is relatively rare, so a model can score well by favouring the majority class.", "The answer should connect class imbalance to misleading accuracy.", 2),
    codeQuestion(profile.id, `${profile.id}-coef-a`, "Write code to print the logistic regression coefficients.", ["coef"], "print(model.coef_)", "This allows coefficient-based interpretation of the logistic model."),
    codeQuestion(profile.id, `${profile.id}-agecorr-a`, "Write code to show correlations between numeric variables and TenYearCHD, sorted descending.", ["corr", "TenYearCHD", "sort_values"], "df.corr(numeric_only=True)['TenYearCHD'].sort_values(ascending=False)", "This supports feature interpretation before modelling.")
  ]);
}

function buildWeatherExamPool(profile) {
  return dedupeById([
    codeQuestion(profile.id, `${profile.id}-read-a`, "Write pandas code to read Weather-data.csv into df.", ["pd.read_csv", "Weather-data.csv", "df"], "df = pd.read_csv('../datasets/Weather-data.csv')", "Use pandas to load the weather dataset."),
    codeQuestion(profile.id, `${profile.id}-datetime-a`, "Write code to convert the Date/Time column to datetime format.", ["to_datetime", "Date/Time"], "df['Date/Time'] = pd.to_datetime(df['Date/Time'])", "Datetime conversion is the first step for time-aware analysis."),
    codeQuestion(profile.id, `${profile.id}-info-a`, "Write code to inspect the structure of the weather dataset.", ["info"], "df.info()", "info() checks structure and dtypes."),
    codeQuestion(profile.id, `${profile.id}-missing-a`, "Write code to display missing values for each column.", ["isnull", "sum"], "df.isnull().sum()", "This confirms the dataset has no missing values."),
    codeQuestion(profile.id, `${profile.id}-hour-a`, "Write code to create an hour column from Date/Time.", ["dt", "hour"], "df['hour'] = df['Date/Time'].dt.hour", "The hour feature is useful for time-based modelling."),
    codeQuestion(profile.id, `${profile.id}-month-a`, "Write code to create a month column from Date/Time.", ["dt", "month"], "df['month'] = df['Date/Time'].dt.month", "Month captures seasonal effects."),
    codeQuestion(profile.id, `${profile.id}-topweather-a`, "Write code to display the 5 most common weather conditions.", ["value_counts", "head", "Weather"], "df['Weather'].value_counts().head(5)", "This is a common EDA step for the weather labels."),
    codeQuestion(profile.id, `${profile.id}-xy-a`, "Write code to define X and y for predicting Temp_C using Dew Point Temp_C, Rel Hum_%, Wind Speed_km/h, Visibility_km and Press_kPa.", ["X", "y", "Temp_C", "Dew Point Temp_C", "Rel Hum_%", "Wind Speed_km/h"], "X = df[['Dew Point Temp_C', 'Rel Hum_%', 'Wind Speed_km/h', 'Visibility_km', 'Press_kPa']]\ny = df['Temp_C']", "This creates a regression baseline for temperature prediction."),
    codeQuestion(profile.id, `${profile.id}-split-a`, "Write code to split the weather data into training and testing sets.", ["train_test_split", "test_size", "0.2", "random_state", "42"], "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", "A standard split is acceptable for this baseline prediction task."),
    codeQuestion(profile.id, `${profile.id}-fit-a`, "Write code to create and fit a LinearRegression model named lm.", ["LinearRegression", "lm", "fit"], "lm = LinearRegression()\nlm.fit(X_train, y_train)", "The model should be fitted on the training data."),
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to predict temperature on the test set and compute RMSE and R2.", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "Regression evaluation should include prediction and metrics."),
    codeQuestion(profile.id, `${profile.id}-plot-a`, "Write code to plot actual vs predicted temperatures.", ["scatter", "y_test", "y_pred", "show"], "plt.scatter(y_test, y_pred)\nplt.xlabel('Actual Temp_C')\nplt.ylabel('Predicted Temp_C')\nplt.title('Actual vs Predicted Temperature')\nplt.show()", "The scatter plot should compare actual and predicted temperatures."),
    codeQuestion(profile.id, `${profile.id}-trend-a`, "Write code to plot the average temperature by month.", ["groupby", "month", "mean", "plot"], "df.groupby('month')['Temp_C'].mean().plot(kind='line')\nplt.ylabel('Average Temp_C')\nplt.show()", "Grouping by month is a natural seasonal analysis step."),
    keywordQuestion(profile.id, `${profile.id}-chronology-a`, "Why can random splitting be risky if the weather task becomes forecasting?", ["time", "future", "leakage", "chronology"], "Random splitting can cause temporal leakage because future observations may influence the training data.", "A correct answer should mention chronology or future leakage.", 2),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "What does an actual-vs-predicted temperature plot tell you?", ["close", "line", "error", "spread"], "If points lie close to the diagonal, predictions are accurate. Wider spread shows larger errors or weaker model fit.", "A good answer should mention closeness to the diagonal and error spread.", 2),
    codeQuestion(profile.id, `${profile.id}-describe-a`, "Write code to display summary statistics for the numeric weather columns.", ["describe"], "df.describe()", "Summary statistics are part of the explore stage."),
    codeQuestion(profile.id, `${profile.id}-clear-a`, "Write code to count how many observations have Weather equal to 'Mainly Clear'.", ["Weather", "Mainly Clear"], "df[df['Weather'] == 'Mainly Clear'].shape[0]", "This checks a class count directly.")
  ]);
}

function buildElectionExamPool(profile) {
  return dedupeById([
    codeQuestion(profile.id, `${profile.id}-read-a`, "Write pandas code to read electionpoll.csv into df.", ["pd.read_csv", "electionpoll.csv", "df"], "df = pd.read_csv('../datasets/electionpoll.csv')", "Load the election polling dataset with pandas."),
    codeQuestion(profile.id, `${profile.id}-datetime-a`, "Write code to convert the Date \\ Party column into datetime format.", ["to_datetime", "Date \\ Party"], "df['Date \\\\ Party'] = pd.to_datetime(df['Date \\\\ Party'])", "Time-series analysis starts by parsing the date column."),
    codeQuestion(profile.id, `${profile.id}-head-a`, "Write code to display the first 10 rows of the polling dataset.", ["head", "10"], "df.head(10)", "The answer should use head(10)."),
    codeQuestion(profile.id, `${profile.id}-missing-a`, "Write code to display missing values for each column in the polling dataset.", ["isnull", "sum"], "df.isnull().sum()", "This checks whether the time series has missing values."),
    codeQuestion(profile.id, `${profile.id}-melt-a`, "Write code to reshape the polling dataset from wide to long format using party as a variable name and support as a value name.", ["melt", "party", "support"], "long_df = df.melt(id_vars='Date \\\\ Party', var_name='party', value_name='support')", "Melting the party columns makes grouped plotting easier."),
    codeQuestion(profile.id, `${profile.id}-means-a`, "Write code to calculate the mean support for each party.", ["mean", "groupby", "party"], "long_df.groupby('party')['support'].mean().sort_values(ascending=False)", "Mean support is a basic comparative summary."),
    codeQuestion(profile.id, `${profile.id}-leader-a`, "Write code to find the party with the highest average support.", ["idxmax", "mean"], "long_df.groupby('party')['support'].mean().idxmax()", "This identifies the leading party by average support."),
    codeQuestion(profile.id, `${profile.id}-rolling-a`, "Write code to calculate a 7-day rolling average for Workers' Party support.", ["rolling", "7", "Workers' Party"], "df[\"Workers' Party\"].rolling(7).mean()", "A rolling average is a common smoothing step."),
    codeQuestion(profile.id, `${profile.id}-plot-a`, "Write code to plot Workers' Party support against date.", ["plot", "Date \\ Party", "Workers' Party"], "plt.plot(df['Date \\\\ Party'], df[\"Workers' Party\"])\nplt.xlabel('Date')\nplt.ylabel(\"Workers' Party Support\")\nplt.show()", "The answer should produce a time-series plot."),
    codeQuestion(profile.id, `${profile.id}-xy-a`, "Write code to create X and y for predicting Workers' Party support using the other party columns as predictors.", ["drop", "Workers' Party", "X", "y"], "X = df.drop(columns=['Date \\\\ Party', \"Workers' Party\"])\ny = df[\"Workers' Party\"]", "This defines a simple regression setup."),
    codeQuestion(profile.id, `${profile.id}-split-a`, "Write code to split the polling data into training and testing sets.", ["train_test_split", "test_size", "0.2", "random_state", "42"], "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)", "This creates a simple baseline split, even though chronology should be discussed."),
    codeQuestion(profile.id, `${profile.id}-fit-a`, "Write code to create and fit a LinearRegression model named lm for predicting Workers' Party support.", ["LinearRegression", "lm", "fit"], "lm = LinearRegression()\nlm.fit(X_train, y_train)", "The answer should instantiate and fit the regression model."),
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to predict on the test set and compute RMSE and R2.", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "This follows the same regression-evaluation pattern as your mock exam style."),
    keywordQuestion(profile.id, `${profile.id}-chronology-a`, "Why is a random split not ideal for a real forecasting version of this polling task?", ["future", "leakage", "time", "chronology"], "A random split is weak for true forecasting because it can leak future dates into training instead of preserving chronological order.", "A correct answer should mention future leakage or chronology.", 2),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Why is converting the dataset from wide to long format useful?", ["plot", "compare", "party", "visual"], "Wide-to-long conversion makes it easier to compare parties, group results, and create cleaner visualisations.", "A good answer should mention comparison or plotting benefits.", 2),
    codeQuestion(profile.id, `${profile.id}-std-a`, "Write code to calculate the standard deviation of support for each party.", ["std", "sort_values"], "df.drop(columns=['Date \\\\ Party']).std().sort_values(ascending=False)", "Standard deviation helps identify the most volatile party."),
    codeQuestion(profile.id, `${profile.id}-sumcheck-a`, "Write code to check whether daily party percentages sum to about 100 for each row.", ["sum", "axis=1"], "df.drop(columns=['Date \\\\ Party']).sum(axis=1).head()", "This is a good data-understanding check for poll shares.")
  ]);
}

function build5002ExamPool(topic) {
  const pools = {
    complexity: dedupeById([
      keywordQuestion(topic.id, "complexity-pnp", "Question 1a. Do we know whether P and NP are the same? Give one example of a problem in class P and one in class NP.", ["open", "unknown", "sorting", "sat"], "It is still unknown whether P = NP. A problem in P is sorting. A problem in NP is SAT.", "A full answer should say the question is open and provide one defensible example for each class.", 3),
      tableQuestion(topic.id, "complexity-paper-growth-table", "Question 5 (16 marks). Assume that each of the expressions below gives the processing time spent by an algorithm for solving a problem of size n. Provide the Big O notation for each expression and state which of the curves in Figure 2 looks like the curve for the growth of the function.", buildComplexityWorksheetRows(), "A strong answer identifies the dominant term in each expression first, then matches that long-run growth to the correct curve shape in the figure.", "Work row by row: simplify each expression to its dominant growth term, then map that term to the correct curve by long-run steepness.", growthCurvesFigure()),
      shortQuestion(topic.id, "complexity-dominant", "Question 5a. What is the Big O of n^2(n^2 - 1)?", ["o(n^4)", "n^4"], "Expand mentally to n^4 - n^2, then keep the dominant term."),
      shortQuestion(topic.id, "complexity-sum", "Question 5b. What is the Big O of 5 + 8 + 11 + ... + (3n + 2)?", ["o(n^2)", "n^2"], "This arithmetic-series sum grows quadratically."),
      keywordQuestion(topic.id, "complexity-recurrence", "Question 4. The algorithm returns y = fun(n - 3) + fun(n - 2) + fun(n - 1) for n >= 4. What is the main task of the algorithm and why is its space complexity recursive rather than constant?", ["recurrence", "recursive", "stack", "calls"], "The algorithm defines a recurrence by summing three previous values. Its space complexity is recursive because each call places another frame on the call stack before returning.", "A strong answer should mention recursive stack growth.", 3, recurrenceAlgorithmFigure()),
      mcq(topic.id, "complexity-curve", "Question 5c. Which curve is the steepest long-run growth in the figure below?", ["Curve 1", "Curve 2", "Curve 3", "Curve 4"], 3, "The blue curve rises fastest and represents the steepest long-run growth.", growthCurvesFigure()),
      shortQuestion(topic.id, "complexity-curve-match", "Question 5d. Which curve best matches linear growth?", ["curve 1", "1"], "The shallow red line is the linear one.", growthCurvesFigure()),
      shortQuestion(topic.id, "complexity-big-o-cubic", "What is the Big O of 7n^3 + 2n + 1?", ["o(n^3)", "n^3"], "The cubic term dominates."),
      shortQuestion(topic.id, "complexity-big-o-linearithmic", "Which grows faster for large n: O(n log n) or O(n^2)?", ["o(n^2)", "n^2"], "Quadratic growth eventually beats linearithmic growth."),
      shortQuestion(topic.id, "complexity-big-o-factorial", "Which grows faster for large n: O(2^n) or O(n!)?", ["o(n!)", "n!"], "Factorial growth outruns exponential growth."),
      mcq(topic.id, "complexity-class-p", "Which of the following is a standard example of a problem in P?", ["SAT", "Hamiltonian cycle", "Sorting", "Travelling salesperson decision"], 2, "Sorting is a standard polynomial-time example."),
      mcq(topic.id, "complexity-class-np", "Which of the following is a standard NP problem?", ["Breadth-first search", "SAT", "Selection sort", "Merging two sorted lists"], 1, "SAT is a standard NP problem."),
      keywordQuestion(topic.id, "complexity-order-list", "List the usual Big O growth order from small to large covering constant, logarithmic, linear, linearithmic, quadratic, cubic, exponential and factorial.", ["1", "log", "n", "n log n", "n^2", "n^3", "2^n", "n!"], "A common order is O(1), O(log n), O(n), O(n log n), O(n^2), O(n^3), O(2^n), O(n!).", "The answer should present the sequence from smallest growth to largest.", 6),
      keywordQuestion(topic.id, "complexity-recurrence-base", "Why does a recursive algorithm need a base case?", ["stop", "recursion", "small", "known"], "A base case stops the recursion and provides a known answer for small input values.", "A strong answer should mention termination and known small cases.", 2),
      shortQuestion(topic.id, "complexity-big-o-log", "What is the Big O of binary search?", ["o(log n)", "log n"], "Binary search halves the search space each step."),
      shortQuestion(topic.id, "complexity-big-o-constant", "What is the Big O of accessing one array element by index?", ["o(1)", "1"], "Direct indexed access is constant time."),
      shortQuestion(topic.id, "complexity-geometric", "What is the Big O of 1 + 2 + 4 + ... + 2^n?", ["o(2^n)", "2^n"], "The largest term dominates the geometric sum."),
      mcq(topic.id, "complexity-graph-linear", "On the growth-curve figure, which curve looks linear?", ["Curve 1", "Curve 2", "Curve 3", "Curve 4"], 0, "Curve 1 is the shallow near-straight line."),
      mcq(topic.id, "complexity-graph-polynomial", "Which curve on the growth figure best matches a moderate polynomial growth?", ["Curve 1", "Curve 2", "Curve 3", "Curve 4"], 1, "Curve 2 shows a smoother polynomial-style rise."),
      keywordQuestion(topic.id, "complexity-p-vs-np-wording", "Why is saying 'P equals NP' in an exam answer usually too strong?", ["unknown", "open", "not proved"], "Because it has not been proved either way; the relationship remains an open problem.", "A correct answer should emphasise that it is unresolved.", 2),
      shortQuestion(topic.id, "complexity-expand", "What is the dominant term of n(n^2 - 1)?", ["n^3"], "Expanding gives n^3 - n, so n^3 dominates."),
      shortQuestion(topic.id, "complexity-arithmetic", "What is the Big O of 2 + 4 + 6 + ... + 2n?", ["o(n^2)", "n^2"], "This arithmetic-series sum grows quadratically."),
      mcq(topic.id, "complexity-growth-slowest", "Which of these grows the slowest for large n?", ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], 1, "Logarithmic growth is the slowest among these."),
      shortQuestion(topic.id, "complexity-big-o-constant-vs-linear", "Which grows faster for large n: O(1) or O(n)?", ["o(n)", "n"], "Linear growth eventually exceeds constant growth."),
      shortQuestion(topic.id, "complexity-big-o-nlogn", "What is the Big O of merge sort in the standard case?", ["o(n log n)", "n log n"], "Merge sort is typically O(n log n).")
    ]),
    searching: dedupeById([
      keywordQuestion(topic.id, "searching-paper-interpolation", "Question 3 (3 marks). Use interpolation search to find index of the entry in the following list with the value 30. Note that we already know that the list is sorted and is in increasing order. Write the first three values that we will look at in the process.", ["30", "14", "54"], "A strong answer shows the inspected values in the order produced by the interpolation-search probes.", "The marks are for the trace, not just the final hit, so write the inspected values in order.", 1, interpolationFigure()),
      shortQuestion(topic.id, "searching-postorder", "Question 2. Starting the post-order traversal count at 1, what count do we reach when visiting Afghan hound?", ["4", "four"], "The traversal visits Persian leopard, Bengal tiger, Panthera, then Afghan hound.", animalTreeFigure()),
      keywordQuestion(topic.id, "searching-list-matrix", "Question 1c. Is a linked list or a matrix data structure usually faster than a list for insert and delete operations? Give one application of hash tables.", ["linked list", "hash", "lookup"], "A linked list is usually better for insert or delete operations once a position is known, and hash tables are used for fast lookup such as dictionaries.", "A good answer should name linked lists and a hash-table application.", 2),
      keywordQuestion(topic.id, "searching-interpolation", "Question 3. Use interpolation search to find 30 in the displayed sorted list. State the first three values you inspect.", ["30", "14", "54"], "A common trace visits 30 after probing based on value distribution; depending on the exact calculation, the first inspected values are expected in order from the computed probe positions.", "This is a trace-style question, so the inspected values matter.", 1, interpolationFigure()),
      mcq(topic.id, "searching-hash", "Which of the following is the best typical use case for a hash table?", ["Depth-first traversal", "Fast key lookup", "Matrix multiplication", "In-order tree printing"], 1, "Hash tables are designed for fast key lookup."),
      keywordQuestion(topic.id, "searching-uniform", "Why does interpolation search work best on uniformly distributed sorted values?", ["position", "estimate", "uniform"], "Interpolation search estimates the likely position of the target from the value scale, so it works best when values are fairly uniformly distributed.", "The explanation should link value distribution to probe estimation.", 2),
      shortQuestion(topic.id, "searching-postorder-rule", "What is the visit order for post-order traversal?", ["left right root", "left, right, root"], "Post-order is left subtree, right subtree, then root."),
      shortQuestion(topic.id, "searching-preorder-rule", "What is the visit order for pre-order traversal?", ["root left right", "root, left, right"], "Pre-order is root, then left subtree, then right subtree."),
      shortQuestion(topic.id, "searching-inorder-rule", "What is the visit order for in-order traversal?", ["left root right", "left, root, right"], "In-order is left subtree, then root, then right subtree."),
      mcq(topic.id, "searching-matrix-dense", "Which graph representation is usually better for a dense graph?", ["Adjacency list", "Adjacency matrix", "Stack", "Queue"], 1, "Adjacency matrices suit dense graphs well."),
      mcq(topic.id, "searching-list-sparse", "Which graph representation is usually better for a sparse graph?", ["Adjacency list", "Adjacency matrix", "Binary heap", "Hash set"], 0, "Adjacency lists avoid storing many empty edge positions."),
      shortQuestion(topic.id, "searching-hash-application", "Name one practical application of hash tables.", ["dictionary", "cache", "symbol table", "lookup table"], "Any correct fast-lookup application is acceptable."),
      keywordQuestion(topic.id, "searching-interpolation-steps", "Why should you write the inspected values in order when tracing interpolation search?", ["trace", "order", "probe", "steps"], "Because the marks are usually attached to the actual probe sequence, not just the final answer.", "A strong answer should mention the order of probe positions or inspected values.", 2),
      shortQuestion(topic.id, "searching-linkedlist-insert", "Which structure is usually easier for insertion after a known node: linked list or array-style list?", ["linked list"], "A linked list avoids shifting later elements."),
      shortQuestion(topic.id, "searching-linkedlist-delete", "Which structure is usually easier for deletion after a known node: linked list or array-style list?", ["linked list"], "A linked list can relink around the removed node."),
      mcq(topic.id, "searching-hash-collision", "What is a collision in a hash table?", ["Two keys map to the same slot", "A key is too large", "The table is sorted", "A linked list becomes circular"], 0, "A collision means multiple keys map to the same hash position."),
      shortQuestion(topic.id, "searching-chain", "Name one common way to handle collisions in a hash table.", ["chaining", "open addressing"], "Chaining and open addressing are both standard answers."),
      mcq(topic.id, "searching-random-access", "Which structure usually offers better random access by index?", ["Linked list", "Array or matrix", "Hash collision chain", "Thread"], 1, "Arrays and matrices support direct indexed access."),
      shortQuestion(topic.id, "searching-postorder-last", "In post-order traversal, when is the root visited?", ["last", "after both subtrees"], "The root is visited after the left and right subtrees."),
      shortQuestion(topic.id, "searching-preorder-first", "In pre-order traversal, when is the root visited?", ["first", "before both subtrees"], "The root is visited before the subtrees."),
      shortQuestion(topic.id, "searching-inorder-middle", "In in-order traversal, when is the root visited?", ["between", "after left before right"], "The root is visited between the left and right subtrees."),
      keywordQuestion(topic.id, "searching-matrix-check", "Why can an adjacency matrix be convenient even though it may use more space?", ["check", "constant time", "adjacent"], "It allows a direct constant-time adjacency check for a given pair of vertices.", "The answer should mention direct adjacency checking.", 2),
      mcq(topic.id, "searching-hash-best", "Which operation is a hash table especially good at on average?", ["Repeated path traversal", "Fast key-based lookup", "Recursive partitioning", "Matrix exponentiation"], 1, "Fast key-based lookup is the main strength."),
      shortQuestion(topic.id, "searching-search-condition", "What two conditions make interpolation search a sensible choice?", ["sorted", "uniform"], "The data should be sorted and reasonably uniformly distributed."),
      keywordQuestion(topic.id, "searching-trace-count", "Why should you respect whether counting starts at 0 or 1 in a traversal question?", ["mark", "position", "count"], "Because the visit number changes and the final counted answer can be off by one if you ignore the starting convention.", "A correct answer should mention off-by-one errors.", 2),
      mcq(topic.id, "searching-postorder-last-mcq", "In post-order traversal, the root is visited:", ["First", "Second", "Last", "Never"], 2, "Post-order visits the root last."),
      shortQuestion(topic.id, "searching-binary-tree-three-orders", "Name the three standard depth-first binary-tree traversals.", ["preorder inorder postorder", "pre-order in-order post-order"], "The three standard DFS traversals are pre-order, in-order, and post-order.")
    ]),
    concurrency: dedupeById([
      keywordQuestion(topic.id, "concurrency-diff", "Question 1b. What is the difference between multithreading and multiprocessing?", ["shared memory", "threads", "processes", "separate"], "Multithreading uses multiple threads within one process and usually shares memory. Multiprocessing uses separate processes with separate address spaces.", "A complete answer should mention the memory model difference.", 3),
      shortQuestion(topic.id, "concurrency-problem", "Question 6a. What is the name of the problem caused by running the threaded code below?", ["race condition"], "Two threads update shared state without synchronisation.", raceConditionFigure()),
      keywordQuestion(topic.id, "concurrency-fix", "Question 6b. After importing Lock, what else do you need to add and where should the lock be used?", ["lock", "instance", "critical section", "acquire", "with"], "Create a Lock instance, then protect the score updates inside the critical section, for example with `with lock:` above the shared-state updates.", "A strong answer should mention creating the lock object and using it around the shared updates.", 3),
      mcq(topic.id, "concurrency-join", "What does join() do on a thread?", ["Creates a new thread", "Waits for the thread to finish", "Locks the variable", "Restarts the thread"], 1, "join() blocks until the target thread finishes."),
      keywordQuestion(topic.id, "concurrency-critical", "Why should only the critical section be protected by a lock?", ["shared", "state", "contention", "performance"], "Only the shared-state update needs the lock; keeping the lock scope small reduces contention and avoids unnecessary blocking.", "The answer should connect lock scope to shared-state protection and reduced contention.", 2),
      shortQuestion(topic.id, "concurrency-name", "What kind of variable often appears in concurrency exam questions as shared mutable state?", ["global variable", "shared variable", "global"], "Global or otherwise shared mutable variables are common because they expose race conditions."),
      shortQuestion(topic.id, "concurrency-lock-object", "After importing Lock, what must you still create before using it?", ["lock instance", "lock object", "lock"], "You must create a Lock instance or lock object."),
      mcq(topic.id, "concurrency-with-lock", "What does `with lock:` do?", ["Starts a new thread", "Acquires and releases the lock around the block", "Deletes the lock", "Copies shared memory"], 1, "The context manager acquires the lock for the block and releases it afterwards."),
      shortQuestion(topic.id, "concurrency-start", "What does start() do on a thread?", ["begins execution", "runs the target", "starts the thread"], "It starts the thread running its target function."),
      shortQuestion(topic.id, "concurrency-shared-state", "What is shared mutable state?", ["data shared by threads", "shared variable"], "It is data that multiple threads can read and modify."),
      keywordQuestion(topic.id, "concurrency-lost-update", "Why can the final value of a shared score be wrong even if both thread functions look valid on their own?", ["interleave", "overwrite", "shared", "update"], "Because their reads and writes can interleave so one update overwrites the other.", "The answer should mention interleaving or overwriting.", 2),
      mcq(topic.id, "concurrency-race-choice", "Which issue is most likely if two threads update the same variable without a lock?", ["Balanced partitioning", "Race condition", "Binary search", "Recurrence overflow"], 1, "Unsynchronised shared updates create race conditions."),
      shortQuestion(topic.id, "concurrency-join-purpose", "Why is join() useful before printing a final shared result?", ["wait", "finish"], "It ensures the worker threads finish before the result is read."),
      keywordQuestion(topic.id, "concurrency-lock-lines", "Where should a lock be placed in a score-update question?", ["around", "shared", "update", "critical"], "The lock should surround the lines that read or write the shared score variable.", "The answer should identify the critical update lines.", 2),
      shortQuestion(topic.id, "concurrency-memory", "Which model usually shares memory directly: multithreading or multiprocessing?", ["multithreading"], "Threads in the same process usually share memory."),
      shortQuestion(topic.id, "concurrency-separate-memory", "Which model usually uses separate address spaces: multithreading or multiprocessing?", ["multiprocessing"], "Separate processes usually have separate address spaces."),
      mcq(topic.id, "concurrency-critical-section", "What is a critical section?", ["A recursive base case", "The part of code that accesses shared state", "A graph edge", "A sorting pivot"], 1, "The critical section is the shared-state code that must be protected."),
      keywordQuestion(topic.id, "concurrency-small-lock", "Why should lock scope stay small?", ["reduce", "blocking", "contention"], "Small lock scope reduces blocking and unnecessary contention.", "A correct answer should mention contention or blocking.", 2),
      shortQuestion(topic.id, "concurrency-deadlock-diff", "What is the key difference between deadlock and a race condition?", ["deadlock waits forever", "race unpredictable"], "Deadlock blocks progress, while a race condition causes unpredictable results."),
      mcq(topic.id, "concurrency-target", "What is the thread target?", ["The lock instance", "The function the thread runs", "The output variable", "The scheduler"], 1, "The target is the function executed by the thread."),
      shortQuestion(topic.id, "concurrency-protect", "What tool is typically used in Python threading to protect shared updates?", ["lock"], "A lock is the standard protection mechanism."),
      keywordQuestion(topic.id, "concurrency-score-example", "Why are score or balance examples common in concurrency exams?", ["shared", "updates", "easy", "see"], "They make shared updates and lost-write problems easy to see.", "A strong answer should mention visible shared updates.", 2),
      shortQuestion(topic.id, "concurrency-order", "What should you identify first in a threaded-code debugging question?", ["shared variable", "critical section"], "Identify the shared variable and the lines that modify it."),
      mcq(topic.id, "concurrency-thread-safe", "What does thread-safe code aim to ensure?", ["Faster recursion", "Correct behaviour under concurrent execution", "Larger Big O", "Matrix symmetry"], 1, "Thread-safe code behaves correctly when multiple threads run."),
      shortQuestion(topic.id, "concurrency-lock-purpose", "What is the main purpose of a lock?", ["protect shared state", "mutual exclusion", "one thread at a time"], "A lock enforces mutual exclusion around shared-state updates.")
    ]),
    graphs: dedupeById([
      keywordQuestion(topic.id, "graphs-quicksort", "Question 7. Write the main steps of in-place quick sort in pseudocode.", ["pivot", "partition", "swap", "recursive"], "Choose a pivot, partition the array in place so smaller values move left and larger values move right, then recursively sort the two subarrays.", "A strong answer should mention pivot selection, partitioning, and recursive calls.", 3),
      keywordQuestion(topic.id, "graphs-quicksort-increasing", "Write pseudocode for increasing in-place quick sort.", ["pivot", "partition", "swap", "smaller", "recursive"], "Choose a pivot, move smaller values to the left and larger values to the right, then recursively sort both partitions so the final order is increasing.", "A strong answer should mention that the comparison keeps smaller values on the left for increasing order.", 3),
      keywordQuestion(topic.id, "graphs-quicksort-decreasing", "Write pseudocode for decreasing in-place quick sort.", ["pivot", "partition", "swap", "larger", "recursive"], "Choose a pivot, move larger values to the left and smaller values to the right, then recursively sort both partitions so the final order is decreasing.", "A strong answer should mention reversing the comparison so larger values move left for decreasing order.", 3),
      keywordQuestion(topic.id, "graphs-quicksort-outofplace", "Write the main steps of out-of-place quick sort in pseudocode.", ["pivot", "lower", "higher", "equal", "recursive"], "Choose a pivot, split the input into lower, equal, and higher collections, recursively sort the lower and higher parts, then concatenate the results.", "A strong answer should mention separate collections around the pivot and recursive sorting of those collections.", 3),
      keywordQuestion(topic.id, "graphs-quicksort-outofplace-increasing", "Write pseudocode for increasing out-of-place quick sort.", ["pivot", "lower", "higher", "equal", "concatenate"], "Choose a pivot, build lower, equal, and higher collections, recursively sort lower then higher, and concatenate lower + equal + higher to get increasing order.", "A strong answer should mention the concatenate order lower, equal, higher for increasing order.", 3),
      keywordQuestion(topic.id, "graphs-quicksort-outofplace-decreasing", "Write pseudocode for decreasing out-of-place quick sort.", ["pivot", "lower", "higher", "equal", "concatenate"], "Choose a pivot, build lower, equal, and higher collections, recursively sort them, and concatenate higher + equal + lower to get decreasing order.", "A strong answer should mention the concatenate order higher, equal, lower for decreasing order.", 3),
      keywordQuestion(topic.id, "graphs-mergesort-inplace", "Write the main steps of in-place merge sort in pseudocode.", ["split", "recursive", "merge", "same array"], "Split the array recursively, sort both halves, then merge them while reusing the same array storage as much as possible.", "A good answer should mention recursive splitting and in-array merging.", 3),
      keywordQuestion(topic.id, "graphs-mergesort-inplace-increasing", "Write pseudocode for increasing in-place merge sort.", ["split", "recursive", "merge", "smaller first"], "Split the array recursively, sort both halves, then merge them back into the same array by taking the smaller next value first so the final order is increasing.", "A strong answer should mention that the merge step picks the smaller next value for increasing order.", 3),
      keywordQuestion(topic.id, "graphs-mergesort-inplace-decreasing", "Write pseudocode for decreasing in-place merge sort.", ["split", "recursive", "merge", "larger first"], "Split the array recursively, sort both halves, then merge them back into the same array by taking the larger next value first so the final order is decreasing.", "A strong answer should mention that the merge step picks the larger next value for decreasing order.", 3),
      keywordQuestion(topic.id, "graphs-mergesort-outofplace", "Write the main steps of out-of-place merge sort in pseudocode.", ["split", "recursive", "merge", "temporary"], "Split the array into halves, recursively sort them, then merge them using a temporary array or list.", "A good answer should mention recursive splitting and temporary storage in the merge step.", 3),
      keywordQuestion(topic.id, "graphs-mergesort-outofplace-increasing", "Write pseudocode for increasing out-of-place merge sort.", ["split", "recursive", "merge", "temporary", "smaller first"], "Split the array, recursively sort both halves, then merge into a temporary array by repeatedly taking the smaller next item first.", "A strong answer should mention smaller-first comparisons during the merge.", 3),
      keywordQuestion(topic.id, "graphs-mergesort-outofplace-decreasing", "Write pseudocode for decreasing out-of-place merge sort.", ["split", "recursive", "merge", "temporary", "larger first"], "Split the array, recursively sort both halves, then merge into a temporary array by repeatedly taking the larger next item first.", "A strong answer should mention larger-first comparisons during the merge.", 3),
      keywordQuestion(topic.id, "graphs-insertionsort-inplace", "Write the main steps of in-place insertion sort in pseudocode.", ["key", "shift", "insert", "sorted prefix"], "Move left to right, take the current key, shift larger elements in the sorted prefix one place right, then insert the key into the gap.", "A strong answer should mention the key, shifts, and sorted prefix.", 3),
      keywordQuestion(topic.id, "graphs-insertionsort-inplace-increasing", "Write pseudocode for increasing in-place insertion sort.", ["key", "shift", "larger", "insert"], "Scan left to right, take the key, shift larger earlier items rightward, and insert the key so the array becomes increasing.", "A strong answer should mention shifting larger items to make room for increasing order.", 3),
      keywordQuestion(topic.id, "graphs-insertionsort-inplace-decreasing", "Write pseudocode for decreasing in-place insertion sort.", ["key", "shift", "smaller", "insert"], "Scan left to right, take the key, shift smaller earlier items rightward, and insert the key so the array becomes decreasing.", "A strong answer should mention reversing the comparison so smaller items are shifted for decreasing order.", 3),
      keywordQuestion(topic.id, "graphs-insertionsort-outofplace", "Write the main steps of out-of-place insertion sort in pseudocode.", ["new list", "insert", "sorted output"], "Create a new sorted output list and insert each next item into its correct position in that output structure.", "A strong answer should mention building and maintaining a separate sorted output structure.", 3),
      keywordQuestion(topic.id, "graphs-insertionsort-outofplace-increasing", "Write pseudocode for increasing out-of-place insertion sort.", ["new list", "insert", "sorted output", "ascending"], "Create a new sorted list and insert each item into the correct ascending position in that output list.", "A strong answer should mention inserting into the correct ascending position in the new list.", 3),
      keywordQuestion(topic.id, "graphs-insertionsort-outofplace-decreasing", "Write pseudocode for decreasing out-of-place insertion sort.", ["new list", "insert", "sorted output", "descending"], "Create a new sorted list and insert each item into the correct descending position in that output list.", "A strong answer should mention inserting into the correct descending position in the new list.", 3),
      keywordQuestion(topic.id, "graphs-bubblesort-inplace", "Write the main steps of in-place bubble sort in pseudocode.", ["adjacent", "swap", "passes"], "Make repeated passes through the same array, compare adjacent elements, and swap them in place when they are out of order.", "A strong answer should mention repeated passes and adjacent swaps.", 3),
      keywordQuestion(topic.id, "graphs-bubblesort-inplace-increasing", "Write pseudocode for increasing in-place bubble sort.", ["adjacent", "swap", "passes", "greater"], "Make repeated passes through the array and swap adjacent elements whenever the left element is greater than the right so the result becomes increasing.", "A strong answer should mention the comparison for increasing order.", 3),
      keywordQuestion(topic.id, "graphs-bubblesort-inplace-decreasing", "Write pseudocode for decreasing in-place bubble sort.", ["adjacent", "swap", "passes", "smaller"], "Make repeated passes through the array and swap adjacent elements whenever the left element is smaller than the right so the result becomes decreasing.", "A strong answer should mention the reversed comparison for decreasing order.", 3),
      keywordQuestion(topic.id, "graphs-bubblesort-outofplace", "Write the main steps of out-of-place bubble sort in pseudocode.", ["new array", "copy", "adjacent", "pass"], "Perform bubble-style passes while writing the current ordering into another array or buffer instead of doing all swaps directly in the original one.", "A good answer should mention adjacent comparisons and use of separate storage.", 3),
      keywordQuestion(topic.id, "graphs-bubblesort-outofplace-increasing", "Write pseudocode for increasing out-of-place bubble sort.", ["new array", "copy", "adjacent", "ascending"], "Perform bubble-style passes with adjacent comparisons, writing each pass into another array or buffer so the final result is in increasing order.", "A strong answer should mention adjacent comparisons plus increasing-order output in a separate structure.", 3),
      keywordQuestion(topic.id, "graphs-bubblesort-outofplace-decreasing", "Write pseudocode for decreasing out-of-place bubble sort.", ["new array", "copy", "adjacent", "descending"], "Perform bubble-style passes with adjacent comparisons, writing each pass into another array or buffer so the final result is in decreasing order.", "A strong answer should mention adjacent comparisons plus decreasing-order output in a separate structure.", 3),
      keywordQuestion(topic.id, "graphs-paper-greedy", "Question 8 (25 marks). Consider simple graphs that their edges are labelled by positive integers. One such example is shown in Figure 3. A fixed number N is given. A path is legal if it does not intersect itself and sum of labels of its edges does not exceed N. Write a pseudocode for a greedy algorithm that receives such a graph, two vertices and a value for N, then constructs only one legal path between the two vertices if there exists any.", ["greedy", "path", "sum", "legal", "visited", "N"], "A strong answer states a greedy selection rule, tracks the running sum of edge labels, avoids revisiting vertices, and returns one legal path if it finds one.", "State the local choice rule explicitly, then track the running sum and legality after every edge.", 4, labelledGraphFigure()),
      keywordQuestion(topic.id, "graphs-greedy", "Question 8. For the labelled graph below, what should a greedy algorithm prioritise when constructing a legal path under a maximum total label N?", ["smallest", "legal", "sum", "unvisited"], "At each step it should choose a legal outgoing edge that keeps the total label sum within N while moving toward the target without revisiting vertices.", "The answer should mention legal edges, the running sum constraint, and avoiding revisits.", 3, labelledGraphFigure()),
      shortQuestion(topic.id, "graphs-quicksort-order", "What does non-decreasing order mean in a sorting question?", ["increasing with ties allowed", "sorted ascending", "ascending"], "Values must not decrease from left to right; equal values are allowed."),
      mcq(topic.id, "graphs-greedy-choice", "Which statement best matches a greedy algorithm?", ["It explores all possibilities before deciding", "It makes a locally best legal choice at each step", "It always uses recursion", "It requires dynamic programming"], 1, "Greedy algorithms choose the best local legal move according to a rule."),
      keywordQuestion(topic.id, "graphs-legality", "Why must the graph path remain legal at every step, not only at the end?", ["constraint", "sum", "path", "exceed"], "Because once the running edge-label sum exceeds the limit or the path breaks the rules, the path is invalid even if later steps would look promising.", "A correct answer should mention maintaining the constraint throughout construction.", 2),
      shortQuestion(topic.id, "graphs-pivot-role", "What is the role of the pivot in quick sort?", ["partition", "split"], "The pivot is the reference value used to partition the array into smaller and larger sides."),
      shortQuestion(topic.id, "graphs-quicksort-outofplace-space", "Why does out-of-place quick sort usually use more space than in-place quick sort?", ["extra arrays", "extra lists", "separate partitions"], "It stores separate partitions instead of rearranging only the original array."),
      shortQuestion(topic.id, "graphs-nondecreasing", "What does non-decreasing order mean?", ["ascending", "ties allowed", "equal or increase"], "Values stay the same or increase from left to right."),
      keywordQuestion(topic.id, "graphs-partition-purpose", "What does the partition step achieve in quick sort?", ["pivot", "smaller", "larger", "split"], "Partitioning rearranges the array so elements are split around the pivot into smaller and larger sides.", "A correct answer should mention splitting around the pivot.", 2),
      shortQuestion(topic.id, "graphs-mergesort-outofplace-space", "Why is standard merge sort usually considered out-of-place?", ["temporary array", "extra storage", "merge buffer"], "It normally uses extra temporary storage while merging sorted halves."),
      shortQuestion(topic.id, "graphs-mergesort-inplace-hard", "Why is in-place merge sort harder to implement than out-of-place merge sort?", ["same array", "harder movement", "complex merge"], "Because merging while reusing the same array storage makes element movement more complex."),
      shortQuestion(topic.id, "graphs-base-case", "What is the base case for recursive quick sort on a subarray?", ["size 0 or 1", "left >= right"], "A subarray of size zero or one is already sorted."),
      shortQuestion(topic.id, "graphs-insertionsort-inplace-space", "Why is insertion sort usually considered in-place?", ["same array", "constant extra space", "shift"], "It shifts values inside the same array and uses only a small amount of extra space."),
      shortQuestion(topic.id, "graphs-bubblesort-inplace-space", "Why is bubble sort usually considered in-place?", ["swap in same array", "constant extra space", "adjacent"], "It repeatedly swaps adjacent items directly inside the original array."),
      mcq(topic.id, "graphs-greedy-local", "Which description best fits a greedy step?", ["Choose the locally best legal move", "Try every path", "Always recurse three times", "Sort all vertices first"], 0, "A greedy algorithm chooses the locally best legal move."),
      mcq(topic.id, "graphs-merge-sort-storage", "Which sorting algorithm is most commonly taught in an out-of-place form because of its merge buffer?", ["Bubble sort", "Insertion sort", "Merge sort", "Selection sort"], 2, "Standard merge sort usually uses extra temporary storage while merging."),
      mcq(topic.id, "graphs-insertion-prefix", "Which sorting algorithm grows a sorted prefix one element at a time?", ["Bubble sort", "Insertion sort", "Quick sort", "Hash sort"], 1, "Insertion sort grows a sorted prefix."),
      mcq(topic.id, "graphs-bubble-adjacent", "Which sorting algorithm is characterised by repeated adjacent comparisons and swaps?", ["Merge sort", "Quick sort", "Bubble sort", "Depth-first sort"], 2, "Bubble sort repeatedly compares adjacent elements."),
      keywordQuestion(topic.id, "graphs-running-sum", "What extra value should a legal-path algorithm track in this graph style of question?", ["sum", "labels", "running"], "It should track the running total of edge labels so it never exceeds the limit.", "The answer should mention the running label sum.", 2),
      shortQuestion(topic.id, "graphs-avoid-repeat", "Why might a path algorithm need to track visited vertices?", ["avoid repeats", "prevent cycles"], "To stop the path repeating vertices or creating an illegal cycle."),
      shortQuestion(topic.id, "graphs-output", "What should a graph-path pseudocode output if no legal path exists?", ["no path", "failure"], "It should clearly report failure or that no legal path exists."),
      keywordQuestion(topic.id, "graphs-recursive-bounds", "What bounds should recursive quick sort calls use after partitioning?", ["left", "right", "pivot"], "They should recurse on the left partition and right partition around the pivot position.", "A good answer should mention left and right partitions relative to the pivot.", 2),
      mcq(topic.id, "graphs-inplace", "Why is the given quick sort called in-place?", ["It uses a queue", "It rearranges elements inside the original array", "It always chooses the first vertex", "It uses matrix storage"], 1, "In-place means the algorithm reorders the original array directly."),
      shortQuestion(topic.id, "graphs-swap", "What is a swap in sorting?", ["exchange two elements", "exchange positions"], "A swap exchanges the positions of two elements."),
      keywordQuestion(topic.id, "graphs-greedy-risk", "Why is a greedy choice not automatically globally optimal?", ["local", "global", "may block"], "A locally good choice can still block the best full solution later.", "The answer should distinguish local and global quality.", 2),
      shortQuestion(topic.id, "graphs-legal-step", "What must remain true after every chosen edge in a legal-path algorithm?", ["still legal", "sum within limit"], "The path must still satisfy the legality rules after each step."),
      mcq(topic.id, "graphs-pseudocode-style", "Which is most important in a long pseudocode answer?", ["Clear steps and named variables", "Decorative formatting", "Using only one line", "Avoiding conditions"], 0, "Clear steps and named variables make the algorithm understandable and markable."),
      keywordQuestion(topic.id, "graphs-pivot-bad", "Why can a poor pivot make quick sort slow?", ["unbalanced", "partitions", "recursion"], "A poor pivot can create very unbalanced partitions and increase recursion depth and work.", "The answer should mention unbalanced partitions.", 2),
      shortQuestion(topic.id, "graphs-greedy-rule", "What should a strong greedy-algorithm answer state explicitly?", ["selection rule", "how choose"], "It should state the local selection rule clearly."),
      shortQuestion(topic.id, "graphs-initialise", "What should you initialise before building a legal path?", ["current node", "sum", "path"], "Initialise the starting node, the running sum, and the current path."),
      mcq(topic.id, "graphs-quicksort-after", "After partitioning in quick sort, what happens next?", ["Stop immediately", "Recursively sort both partitions", "Hash the array", "Start new threads"], 1, "Quick sort recursively sorts the two partitions."),
      keywordQuestion(topic.id, "graphs-legal-output", "What two things are useful in the output of a legal-path algorithm?", ["path", "whether found", "success"], "Return whether a legal path was found and the path itself if it exists.", "A strong answer should mention success or failure plus the path.", 2),
      shortQuestion(topic.id, "graphs-quicksort-base-condition", "When should quick sort stop recursing on a subarray?", ["left >= right", "size 0 or 1"], "It stops when the subarray has at most one element."),
      shortQuestion(topic.id, "graphs-merge-sort-core", "What is the core idea of merge sort?", ["split", "sort halves", "merge"], "Split the input, sort both halves, then merge them."),
      shortQuestion(topic.id, "graphs-insertion-sort-core", "What is the core idea of insertion sort?", ["sorted prefix", "insert"], "Grow a sorted prefix by inserting each new element into the correct position."),
      shortQuestion(topic.id, "graphs-bubble-sort-core", "What is the core idea of bubble sort?", ["adjacent", "swap", "passes"], "Repeatedly compare adjacent items and swap them over multiple passes.")
    ])
  };

  return pools[topic.id];
}

function generateFlashcardDeck() {
  const selected = flashcardDatasetSelect.value;
  const count = clamp(parseInt(flashcardCountInput.value, 10) || 12, 6, 20);
  const poolMap = flashcardPools[currentModuleId];
  const items = getModule().items;
  let cards = [];

  if (selected === "all") {
    const base = Math.floor(count / items.length);
    const remainder = count % items.length;
    items.forEach((item, index) => {
      const requested = base + (index < remainder ? 1 : 0);
      if (requested > 0) {
        cards = cards.concat(getUniqueItems(poolMap[item.id], "flashcards", currentModuleId, item.id, requested));
      }
    });
    cards = shuffle(cards).slice(0, count);
  } else {
    cards = getUniqueItems(poolMap[selected], "flashcards", currentModuleId, selected, count);
  }

  const label = selected === "all" ? getModule().allLabel : getItem(selected).name;
  currentFlashcardSession = {
    id: createAttemptId("flashcard"),
    type: "flashcard",
    moduleId: currentModuleId,
    moduleName: getModule().name,
    scopeId: selected,
    scopeName: label,
    startedAt: new Date().toISOString(),
    cards: cards.map((card) => ({ ...card, selfCheck: null, revealed: false })),
    index: 0,
    completed: false
  };

  flashcardEmpty.classList.add("hidden");
  flashcardSession.classList.remove("hidden");
  renderFlashcard();
  currentViewId = "flashcards";
  setActiveView(currentViewId);
}

function showFlashcardLoading(title, copy) {
  flashcardLoadingTitle.textContent = title;
  flashcardLoadingCopy.textContent = copy;
  flashcardEmpty.classList.add("hidden");
  flashcardSession.classList.add("hidden");
  flashcardLoading.classList.remove("hidden");
}

function hideFlashcardLoading() {
  flashcardLoading.classList.add("hidden");
}

function renderFlashcard() {
  if (!currentFlashcardSession || currentFlashcardSession.cards.length === 0) {
    return;
  }

  const current = currentFlashcardSession.cards[currentFlashcardSession.index];
  const questionHistory = getQuestionHistoryStatus(current.question);
  flashcardTitle.textContent = `${currentFlashcardSession.moduleName} ${currentFlashcardSession.scopeName} Deck`;
  flashcardMeta.textContent = `${currentFlashcardSession.cards.length} cards generated on ${formatDate(currentFlashcardSession.startedAt)}`;
  flashcardSeenNotice.innerHTML = renderSeenNotice(questionHistory);
  flashcardProgress.textContent = `${currentFlashcardSession.index + 1} / ${currentFlashcardSession.cards.length}`;
  flashcardQuestion.textContent = current.question;
  flashcardAnswer.textContent = current.answer;

  if (current.revealed || current.selfCheck) {
    flashcardAnswerWrap.classList.remove("hidden");
    revealFlashcardBtn.classList.add("hidden");
    markFlashcardRightBtn.classList.remove("hidden");
    markFlashcardWrongBtn.classList.remove("hidden");
  } else {
    flashcardAnswerWrap.classList.add("hidden");
    revealFlashcardBtn.classList.remove("hidden");
    markFlashcardRightBtn.classList.add("hidden");
    markFlashcardWrongBtn.classList.add("hidden");
  }

  prevFlashcardBtn.disabled = currentFlashcardSession.index === 0;
  const isLastCard = currentFlashcardSession.index === currentFlashcardSession.cards.length - 1;
  nextFlashcardBtn.classList.toggle("hidden", isLastCard);
  submitFlashcardsBtn.classList.toggle("hidden", !isLastCard);
  renderFlashcardReview();
}

function revealFlashcard() {
  if (!currentFlashcardSession) {
    return;
  }
  currentFlashcardSession.cards[currentFlashcardSession.index].revealed = true;
  renderFlashcard();
}

function markFlashcard(isRight) {
  if (!currentFlashcardSession) {
    return;
  }
  const current = currentFlashcardSession.cards[currentFlashcardSession.index];
  current.revealed = true;
  current.selfCheck = isRight ? "right" : "wrong";
  renderFlashcard();
}

function moveFlashcard(direction) {
  if (!currentFlashcardSession) {
    return;
  }
  const nextIndex = currentFlashcardSession.index + direction;
  if (nextIndex < 0 || nextIndex >= currentFlashcardSession.cards.length) {
    return;
  }
  currentFlashcardSession.index = nextIndex;
  renderFlashcard();
}

function renderFlashcardReview() {
  if (!currentFlashcardSession) {
    flashcardReviewList.innerHTML = "";
    return;
  }

  flashcardReviewList.innerHTML = currentFlashcardSession.cards.map((card, index) => `
    <article class="review-item ${card.selfCheck || ""}">
      <p><strong>${index + 1}.</strong> ${escapeHtml(card.question)}</p>
      <p>${card.selfCheck === "right" ? "Marked correct" : card.selfCheck === "wrong" ? "Marked incorrect" : "Not answered yet"}</p>
    </article>
  `).join("");
}

function submitFlashcardDeck() {
  if (!currentFlashcardSession || currentFlashcardSession.completed) {
    return;
  }

  const attempt = {
    id: currentFlashcardSession.id,
    type: "flashcard",
    moduleId: currentFlashcardSession.moduleId,
    moduleName: currentFlashcardSession.moduleName,
    scopeId: currentFlashcardSession.scopeId,
    scopeName: currentFlashcardSession.scopeName,
    createdAt: new Date().toISOString(),
    score: currentFlashcardSession.cards.filter((card) => card.selfCheck === "right").length,
    total: currentFlashcardSession.cards.length,
    questions: currentFlashcardSession.cards.map((card) => ({
      prompt: card.question,
      userAnswer: card.selfCheck === "right" ? "Marked as correct" : card.selfCheck === "wrong" ? "Marked as incorrect" : "Not answered",
      correctAnswer: card.answer,
      explanation: card.answer,
      correct: card.selfCheck === "right"
    }))
  };

  state.history.unshift(attempt);
  saveState();
  currentFlashcardSession.completed = true;
  currentFlashcardSession = null;
  flashcardSession.classList.add("hidden");
  flashcardEmpty.classList.remove("hidden");
  flashcardReviewList.innerHTML = "";
  renderHistory();
}

function generateExam() {
  const selected = examDatasetSelect.value;
  const count = clamp(parseInt(examCountInput.value, 10) || 10, 6, 14);
  const poolMap = examPools[currentModuleId];
  const items = getModule().items;
  let questions = [];
  let paperStyle = false;
  let actualMockMeta = null;

  if (selected === "actual-mock") {
    actualMockMeta = buildActualMockExam(currentModuleId);
    questions = actualMockMeta.questions;
    paperStyle = true;
  } else if (selected === "all") {
    const base = Math.floor(count / items.length);
    const remainder = count % items.length;
    items.forEach((item, index) => {
      const requested = base + (index < remainder ? 1 : 0);
      if (requested > 0) {
        questions = questions.concat(getUniqueItems(poolMap[item.id], "exams", currentModuleId, item.id, requested));
      }
    });
    questions = shuffle(questions).slice(0, count).map((question) => ({ ...question }));
  } else {
    questions = getUniqueItems(poolMap[selected], "exams", currentModuleId, selected, count).map((question) => ({ ...question }));
  }

  const label = selected === "actual-mock"
    ? "Actual Mock"
    : selected === "all"
      ? getModule().allLabel
      : getItem(selected).name;
  currentExamSession = {
    id: createAttemptId("exam"),
    type: "exam",
    moduleId: currentModuleId,
    moduleName: getModule().name,
    scopeId: selected,
    scopeName: label,
    startedAt: new Date().toISOString(),
    questions,
    paperStyle,
    paperId: actualMockMeta ? actualMockMeta.paperId : null,
    totalPapers: actualMockMeta ? actualMockMeta.totalPapers : null
  };

  examEmpty.classList.add("hidden");
  examForm.classList.remove("hidden");
  examResults.classList.add("hidden");
  examForm.classList.toggle("paper-mode", paperStyle);
  examTitle.textContent = `${currentExamSession.moduleName} ${label} Mock Exam`;
  examMeta.textContent = selected === "actual-mock"
    ? currentModuleId === "5002cmd"
      ? `Paper-style practice exam modelled on the uploaded 2025 practice paper. Paper ${currentExamSession.paperId} of ${currentExamSession.totalPapers}.`
      : "Paper-style practice exam with a fixed exam-paper layout."
    : selected === "all"
      ? `Mixed paper across ${getModule().name}`
      : `${label} focus paper`;
  examQuestionCount.textContent = `${questions.length} questions`;
  examQuestions.innerHTML = `${paperStyle ? renderExamPaperHeader(currentExamSession) : ""}${questions.map((question, index) => renderExamQuestion(question, index, currentExamSession)).join("")}`;
  bindHintButtons();
  currentViewId = "exams";
  setActiveView(currentViewId);
}

function showExamLoading(title, copy) {
  examEmpty.classList.add("hidden");
  examForm.classList.add("hidden");
  examResults.classList.add("hidden");
  examLoading.querySelector("h3").textContent = title;
  examLoading.querySelector("p").textContent = copy;
  examLoading.classList.remove("hidden");
}

function hideExamLoading() {
  examLoading.classList.add("hidden");
}

function buildActualMockExam(moduleId) {
  if (moduleId === "5002cmd") {
    return build5002ActualMockExam();
  }

  const paperQuestions = [
    build5004ActualMockQuestion(DATASETS[0], "actual-5004-housing-eda", "Question 1 (12 marks). Using the housing dataset, outline a preprocessing and exploratory-analysis plan before building a predictive model."),
    build5004ActualMockQuestion(DATASETS[1], "actual-5004-house-price-model", "Question 2 (12 marks). For the house-price dataset, write the model-building workflow you would follow from split to evaluation."),
    build5004ActualMockQuestion(DATASETS[2], "actual-5004-google-play-clean", "Question 3 (12 marks). For the Google Play dataset, explain how you would clean ratings, installs, and category fields before modelling or visual analysis."),
    build5004ActualMockQuestion(DATASETS[3], "actual-5004-framingham-metrics", "Question 4 (12 marks). For the Framingham dataset, justify the evaluation metrics and validation strategy you would use for the target task."),
    build5004ActualMockQuestion(DATASETS[4], "actual-5004-weather-features", "Question 5 (12 marks). For the weather dataset, describe the feature engineering steps that would help a forecasting or classification workflow."),
    build5004ActualMockQuestion(DATASETS[5], "actual-5004-election-chronology", "Question 6 (12 marks). For the election dataset, explain why chronological handling matters and how you would avoid leakage."),
    keywordQuestion(DATASETS[0].id, "actual-5004-cross-dataset-a", "Question 7 (20 marks). Compare how you would handle missing values, categorical variables, and evaluation across at least two different 5004CMD datasets.", ["missing", "categorical", "evaluation", "dataset"], "A strong answer compares at least two datasets and ties cleaning plus evaluation to each task type.", "Compare task type first, then explain how preprocessing and evaluation change with the target.", 3),
    codeQuestion(DATASETS[1].id, "actual-5004-cross-dataset-b", "Question 8 (20 marks). Write pandas or sklearn-style pseudocode for a complete end-to-end data-science workflow from loading data to reporting the final metric.", ["read", "split", "fit", "predict", "score"], "A complete answer loads data, prepares features and target, splits data, trains a model, predicts, and evaluates.", "Use a full workflow order: load, clean, split, train, predict, evaluate.", 3)
  ];

  return {
    paperId: 1,
    totalPapers: 1,
    questions: paperQuestions.map((question) => ({ ...question, actualMock: true }))
  };
}

function build5002ActualMockExam() {
  const sections = [
    [
      multipartQuestion("complexity", "actual-5002-q1a", "Question 1 (14 marks).", [
        { label: "a)", prompt: "Do we know whether P and NP are the same? Give one example of a problem in class P and one in class NP.", kind: "keyword", requiredTerms: ["open", "sorting", "sat"], modelAnswer: "It is still unknown whether P = NP. A standard example in P is sorting. A standard example in NP is SAT.", passingScore: 3 },
        { label: "b)", prompt: "What is the difference between multithreading and multiprocessing?", kind: "keyword", requiredTerms: ["threads", "process", "memory"], modelAnswer: "Multithreading runs multiple threads inside one process and usually shares memory, while multiprocessing uses separate processes with separate memory spaces.", passingScore: 2 },
        { label: "c)", prompt: "Is a linked list or a matrix data structure faster than a list for insert and delete operations? Give one application of hash tables.", kind: "keyword", requiredTerms: ["linked", "insert", "delete", "hash"], modelAnswer: "A linked list is typically better than a standard array-style list for insert and delete operations because elements do not need shifting. A common hash-table application is fast key-value lookup.", passingScore: 3 }
      ], "Answer each subpart separately and use one direct example in each theory part."),
      multipartQuestion("complexity", "actual-5002-q1b", "Question 1 (14 marks).", [
        { label: "a)", prompt: "Explain whether P versus NP has been resolved. Give one example of a problem in P and one in NP.", kind: "keyword", requiredTerms: ["open", "sorting", "sat"], modelAnswer: "The P versus NP question remains open. Sorting is a standard example in P and SAT is a standard example in NP.", passingScore: 3 },
        { label: "b)", prompt: "Compare multithreading with multiprocessing.", kind: "keyword", requiredTerms: ["threads", "process", "memory"], modelAnswer: "Threads share a process and typically share memory, while processes are separate execution units with separate memory.", passingScore: 2 },
        { label: "c)", prompt: "Which structure supports insert and delete better than a standard list, and where are hash tables useful?", kind: "keyword", requiredTerms: ["linked", "insert", "delete", "hash"], modelAnswer: "A linked list supports insertion and deletion better than a standard array-style list, and hash tables are useful for fast key-based lookup.", passingScore: 3 }
      ], "Treat each lettered part as a separate answer and make each example explicit."),
      multipartQuestion("complexity", "actual-5002-q1c", "Question 1 (14 marks).", [
        { label: "a)", prompt: "What is Big O notation used for, and why does it ignore constant factors?", kind: "keyword", requiredTerms: ["growth", "ignore", "constant"], modelAnswer: "Big O describes long-run growth of running time or space, and it ignores constant factors because asymptotic growth focuses on how the function scales.", passingScore: 2 },
        { label: "b)", prompt: "What is the difference between a stack and a queue?", kind: "keyword", requiredTerms: ["lifo", "fifo"], modelAnswer: "A stack is LIFO, while a queue is FIFO.", passingScore: 1 },
        { label: "c)", prompt: "Why are hash tables useful, and what is one common collision-handling idea?", kind: "keyword", requiredTerms: ["lookup", "collision", "chaining"], modelAnswer: "Hash tables are useful for fast average-case key lookup, and one common collision-handling method is chaining.", passingScore: 2 }
      ], "Keep each subpart short and define the core concept directly."),
      multipartQuestion("complexity", "actual-5002-q1d", "Question 1 (14 marks).", [
        { label: "a)", prompt: "Order these growth classes from smaller to larger: O(n^2), O(log n), O(1), O(n log n), O(n).", kind: "keyword", requiredTerms: ["1", "log", "n", "n log n", "n^2"], modelAnswer: "The correct order is O(1), O(log n), O(n), O(n log n), O(n^2).", passingScore: 4 },
        { label: "b)", prompt: "Why does binary search require sorted data?", kind: "keyword", requiredTerms: ["sorted", "half"], modelAnswer: "Binary search needs sorted data so it can safely discard half of the remaining search space after each comparison.", passingScore: 2 },
        { label: "c)", prompt: "What is the benefit of a greedy algorithm, and what is one risk when using it?", kind: "keyword", requiredTerms: ["local", "fast", "optimal"], modelAnswer: "A greedy algorithm is often simpler and faster because it makes local choices, but the risk is that local choices may not lead to a globally optimal answer.", passingScore: 2 }
      ], "Use direct definitions and one clear sentence per subpart.")
    ],
    [
      shortQuestion("searching", "actual-5002-q2a", "Question 2 (2 marks). Look at the tree given in Figure 1. We move through this tree by post-order. Starting counting by 1, what will be the count when we reach Afghan hound?", ["4", "four"], "The traversal reaches Afghan hound at count 4.", animalTreeFigure()),
      shortQuestion("searching", "actual-5002-q2b", "Question 2 (2 marks). Using the tree in Figure 1 and a post-order traversal, what number do we reach when grey wolf is visited if the count starts at 1?", ["5", "five"], "The traversal reaches grey wolf at count 5 in the alternate tree.", animalTreeFigureAlt()),
      shortQuestion("searching", "actual-5002-q2c", "Question 2 (2 marks). Using the tree in Figure 1 and a pre-order traversal, what count do we reach when Arctic fox is visited if the count starts at 1?", ["6", "six"], "In pre-order, Arctic fox is visited sixth on the third tree.", animalTreeFigureThird()),
      shortQuestion("searching", "actual-5002-q2d", "Question 2 (2 marks). Using the tree in Figure 1 and an in-order traversal, what count do we reach when Vulpes is visited if the count starts at 1?", ["5", "five"], "In-order visits Vulpes fifth on the fourth tree.", animalTreeFigureFourth()),
      shortQuestion("searching", "actual-5002-q2e", "Question 2 (2 marks). Using the tree in Figure 1 and a post-order traversal, what count do we reach when Cougar is visited if the count starts at 1?", ["2", "two"], "Post-order visits Cougar second on the fifth tree.", animalTreeFigureFifth()),
      shortQuestion("searching", "actual-5002-q2f", "Question 2 (2 marks). Using the tree in Figure 1 and a pre-order traversal, what count do we reach when Jackal is visited if the count starts at 1?", ["7", "seven"], "Pre-order visits Jackal seventh on the sixth tree.", animalTreeFigureSixth()),
      shortQuestion("searching", "actual-5002-q2g", "Question 2 (2 marks). Using the tree in Figure 1 and an in-order traversal, what count do we reach when Mustela is visited if the count starts at 1?", ["5", "five"], "In-order visits Mustela fifth on the seventh tree.", animalTreeFigureSeventh()),
      shortQuestion("searching", "actual-5002-q2h", "Question 2 (2 marks). Using the tree in Figure 1 and a pre-order traversal, what count do we reach when Otter is visited if the count starts at 1?", ["6", "six"], "Pre-order visits Otter sixth on the eighth tree.", animalTreeFigureEighth())
    ],
    [
      keywordQuestion("searching", "actual-5002-q3a", "Question 3 (3 marks). Use interpolation search to find index of the entry in the following list with the value 30. Note that the list is sorted in increasing order. Write the first three values that we will look at in the process.", ["30", "14", "54"], "A strong answer shows the inspected values in the order produced by the interpolation-search probes.", "Trace the inspected values in order. The question is marking the search process, not only the final index.", 1, interpolationFigure()),
      keywordQuestion("searching", "actual-5002-q3b", "Question 3 (3 marks). The displayed list is already sorted in increasing order. Use interpolation search to find the value 66 and write the first three values inspected during the search.", ["66", "48", "84"], "A strong answer records the inspected values in the same order the interpolation probes visit them in the alternate list.", "Write the probe sequence, not only the final location.", 1, interpolationFigureAlt()),
      keywordQuestion("searching", "actual-5002-q3c", "Question 3 (3 marks). Use binary search on the displayed sorted list to find the value 72. Write the first three values inspected during the search.", ["54", "90", "72"], "Binary search inspects 54, then 90, then 72 on the original list.", "Record the values at the midpoints in order.", 2, interpolationFigure()),
      keywordQuestion("searching", "actual-5002-q3d", "Question 3 (3 marks). Use binary search on the displayed sorted list to find the value 84. Write the first three values inspected during the search.", ["66", "91", "84"], "Binary search inspects 66, then 91, then 84 on the alternate list.", "Write the midpoint values in order as the interval narrows.", 2, interpolationFigureAlt())
    ],
    [
      keywordQuestion("complexity", "actual-5002-q4a", "Question 4 (9 marks). Look at the following algorithm. Describe the task that the algorithm is trying to do. What is the space complexity, and why?", ["recurrence", "recursive", "stack", "calls"], "The algorithm defines a recurrence using three previous values, and its space cost comes from recursive call-stack growth.", "State what the recurrence computes first, then explain why recursive calls consume stack space.", 3, recurrenceAlgorithmFigure()),
      keywordQuestion("complexity", "actual-5002-q4b", "Question 4 (9 marks). Consider the algorithm shown below. What is the algorithm computing, and why is its space complexity driven by recursion?", ["recurrence", "recursive", "stack", "calls"], "The algorithm computes values using a recursive recurrence and uses stack space because recursive calls remain active until they return.", "Explain the recurrence task first, then link the space cost to stacked recursive calls.", 3, recurrenceAlgorithmFigureAlt()),
      keywordQuestion("complexity", "actual-5002-q4c", "Question 4 (9 marks). Study the recursive algorithm below. What task is it performing, and what is the space complexity?", ["factorial", "recursive", "stack"], "The algorithm computes a factorial recursively, and its space complexity comes from the recursive call stack.", "Identify the recurrence goal first, then explain the stack depth.", 2, recurrenceAlgorithmFigureFactorial()),
      keywordQuestion("complexity", "actual-5002-q4d", "Question 4 (9 marks). The recursive algorithm below returns a value y. Explain what it is computing and why its space complexity is not constant.", ["sum", "recursive", "stack"], "The algorithm recursively computes the sum from 1 to n, and the space cost comes from stacked calls.", "Say what mathematical quantity is being built up, then link the space to recursion depth.", 2, recurrenceAlgorithmFigureSum())
    ],
    [
      tableQuestion("complexity", "actual-5002-q5a", "Question 5 (16 marks). Assume that each of the expressions below gives the processing time spent by an algorithm for solving a problem of size n. Provide the Big O notation for each expression and state which of the curves in Figure 2 looks like the curve for the growth of the function.", buildComplexityWorksheetRows(), "A strong answer identifies the dominant term in each row and then matches the curve by long-run steepness.", "Simplify each row first. Then use the growth-order ladder from smaller to larger to match the curve number.", growthCurvesFigure()),
      tableQuestion("complexity", "actual-5002-q5b", "Question 5 (16 marks). For each expression in the table below, write the Big O notation and the matching curve number from Figure 2.", buildComplexityWorksheetFractionRows(), "A strong answer reduces each row to its dominant term and then matches the curve by relative steepness.", "Work row by row: simplify the formula first, especially any fraction, then match the curve shape.", growthCurvesFigureAlt()),
      tableQuestion("complexity", "actual-5002-q5c", "Question 5 (16 marks). Complete the Big O and curve-number table for the functions shown below.", buildComplexityWorksheetRowsAlt(), "A strong answer reduces each expression to its dominant growth and then maps it to the closest curve shape.", "Reduce first, compare long-run steepness second.", growthCurvesFigure()),
      tableQuestion("complexity", "actual-5002-q5d", "Question 5 (16 marks). For each function below, identify its Big O class and the curve in Figure 2 that best matches it.", buildComplexityWorksheetRowsAltTwo(), "A strong answer groups the functions by linear, polynomial, and explosive growth before choosing curve numbers.", "Think in growth families first, then assign the curve.", growthCurvesFigureAlt())
    ],
    [
      multipartQuestion("concurrency", "actual-5002-q6a", "Question 6 (6 marks). Assume that deduct and enhance are two functions that only modify the global variable score at lines 7 and 12.", [
        { label: "a)", prompt: "What is the name of the problem that will happen by running this code?", acceptableAnswers: ["race condition"], kind: "short" },
        { label: "b)", prompt: "To fix this problem we import Lock from threading in line number 1 in addition to Thread. What should we type at line number 2 to declare an instance of Lock?", kind: "keyword", requiredTerms: ["lock", "="], modelAnswer: "Write a lock declaration such as lock = Lock().", passingScore: 1 },
        { label: "c)", prompt: "What should we write above lines 7 and 12?", kind: "keyword", requiredTerms: ["acquire", "with", "lock"], modelAnswer: "Protect the critical section with lock acquisition or a with lock block above the shared-state update lines.", passingScore: 1 }
      ], "Name the bug first, then declare the lock, then show how the critical lines are protected.", raceConditionFigure()),
      multipartQuestion("concurrency", "actual-5002-q6b", "Question 6 (6 marks). The two threaded functions below both update the global variable balance.", [
        { label: "a)", prompt: "Name the problem that can occur.", acceptableAnswers: ["race condition"], kind: "short" },
        { label: "b)", prompt: "After importing Lock from threading, write the line that creates a lock object.", kind: "keyword", requiredTerms: ["lock", "="], modelAnswer: "Create a lock object with a line such as lock = Lock().", passingScore: 1 },
        { label: "c)", prompt: "State what should be placed above the update lines.", kind: "keyword", requiredTerms: ["acquire", "with", "lock"], modelAnswer: "Place lock acquisition or a with lock guard above the shared update lines.", passingScore: 1 }
      ], "Identify the shared-state bug, then show both the lock declaration and the protection around the critical section.", raceConditionFigureAlt()),
      multipartQuestion("concurrency", "actual-5002-q6c", "Question 6 (6 marks). Two threads below both modify the shared variable counter.", [
        { label: "a)", prompt: "What concurrency problem may occur?", acceptableAnswers: ["race condition"], kind: "short" },
        { label: "b)", prompt: "Write the line that creates a lock instance after importing Lock.", kind: "keyword", requiredTerms: ["lock", "="], modelAnswer: "A valid answer is lock = Lock().", passingScore: 1 },
        { label: "c)", prompt: "What should guard the update lines inside both functions?", kind: "keyword", requiredTerms: ["with", "lock", "acquire"], modelAnswer: "The update lines should be guarded by lock acquisition or a with lock block.", passingScore: 1 }
      ], "Answer in the same race-condition then lock-fix sequence.", raceConditionFigureCounter()),
      multipartQuestion("concurrency", "actual-5002-q6d", "Question 6 (6 marks). The two threaded functions shown below both modify the shared variable points.", [
        { label: "a)", prompt: "Give the name of the fault that can occur.", acceptableAnswers: ["race condition"], kind: "short" },
        { label: "b)", prompt: "How would you declare the lock object after importing Lock?", kind: "keyword", requiredTerms: ["lock", "="], modelAnswer: "Declare a lock object with a line such as lock = Lock().", passingScore: 1 },
        { label: "c)", prompt: "What must be written immediately before the critical update lines?", kind: "keyword", requiredTerms: ["with", "lock", "acquire"], modelAnswer: "Immediately before the updates, place a lock acquisition or with lock guard.", passingScore: 1 }
      ], "Name the fault, create the lock, then protect the critical section.", raceConditionFigurePoints())
    ],
    [
      codeQuestion("graphs", "actual-5002-q7a", "Question 7 (25 marks). Write a pseudocode for the in-place quick sort that sorts a list of real numbers in non-decreasing order.", ["pivot", "partition", "swap", "recursive", "base"], `quickSort(A, low, high):\n    if low >= high:\n        return\n    pivot <- A[high]\n    i <- low\n    for j <- low to high - 1:\n        if A[j] <= pivot:\n            swap A[i], A[j]\n            i <- i + 1\n    swap A[i], A[high]\n    quickSort(A, low, i - 1)\n    quickSort(A, i + 1, high)`, "Give the base case, the partition logic, and the two recursive calls.", 3),
      codeQuestion("graphs", "actual-5002-q7b", "Question 7 (25 marks). Write pseudocode for an in-place quick sort that orders a real-number list from largest to smallest.", ["pivot", "partition", "swap", "recursive", "base"], `quickSortDesc(A, low, high):\n    if low >= high:\n        return\n    pivot <- A[high]\n    i <- low\n    for j <- low to high - 1:\n        if A[j] >= pivot:\n            swap A[i], A[j]\n            i <- i + 1\n    swap A[i], A[high]\n    quickSortDesc(A, low, i - 1)\n    quickSortDesc(A, i + 1, high)`, "Use a clear base case, pivot rule, partition logic, and make the comparisons match decreasing order.", 3),
      codeQuestion("graphs", "actual-5002-q7c", "Question 7 (25 marks). Write a pseudocode for the out-of-place merge sort that sorts a list of real numbers in non-decreasing order.", ["split", "merge", "left", "right", "base"], `mergeSort(A):\n    if length(A) <= 1:\n        return A\n    mid <- floor(length(A) / 2)\n    left <- mergeSort(A[0..mid-1])\n    right <- mergeSort(A[mid..end])\n    return merge(left, right)\n\nmerge(left, right):\n    result <- empty list\n    while left not empty and right not empty:\n        if first(left) <= first(right):\n            append first(left) to result\n        else:\n            append first(right) to result\n    append remaining items to result\n    return result`, "Show the recursive split and the merge step clearly.", 3),
      codeQuestion("graphs", "actual-5002-q7d", "Question 7 (25 marks). Write pseudocode for an in-place insertion sort that sorts a list of real numbers in non-increasing order.", ["key", "shift", "while", "insert"], `insertionSortDesc(A):\n    for i <- 1 to length(A) - 1:\n        key <- A[i]\n        j <- i - 1\n        while j >= 0 and A[j] < key:\n            A[j + 1] <- A[j]\n            j <- j - 1\n        A[j + 1] <- key`, "Make the comparison direction match decreasing order.", 3)
    ],
    [
      codeQuestion("graphs", "actual-5002-q8a", "Question 8 (25 marks). Consider simple graphs whose edges are labelled by positive integers. One such example is shown in Figure 3. A fixed number N is given. A path is legal if it does not intersect itself and the sum of labels of its edges does not exceed N. Write a pseudocode for a greedy algorithm that receives such a graph, two vertices and a value for N, then constructs only one legal path between the two vertices if there exists any.", ["greedy", "path", "sum", "visited", "return"], `greedyLegalPath(G, start, target, N):\n    path <- [start]\n    visited <- {start}\n    total <- 0\n    current <- start\n    while current != target:\n        candidates <- legal unvisited neighbors of current\n        remove any edge that makes total + label > N\n        if candidates is empty:\n            return "No legal path"\n        choose candidate with smallest label\n        add candidate vertex to path\n        add candidate vertex to visited\n        total <- total + chosen label\n        current <- candidate\n    return path`, "State the local greedy choice rule explicitly, then show how you keep the path legal after every edge.", 4, labelledGraphFigure()),
      codeQuestion("graphs", "actual-5002-q8b", "Question 8 (25 marks). For the labelled graph in Figure 3, write pseudocode for a greedy algorithm that builds one legal path between two vertices when the running total of edge labels must stay at or below N.", ["greedy", "path", "sum", "visited", "return"], `greedyPath(G, s, t, N):\n    current <- s\n    total <- 0\n    visited <- {s}\n    path <- [s]\n    while current != t:\n        nextEdge <- cheapest legal edge from current to an unvisited neighbor\n        if nextEdge does not exist:\n            return "No legal path"\n        current <- endpoint(nextEdge)\n        visited <- visited union {current}\n        path <- path + [current]\n        total <- total + label(nextEdge)\n    return path`, "Make the greedy rule explicit and keep checking the sum and visited set after every edge.", 4, labelledGraphFigureAlt()),
      codeQuestion("graphs", "actual-5002-q8c", "Question 8 (25 marks). In the graph shown in Figure 3, a path is legal if it never revisits a vertex and the total edge-label sum stays below or equal to N. Write pseudocode for a greedy algorithm that tries to build one legal path from A to F.", ["greedy", "path", "sum", "visited", "return"], `greedyPathAF(G, N):\n    current <- A\n    target <- F\n    total <- 0\n    path <- [A]\n    visited <- {A}\n    while current != target:\n        choose legal outgoing edge with smallest label\n        if no legal edge exists:\n            return "No legal path"\n        current <- destination of chosen edge\n        visited <- visited union {current}\n        path <- path + [current]\n        total <- total + label(chosen edge)\n    return path`, "Say how the next edge is chosen and when the algorithm gives up.", 4, labelledGraphFigure()),
      codeQuestion("graphs", "actual-5002-q8d", "Question 8 (25 marks). For the alternative labelled graph in Figure 3, write pseudocode for a greedy algorithm that constructs one legal path from A to F if the accumulated label sum must not exceed N.", ["greedy", "path", "sum", "visited", "return"], `buildLegalPath(G, A, F, N):\n    current <- A\n    used <- {A}\n    total <- 0\n    path <- [A]\n    repeat until current = F:\n        options <- unvisited neighbors reachable within remaining budget\n        if options is empty:\n            return "No legal path"\n        choose option with minimum edge label\n        current <- chosen neighbor\n        used <- used union {current}\n        path <- path + [current]\n        total <- total + chosen label\n    return path`, "Define the local greedy rule before writing the loop.", 4, labelledGraphFigureAlt())
    ]
  ];

  const paperPatterns = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 2, 2, 2, 2, 2, 2, 2],
    [1, 3, 3, 3, 3, 3, 3, 3],
    [0, 4, 1, 0, 1, 0, 1, 0],
    [2, 5, 0, 1, 0, 1, 2, 1],
    [3, 6, 3, 2, 3, 2, 0, 2],
    [2, 7, 2, 3, 2, 3, 3, 3]
  ];

  const paperId = Math.floor(Math.random() * paperPatterns.length);
  const questions = paperPatterns[paperId].map((variantIndex, sectionIndex) => ({
    ...sections[sectionIndex][variantIndex],
    actualMock: true
  }));

  return {
    paperId: paperId + 1,
    totalPapers: paperPatterns.length,
    questions
  };
}

function build5004ActualMockQuestion(profile, id, prompt) {
  return keywordQuestion(profile.id, id, prompt, actualMockTerms(profile), actualMockModelAnswer(profile), actualMockExplanation(profile), 3);
}

function actualMockTerms(profile) {
  return Array.from(new Set([
    profile.target.split(" ")[0].toLowerCase(),
    /classification/i.test(profile.task) ? "classification" : "regression",
    "clean",
    "split",
    "evaluate"
  ]));
}

function actualMockModelAnswer(profile) {
  return `A strong answer for ${profile.name} should connect preprocessing, train/test strategy, and evaluation directly to ${profile.target}.`;
}

function actualMockExplanation(profile) {
  return `Use the ${profile.name} task type first, then explain how cleaning, features, validation, and evaluation should follow from that task.`;
}

function renderExamQuestion(question, index, session = currentExamSession) {
  const preview = session && session.paperStyle ? "" : renderQuestionPreview(question.datasetId);
  const questionHistory = getQuestionHistoryStatus(question.prompt);
  const seenNotice = renderSeenNotice(questionHistory);
  const figureMarkup = resolveQuestionFigure(question);
  const figure = figureMarkup ? `<div class="figure-panel">${figureMarkup}</div>` : "";
  const hint = renderQuestionHint(question);
  const articleClass = session && session.paperStyle ? "question-card paper-question" : "question-card";
  const heading = /^question\s+\d+/i.test(question.prompt)
    ? escapeHtml(question.prompt)
    : `${index + 1}. ${escapeHtml(question.prompt)}`;

  if (question.kind === "table") {
    return `
      <article class="${articleClass}">
        ${preview}
        ${seenNotice}
        <h4>${heading}</h4>
        ${hint}
        ${renderTableQuestion(question)}
        ${figure}
      </article>
    `;
  }

  if (question.kind === "multipart") {
    return `
      <article class="${articleClass}">
        ${preview}
        ${seenNotice}
        ${figure}
        <h4>${heading}</h4>
        ${hint}
        <div class="multipart-block">
          ${question.subparts.map((subpart, subpartIndex) => `
            <div class="multipart-item">
              <p class="multipart-label">${escapeHtml(subpart.label)}</p>
              <p class="multipart-prompt">${escapeHtml(subpart.prompt)}</p>
              <textarea name="${question.id}__part__${subpartIndex}" placeholder="${subpart.kind === "code" ? "Write pseudocode here" : "Write your answer here"}"></textarea>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }

  if (question.kind === "mcq") {
    return `
      <article class="${articleClass}">
        ${preview}
        ${seenNotice}
        ${figure}
        <h4>${heading}</h4>
        ${hint}
        <div class="option-list">
          ${question.options.map((option, optionIndex) => `
            <label class="option-item">
              <input type="radio" name="${question.id}" value="${optionIndex}">
              <span>${escapeHtml(option)}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }

  return `
    <article class="${articleClass}">
      ${preview}
      ${seenNotice}
      ${figure}
      <h4>${heading}</h4>
      ${hint}
      <textarea name="${question.id}" placeholder="${question.kind === "code" ? "Write Python or pseudocode here" : "Write your short answer here"}"></textarea>
    </article>
  `;
}

function renderExamPaperHeader(session) {
  if (!session.paperStyle) {
    return "";
  }

  return currentModuleId === "5002cmd"
    ? `
      <section class="mock-paper-header">
        <p class="mock-paper-code">5002CMD/11</p>
        <h3>2025 Practice Set</h3>
        <p class="mock-paper-org">Coventry University<br>College of Engineering, Environment and Science<br>5002CMD<br>Advanced Algorithms</p>
        <div class="mock-paper-meta">
          <p><strong>This is a CLOSED BOOK exam</strong></p>
          <p>Time allowed: 2 Hours</p>
          <p>Total number of marks: 100</p>
          <p>The total number of questions in this paper: 8</p>
        </div>
      </section>
    `
    : `
      <section class="mock-paper-header">
        <p class="mock-paper-code">REVISION PAPER</p>
        <h3>${escapeHtml(session.moduleName)} Actual Mock</h3>
        <p class="mock-paper-org">${escapeHtml(session.moduleName)}<br>Paper-style revision set</p>
        <div class="mock-paper-meta">
          <p><strong>Answer all questions.</strong></p>
          <p>Use complete explanations, pseudocode, or code-style working where appropriate.</p>
          <p>Total number of questions in this paper: ${session.questions.length}</p>
        </div>
      </section>
    `;
}

function resolveQuestionFigure(question) {
  if (question.figure) {
    return question.figure;
  }

  const prompt = normalize(question.prompt);

  if (prompt.includes("post order") || prompt.includes("afghan hound")) {
    return animalTreeFigure();
  }
  if (prompt.includes("interpolation search") || prompt.includes("sorted list") || prompt.includes("value 30")) {
    return interpolationFigure();
  }
  if (prompt.includes("big o") || prompt.includes("curve number") || prompt.includes("growth of the function") || prompt.includes("growth curve")) {
    return growthCurvesFigure();
  }
  if (prompt.includes("algorithm is trying to do") || prompt.includes("space complexity") || prompt.includes("fun(n - 3)")) {
    return recurrenceAlgorithmFigure();
  }
  if (prompt.includes("deduct") || prompt.includes("enhance") || prompt.includes("race condition") || prompt.includes("threaded code")) {
    return raceConditionFigure();
  }
  if (prompt.includes("legal path") || prompt.includes("labelled graph") || prompt.includes("greedy algorithm") || prompt.includes("does not exceed n")) {
    return labelledGraphFigure();
  }

  return "";
}

function renderTableQuestion(question) {
  return `
    <div class="worksheet-wrap">
      <table class="preview-table worksheet-table">
        <thead>
          <tr>
            <th>f(n)</th>
            <th>Big O</th>
            <th>Curve number</th>
          </tr>
        </thead>
        <tbody>
          ${question.rows.map((row, index) => `
            <tr>
              <td>${renderWorksheetExpression(row)}</td>
              <td><input class="worksheet-input" name="${question.id}__bigo__${index}" placeholder="e.g. O(n^2)"></td>
              <td><input class="worksheet-input" name="${question.id}__curve__${index}" placeholder="e.g. 2"></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderQuestionPreview(itemId) {
  const item = getItem(itemId);
  if (!item) {
    return "";
  }

  if (currentModuleId === "5004cmd") {
    const rows = Object.entries(item.exampleRow).map(([column, value]) => `
      <tr>
        <td>${escapeHtml(column)}</td>
        <td>${escapeHtml(String(value))}</td>
      </tr>
    `).join("");

    return `
      <div class="dataset-preview">
        <p class="eyebrow">Dataset Snapshot</p>
        <h5>${escapeHtml(item.name)} sample row</h5>
        <table class="preview-table">
          <thead><tr><th>Column</th><th>Example data</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="dataset-preview">
      <p class="eyebrow">Topic Snapshot</p>
      <h5>${escapeHtml(item.name)}</h5>
      <p>${escapeHtml(item.focus)}</p>
      <div class="pill-row">
        ${item.stats.map((note) => `<span class="pill">${escapeHtml(note)}</span>`).join("")}
      </div>
    </div>
  `;
}

function bindHintButtons() {
  examQuestions.querySelectorAll(".hint-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.hintTarget);
      if (!target) {
        return;
      }

      const isHidden = target.classList.contains("hidden");
      target.classList.toggle("hidden", !isHidden);
      button.textContent = isHidden ? "Hide hint" : "Show hint";
    });
  });
}

function renderQuestionHint(question) {
  const hintText = buildQuestionHint(question);
  const hintId = `hint-${question.id}`;
  return `
    <div class="hint-actions">
      <button type="button" class="ghost-btn hint-toggle" data-hint-target="${hintId}">Show hint</button>
    </div>
    <div id="${hintId}" class="hint-box hidden">
      <p class="card-label">How to approach it</p>
      <p>${escapeHtml(hintText)}</p>
    </div>
  `;
}

function buildQuestionHint(question) {
  if (question.hint) {
    return question.hint;
  }

  return currentModuleId === "5002cmd"
    ? build5002Hint(question)
    : build5004Hint(question);
}

function build5002Hint(question) {
  const prompt = normalize(question.prompt);

  if (prompt.includes("post order")) {
    return "Write the traversal rule first: left subtree, right subtree, root. Then list the visited nodes in order and count them one by one from the starting number given in the question.";
  }

  if (prompt.includes("big o") || prompt.includes("curve")) {
    return "Simplify the expression to its dominant term first, then match the long-run shape. A useful order from small to large is O(1), O(log n), O(n), O(n log n), O(n^2), O(n^3), O(2^n), O(n!).";
  }

  if (prompt.includes("p and np")) {
    return "Answer in three parts: say the relationship is still an open problem, give one clear example in P, and give one clear example in NP.";
  }

  if (prompt.includes("interpolation")) {
    return "Check that the list is sorted, estimate the probe position from the target value relative to the low and high values, and write down each inspected value in order because trace questions mark the sequence, not just the final hit.";
  }

  if (prompt.includes("thread") || prompt.includes("lock") || prompt.includes("race condition") || prompt.includes("multithreading")) {
    return "Identify the shared variable first, then decide whether the question is asking for the name of the bug, the difference between concurrency models, or the fix. For a fix, create a lock instance and protect only the critical shared-state update.";
  }

  if (prompt.includes("quick sort") || prompt.includes("quicksort")) {
    return "Structure the answer as pivot selection, partitioning, swap logic, then recursive calls on the left and right subarrays. Include the base case so the recursion stops.";
  }

  if (prompt.includes("greedy") || prompt.includes("legal path") || prompt.includes("graph")) {
    return "State the greedy rule explicitly, track the running edge-label sum, and check legality after every chosen edge so the path never breaks the constraint partway through.";
  }

  if (prompt.includes("hash")) {
    return "Focus on the operation the structure supports best: fast average-case lookup by key. If the question compares structures, tie your answer to insertion, deletion, adjacency checks, or lookup speed.";
  }

  return "Start by naming the core concept being tested, then write the method or rule before giving the final answer. In algorithm exams, method marks usually come from the order of steps, not just the final word.";
}

function build5004Hint(question) {
  const item = getItem(question.datasetId);
  const prompt = normalize(question.prompt);

  if (question.kind === "code") {
    return `Start from the standard pandas or sklearn workflow for ${item.name}: load or inspect the data, then write the exact operation the prompt asks for. Keep variable names simple and align them with the requested output such as df, X, y, or model.`;
  }

  if (prompt.includes("evaluation") || prompt.includes("metric")) {
    return `Decide first whether ${item.target} is continuous or categorical. Then justify a metric family that matches that target type instead of listing metrics without explanation.`;
  }

  if (prompt.includes("missing") || prompt.includes("clean")) {
    return `Identify the cleaning issue first, then explain the direct action you would take on the dataset before modelling or interpretation. Marks usually come from linking the problem to the method.`;
  }

  return `Anchor your answer to the dataset's task type, target, and one key data-quality point. A strong short answer usually states what the variable or task is, why it matters, and the most relevant modelling or preprocessing implication.`;
}

function finishExam(event) {
  event.preventDefault();
  if (!currentExamSession) {
    return;
  }

  const formData = new FormData(examForm);
  const gradedQuestions = currentExamSession.questions.map((question, index) => {
    const userAnswer = question.kind === "table"
      ? collectTableAnswer(question, formData)
      : question.kind === "multipart"
        ? collectMultipartAnswer(question, formData)
        : collectTextAnswer(question, formData);
    const result = gradeQuestion(question, userAnswer);
    return {
      number: index + 1,
      kind: question.kind,
      prompt: question.prompt,
      userAnswer: serializeQuestionAnswer(question, userAnswer, result),
      correctAnswer: result.correctAnswer,
      explanation: question.explanation,
      correct: result.correct
    };
  });

  const attempt = {
    id: currentExamSession.id,
    type: "exam",
    moduleId: currentExamSession.moduleId,
    moduleName: currentExamSession.moduleName,
    scopeId: currentExamSession.scopeId,
    scopeName: currentExamSession.scopeName,
    createdAt: new Date().toISOString(),
    score: gradedQuestions.filter((question) => question.correct).length,
    total: gradedQuestions.length,
    questions: gradedQuestions
  };

  state.history.unshift(attempt);
  saveState();
  renderHistory();
  renderExamResults(attempt);
}

function collectTextAnswer(question, formData) {
  const rawAnswer = formData.get(question.id);
  return typeof rawAnswer === "string" ? rawAnswer.trim() : "";
}

function collectTableAnswer(question, formData) {
  const rows = question.rows.map((row, index) => ({
    expression: row.expression,
    bigO: String(formData.get(`${question.id}__bigo__${index}`) || "").trim(),
    curve: String(formData.get(`${question.id}__curve__${index}`) || "").trim()
  }));

  return {
    rows,
    answered: rows.some((row) => row.bigO || row.curve)
  };
}

function collectMultipartAnswer(question, formData) {
  const parts = question.subparts.map((subpart, index) => ({
    label: subpart.label,
    prompt: subpart.prompt,
    kind: subpart.kind || "short",
    answer: String(formData.get(`${question.id}__part__${index}`) || "").trim()
  }));

  return {
    parts,
    answered: parts.some((part) => part.answer)
  };
}

function serializeQuestionAnswer(question, userAnswer, gradingResult = null) {
  if (question.kind === "table") {
    return userAnswer;
  }

  if (question.kind === "multipart") {
    const gradedParts = gradingResult && Array.isArray(gradingResult.gradedParts)
      ? gradingResult.gradedParts
      : [];
    return {
      parts: question.subparts.map((subpart, index) => ({
        label: subpart.label,
        prompt: subpart.prompt,
        kind: subpart.kind || "short",
        answer: userAnswer.parts[index]?.answer || "",
        correct: typeof gradedParts[index]?.correct === "boolean" ? gradedParts[index].correct : undefined
      })),
      answered: userAnswer.answered
    };
  }

  return userAnswer || "No answer given";
}

function renderExamResults(attempt) {
  const percentage = Math.round((attempt.score / attempt.total) * 100);
  examResults.classList.remove("hidden");
  examResults.innerHTML = `
    <div class="results-score">
      <div class="score-badge">
        <strong>${attempt.score}/${attempt.total}</strong>
        <span>Score</span>
      </div>
      <div class="score-badge">
        <strong>${percentage}%</strong>
        <span>Percentage</span>
      </div>
      <div>
        <h3>${escapeHtml(attempt.moduleName)} ${escapeHtml(attempt.scopeName)} results</h3>
        <p>Marked immediately on ${formatDate(attempt.createdAt)}. Review every answer below.</p>
      </div>
    </div>
    <div class="exam-questions">
      ${attempt.questions.map((question) => `
        <article class="history-question ${question.correct ? "correct" : "incorrect"}">
          <h4>${question.number}. ${escapeHtml(question.prompt)}</h4>
          ${renderAnswerBlock("Your answer:", question.userAnswer, question.kind)}
          ${renderAnswerBlock("Correct answer:", question.correctAnswer, question.kind)}
          <p>${escapeHtml(question.explanation)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderHistory() {
  const filter = historyFilter.value;
  const attempts = state.history.filter((attempt) => {
    return attempt.moduleId === currentModuleId && (filter === "all" || attempt.type === filter);
  });

  if (attempts.length === 0) {
    historyList.innerHTML = `<div class="empty-state"><p>No saved attempts for ${getModule().name} match this filter yet.</p></div>`;
    historyDetail.innerHTML = "<p>Select an attempt to inspect its questions and answers.</p>";
    historyDetail.classList.add("empty-state");
    return;
  }

  historyList.innerHTML = attempts.map((attempt) => `
    <article class="history-item" data-attempt-id="${attempt.id}">
      <p class="eyebrow">${attempt.type === "exam" ? "Mock Exam" : "Flashcards"}</p>
      <h4>${escapeHtml(attempt.scopeName)}</h4>
      <p class="history-meta">${formatDate(attempt.createdAt)}</p>
      <p class="history-meta">Score: ${attempt.score}/${attempt.total}</p>
    </article>
  `).join("");

  historyList.querySelectorAll(".history-item").forEach((item) => {
    item.addEventListener("click", () => renderHistoryDetail(item.dataset.attemptId));
  });

  renderHistoryDetail(attempts[0].id);
}

function renderHistoryDetail(attemptId) {
  historyList.querySelectorAll(".history-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.attemptId === attemptId);
  });

  const attempt = state.history.find((entry) => entry.id === attemptId);
  if (!attempt) {
    historyDetail.innerHTML = "<p>Attempt not found.</p>";
    return;
  }

  historyDetail.classList.remove("empty-state");
  historyDetail.innerHTML = `
    <div class="review-item">
      <p class="eyebrow">${attempt.type === "exam" ? "Mock Exam" : "Flashcards"}</p>
      <h4>${escapeHtml(attempt.scopeName)}</h4>
      <p>Completed on ${formatDate(attempt.createdAt)}</p>
      <p>Score: ${attempt.score}/${attempt.total}</p>
      <button class="secondary-btn history-answers-btn" data-action="open-answers-modal" data-attempt-id="${attempt.id}">
        Click to visualise answers
      </button>
    </div>
  `;
}

function clearHistory() {
  if (!confirm(`Clear saved flashcard and exam history for ${getModule().name} from this browser?`)) {
    return;
  }

  state.history = state.history.filter((attempt) => attempt.moduleId !== currentModuleId);
  saveState();
  renderHistory();
}

function openPreviewModal(itemId) {
  const item = getItem(itemId);
  if (!item) {
    return;
  }

  if (currentModuleId === "5004cmd") {
    modalEyebrow.textContent = "Dataset Preview";
    modalTitle.textContent = item.name;
    modalMeta.textContent = `${item.file} • ${item.rows} rows • ${item.cols} columns`;
    modalPreview.innerHTML = renderSpreadsheet(item);
  } else {
    modalEyebrow.textContent = "Topic Preview";
    modalTitle.textContent = item.name;
    modalMeta.textContent = `${getModule().name} • Advanced Algorithms`;
    modalPreview.innerHTML = `
      <div class="dataset-preview">
        <p>${escapeHtml(item.summary)}</p>
        <div class="pill-row">
          ${item.stats.map((stat) => `<span class="pill">${escapeHtml(stat)}</span>`).join("")}
        </div>
      </div>
      <div class="review-list">
        ${item.studyPoints.map((point) => `
          <article class="review-item">
            <p>${escapeHtml(point)}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  datasetModal.classList.remove("hidden");
  updateBodyScrollLock();
}

function closeDatasetModal() {
  datasetModal.classList.add("hidden");
  updateBodyScrollLock();
}

function openAnswersModal(attemptId) {
  const attempt = state.history.find((entry) => entry.id === attemptId);
  if (!attempt) {
    return;
  }

  answersModalEyebrow.textContent = attempt.type === "exam" ? "Mock Exam Review" : "Flashcard Review";
  answersModalTitle.textContent = attempt.scopeName;
  answersModalMeta.textContent = `Completed on ${formatDate(attempt.createdAt)}. Score ${attempt.score}/${attempt.total}.`;
  answersModalPreview.innerHTML = `
    <div class="review-list">
      ${attempt.questions.map((question, index) => `
        <article class="history-question ${question.correct ? "correct" : "incorrect"}">
          <h4>${index + 1}. ${escapeHtml(question.prompt)}</h4>
          ${renderAnswerBlock("Your answer:", question.userAnswer, question.kind)}
          ${renderAnswerBlock("Correct answer:", question.correctAnswer, question.kind)}
        </article>
      `).join("")}
    </div>
  `;
  answersModal.classList.remove("hidden");
  updateBodyScrollLock();
}

function closeAnswersModal() {
  answersModal.classList.add("hidden");
  updateBodyScrollLock();
}

function updateBodyScrollLock() {
  const hasOpenModal = !datasetModal.classList.contains("hidden") || !answersModal.classList.contains("hidden");
  document.body.style.overflow = hasOpenModal ? "hidden" : "";
}

function renderSpreadsheet(profile) {
  const rows = (window.DATASET_ROWS && window.DATASET_ROWS[profile.id] ? window.DATASET_ROWS[profile.id].slice(0, 20) : [profile.exampleRow]) || [];
  const columns = rows[0] ? Object.keys(rows[0]) : Object.keys(profile.exampleRow);
  const head = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("");
  const body = rows.map((row, index) => `
    <tr>
      <td class="spreadsheet-index">${index + 1}</td>
      ${columns.map((column) => `<td>${escapeHtml(String(row[column] ?? ""))}</td>`).join("")}
    </tr>
  `).join("");

  return `
    <table class="spreadsheet-table">
      <thead>
        <tr>
          <th class="spreadsheet-index">#</th>
          ${head}
        </tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function getUniqueItems(pool, mode, moduleId, itemId, count) {
  const used = state.used[moduleId][mode][itemId] || [];
  let available = pool.filter((entry) => !used.includes(entry.id));

  if (available.length < count) {
    state.used[moduleId][mode][itemId] = [];
    available = [...pool];
  }

  const chosen = shuffle([...available]).slice(0, Math.min(count, available.length));
  state.used[moduleId][mode][itemId] = [...(state.used[moduleId][mode][itemId] || []), ...chosen.map((entry) => entry.id)];
  saveState();
  return chosen;
}

function gradeQuestion(question, userAnswer) {
  if (question.kind === "mcq") {
    const answerIndex = Number(userAnswer);
    return {
      correct: answerIndex === question.answerIndex,
      correctAnswer: question.options[question.answerIndex]
    };
  }

  if (question.kind === "code" || question.kind === "keyword") {
    const normalizedUserAnswer = normalize(userAnswer);
    const matchedCount = question.requiredTerms.filter((term) => keywordPresent(normalizedUserAnswer, term)).length;
    const passingScore = question.passingScore || question.requiredTerms.length;
    return {
      correct: matchedCount >= passingScore,
      correctAnswer: question.modelAnswer
    };
  }

  if (question.kind === "table") {
    const gradedRows = question.rows.map((row, index) => {
      const answerRow = userAnswer.rows[index] || { bigO: "", curve: "" };
      return {
        expression: row.expression,
        expressionHtml: row.expressionHtml,
        bigO: answerRow.bigO,
        curve: answerRow.curve,
        bigOCorrect: matchesTableAnswer(answerRow.bigO, row.bigO),
        curveCorrect: matchesTableAnswer(answerRow.curve, row.curve)
      };
    });

    return {
      correct: gradedRows.every((row) => row.bigOCorrect && row.curveCorrect),
      correctAnswer: {
        rows: question.rows.map((row) => ({
          expression: row.expression,
          expressionHtml: row.expressionHtml,
          bigO: row.bigO[0],
          curve: row.curve[0]
        }))
      }
    };
  }

  if (question.kind === "multipart") {
    const gradedParts = question.subparts.map((subpart, index) => {
      const answer = userAnswer.parts[index]?.answer || "";
      const result = gradeSubpart(subpart, answer);
      return {
        label: subpart.label,
        prompt: subpart.prompt,
        answer,
        correct: result.correct,
        correctAnswer: result.correctAnswer
      };
    });

    return {
      correct: gradedParts.every((part) => part.correct),
      gradedParts,
      correctAnswer: {
        parts: gradedParts.map((part) => ({
          label: part.label,
          prompt: part.prompt,
          answer: part.correctAnswer,
          kind: "short"
        }))
      }
    };
  }

  const normalizedUserAnswer = normalize(userAnswer);
  const acceptable = question.acceptableAnswers.some((answer) => {
    const normalizedAnswer = normalize(answer);
    return normalizedUserAnswer === normalizedAnswer
      || normalizedUserAnswer.includes(normalizedAnswer)
      || normalizedAnswer.includes(normalizedUserAnswer);
  });

  return {
    correct: acceptable,
    correctAnswer: question.acceptableAnswers[0]
  };
}

function getQuestionHistoryStatus(prompt) {
  const matches = state.history.flatMap((attempt) => attempt.questions || []).filter((question) => question.prompt === prompt);
  const answeredBefore = matches.some((question) => isQuestionAnswerPresent(question.userAnswer));

  return { seenBefore: matches.length > 0, answeredBefore };
}

function isQuestionAnswerPresent(answer) {
  if (typeof answer === "string") {
    const trimmed = answer.trim();
    return trimmed !== "" && trimmed !== "No answer given" && trimmed !== "Not answered";
  }

  if (answer && typeof answer === "object" && Array.isArray(answer.parts)) {
    return answer.parts.some((part) => typeof part.answer === "string" && part.answer.trim() !== "");
  }

  if (answer && typeof answer === "object" && Array.isArray(answer.rows)) {
    return answer.rows.some((row) => {
      return (typeof row.bigO === "string" && row.bigO.trim() !== "")
        || (typeof row.curve === "string" && row.curve.trim() !== "");
    });
  }

  return false;
}

function renderSeenNotice(status) {
  if (!status.seenBefore) {
    return "";
  }
  if (status.answeredBefore) {
    return '<div class="seen-notice answered-before">You have answered this question before.</div>';
  }
  return '<div class="seen-notice seen-before">This question has appeared before.</div>';
}

function renderAnswerBlock(label, value, kind) {
  const safeValue = typeof value === "string" ? escapeHtml(value || "") : "";
  const labelClass = label.startsWith("Correct") ? "correct-answer" : "user-answer";

  if (value === "No answer given") {
    return `
      <div class="answer-block">
        <p><span class="${labelClass}">${label}</span></p>
        <div class="empty-answer">No answer given</div>
      </div>
    `;
  }

  if (kind === "code") {
    return `
      <div class="answer-block">
        <p><span class="${labelClass}">${label}</span></p>
        <pre class="code-answer"><code>${safeValue}</code></pre>
      </div>
    `;
  }

  if (kind === "table" && value && typeof value === "object" && Array.isArray(value.rows)) {
    return `
      <div class="answer-block">
        <p><span class="${labelClass}">${label}</span></p>
        ${renderWorksheetAnswerTable(value.rows, label.startsWith("Correct"))}
      </div>
    `;
  }

  if (kind === "multipart" && value && typeof value === "object" && Array.isArray(value.parts)) {
    return `
      <div class="answer-block">
        <p><span class="${labelClass}">${label}</span></p>
        <div class="multipart-answer-list">
          ${value.parts.map((part) => `
            <div class="multipart-answer-item">
              <p><strong>${escapeHtml(part.label)}</strong> ${escapeHtml(part.prompt)}</p>
              ${part.kind === "code"
                ? `<pre class="code-answer"><code>${escapeHtml(part.answer || (label.startsWith("Correct") ? "" : "No answer"))}</code></pre>`
                : `<div class="${part.answer ? "multipart-answer-text" : "empty-answer"}">${escapeHtml(part.answer || (label.startsWith("Correct") ? "" : "No answer"))}</div>`}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  return `<p><span class="${labelClass}">${label}</span> ${safeValue}</p>`;
}

function renderWorksheetAnswerTable(rows, isCorrectAnswer = false) {
  return `
    <div class="worksheet-wrap worksheet-answer-wrap">
      <table class="preview-table worksheet-table">
        <thead>
          <tr>
            <th>f(n)</th>
            <th>Big O</th>
            <th>Curve number</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${renderWorksheetExpression(row)}</td>
              <td>${escapeHtml(row.bigO || (isCorrectAnswer ? "" : "No answer"))}</td>
              <td>${escapeHtml(row.curve || (isCorrectAnswer ? "" : "No answer"))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function matchesTableAnswer(userValue, acceptableValues) {
  const normalizedUserValue = normalizeTableValue(userValue);
  return acceptableValues.some((value) => normalizeTableValue(value) === normalizedUserValue);
}

function gradeSubpart(subpart, userAnswer) {
  if ((subpart.kind || "short") === "keyword" || (subpart.kind || "short") === "code") {
    const normalizedUserAnswer = normalize(userAnswer);
    const matchedCount = subpart.requiredTerms.filter((term) => keywordPresent(normalizedUserAnswer, term)).length;
    const passingScore = subpart.passingScore || subpart.requiredTerms.length;
    return {
      correct: matchedCount >= passingScore,
      correctAnswer: subpart.modelAnswer
    };
  }

  const normalizedUserAnswer = normalize(userAnswer);
  const acceptable = subpart.acceptableAnswers.some((answer) => {
    const normalizedAnswer = normalize(answer);
    return normalizedUserAnswer === normalizedAnswer
      || normalizedUserAnswer.includes(normalizedAnswer)
      || normalizedAnswer.includes(normalizedUserAnswer);
  });

  return {
    correct: acceptable,
    correctAnswer: subpart.acceptableAnswers[0]
  };
}

function normalizeTableValue(value) {
  return normalize(String(value || ""))
    .replace(/^big o\s*/, "")
    .replace(/^curve\s*/, "")
    .replace(/^o\(/, "")
    .replace(/\)$/, "")
    .replace(/\s+/g, "");
}

function renderWorksheetExpression(row) {
  return row.expressionHtml || escapeHtml(row.expression);
}

function buildComplexityWorksheetRows() {
  return [
    {
      expression: "n^2(n^2 - 1) / n(n^2 - 1)",
      expressionHtml: fractionExpressionHtml(
        `${powerExpressionHtml("n", "2")}(${powerExpressionHtml("n", "2")} - 1)`,
        `n(${powerExpressionHtml("n", "2")} - 1)`
      ),
      bigO: ["n", "o(n)"],
      curve: ["1", "curve 1"]
    },
    { expression: "n! + log n + 2^n + 2^(2^n)", expressionHtml: `n! + log n + ${powerExpressionHtml("2", "n")} + ${powerExpressionHtml("2", powerExpressionHtml("2", "n"))}`, bigO: ["2^(2^n)", "o(2^(2^n))", "2 2^n"], curve: ["4", "curve 4"] },
    { expression: "5 + 8 + 11 + ... + (3n + 2)", expressionHtml: "5 + 8 + 11 + ... + (3n + 2)", bigO: ["n^2", "o(n^2)"], curve: ["2", "curve 2"] },
    { expression: "sum from i=0 to n of 3^i", expressionHtml: sigmaExpressionHtml("n", "i=0", powerExpressionHtml("3", "i")), bigO: ["3^n", "o(3^n)"], curve: ["4", "curve 4"] }
  ];
}

function buildComplexityWorksheetFractionRows() {
  return [
    {
      expression: "n^2(n^2 - 1) / n(n^2 - 1)",
      expressionHtml: fractionExpressionHtml(
        `${powerExpressionHtml("n", "2")}(${powerExpressionHtml("n", "2")} - 1)`,
        `n(${powerExpressionHtml("n", "2")} - 1)`
      ),
      bigO: ["n", "o(n)"],
      curve: ["1", "curve 1"]
    },
    {
      expression: "n(n^2 - 1) / (n + 1)",
      expressionHtml: fractionExpressionHtml(
        `n(${powerExpressionHtml("n", "2")} - 1)`,
        "(n + 1)"
      ),
      bigO: ["n^2", "o(n^2)"],
      curve: ["2", "curve 2"]
    },
    {
      expression: "n! + log n + 2^n + 2^(2^n)",
      expressionHtml: `n! + log n + ${powerExpressionHtml("2", "n")} + ${powerExpressionHtml("2", powerExpressionHtml("2", "n"))}`,
      bigO: ["2^(2^n)", "o(2^(2^n))", "2 2^n"],
      curve: ["4", "curve 4"]
    },
    {
      expression: "5 + 8 + 11 + ... + (3n + 2)",
      expressionHtml: "5 + 8 + 11 + ... + (3n + 2)",
      bigO: ["n^2", "o(n^2)"],
      curve: ["2", "curve 2"]
    },
    {
      expression: "sum from i=0 to n of 3^i",
      expressionHtml: sigmaExpressionHtml("n", "i=0", powerExpressionHtml("3", "i")),
      bigO: ["3^n", "o(3^n)"],
      curve: ["4", "curve 4"]
    }
  ];
}

function buildComplexityWorksheetRowsAlt() {
  return [
    { expression: "n^3 + n", expressionHtml: `${powerExpressionHtml("n", "3")} + n`, bigO: ["n^3", "o(n^3)"], curve: ["3", "curve 3"] },
    { expression: "n log n + n", expressionHtml: "n log n + n", bigO: ["n log n", "o(n log n)"], curve: ["2", "curve 2"] },
    { expression: "2^n + n^10", expressionHtml: `${powerExpressionHtml("2", "n")} + ${powerExpressionHtml("n", "10")}`, bigO: ["2^n", "o(2^n)"], curve: ["4", "curve 4"] },
    { expression: "(n^3 - n) / n", expressionHtml: fractionExpressionHtml(`${powerExpressionHtml("n", "3")} - n`, "n"), bigO: ["n^2", "o(n^2)"], curve: ["2", "curve 2"] },
    { expression: "sum from i=1 to n of i", expressionHtml: sigmaExpressionHtml("n", "i=1", "i"), bigO: ["n^2", "o(n^2)"], curve: ["2", "curve 2"] }
  ];
}

function buildComplexityWorksheetRowsAltTwo() {
  return [
    { expression: "log n + 7", expressionHtml: "log n + 7", bigO: ["log n", "o(log n)"], curve: ["1", "curve 1"] },
    { expression: "n^4 - n", expressionHtml: `${powerExpressionHtml("n", "4")} - n`, bigO: ["n^4", "o(n^4)"], curve: ["3", "curve 3"] },
    { expression: "3^n + n^2", expressionHtml: `${powerExpressionHtml("3", "n")} + ${powerExpressionHtml("n", "2")}`, bigO: ["3^n", "o(3^n)"], curve: ["4", "curve 4"] },
    { expression: "n + 100", expressionHtml: "n + 100", bigO: ["n", "o(n)"], curve: ["1", "curve 1"] },
    { expression: "sum from i=0 to n of i^2", expressionHtml: sigmaExpressionHtml("n", "i=0", powerExpressionHtml("i", "2")), bigO: ["n^3", "o(n^3)"], curve: ["3", "curve 3"] }
  ];
}

function getModule() {
  return MODULES[currentModuleId];
}

function getItem(itemId) {
  return getModule().items.find((item) => item.id === itemId);
}

function makeCard(datasetId, id, question, answer) {
  return { datasetId, id, question, answer };
}

function mcq(datasetId, id, prompt, options, answerIndex, explanation, figure = "") {
  return { datasetId, id, kind: "mcq", prompt, options, answerIndex, explanation, figure };
}

function shortQuestion(datasetId, id, prompt, acceptableAnswers, explanation, figure = "") {
  return { datasetId, id, kind: "short", prompt, acceptableAnswers, explanation, figure };
}

function multipartQuestion(datasetId, id, prompt, subparts, explanation, figure = "") {
  return { datasetId, id, kind: "multipart", prompt, subparts, explanation, figure };
}

function tableQuestion(datasetId, id, prompt, rows, modelAnswer, explanation, figure = "") {
  return { datasetId, id, kind: "table", prompt, rows, modelAnswer, explanation, figure };
}

function codeQuestion(datasetId, id, prompt, requiredTerms, modelAnswer, explanation, passingScore = null, figure = "") {
  return { datasetId, id, kind: "code", prompt, requiredTerms, modelAnswer, explanation, passingScore, figure };
}

function keywordQuestion(datasetId, id, prompt, requiredTerms, modelAnswer, explanation, passingScore = null, figure = "") {
  return { datasetId, id, kind: "keyword", prompt, requiredTerms, modelAnswer, explanation, passingScore, figure };
}

function sigmaExpressionHtml(upperBound, lowerBound, term) {
  const accessibleTerm = stripHtmlTags(term);
  const upper = escapeHtml(upperBound);
  const lower = escapeHtml(lowerBound);
  return `
    <span class="sigma-expression" aria-label="sum from ${lower} to ${upper} of ${escapeHtml(accessibleTerm)}">
      <span class="sigma-bounds">
        <span class="sigma-upper">${upper}</span>
        <span class="sigma-symbol">&sum;</span>
        <span class="sigma-lower">${lower}</span>
      </span>
      <span class="sigma-term">${term}</span>
    </span>
  `;
}
function powerExpressionHtml(base, exponent) {
  return `<span class="math-inline">${base}<sup>${exponent}</sup></span>`;
}

function fractionExpressionHtml(numerator, denominator) {
  return `
    <span class="fraction-expression">
      <span class="fraction-numerator">${numerator}</span>
      <span class="fraction-bar"></span>
      <span class="fraction-denominator">${denominator}</span>
    </span>
  `;
}

function stripHtmlTags(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
function evaluationTerms(profile) {
  if (/classification/i.test(profile.task) || /Binary/.test(profile.task)) {
    return ["classification", "class", "label", "precision", "recall", "f1", "roc"];
  }
  return ["regression", "continuous", "rmse", "mae", "r2"];
}

function evaluationModelAnswer(profile) {
  if (/classification/i.test(profile.task) || /Binary/.test(profile.task)) {
    return "Classification-style evaluation is more appropriate because the outcome is categorical, so metrics such as recall, precision, F1, or ROC-AUC are defensible.";
  }
  return "Regression-style evaluation is more appropriate because the target is continuous or numeric, so RMSE, MAE, or R2 fit the task.";
}

function animalTreeFigure() {
  return `
    <svg viewBox="0 0 520 190" role="img" aria-label="Animal classification tree">
      <line x1="260" y1="28" x2="160" y2="70" stroke="#47645a" stroke-width="2"/>
      <line x1="260" y1="28" x2="360" y2="70" stroke="#47645a" stroke-width="2"/>
      <line x1="160" y1="70" x2="90" y2="112" stroke="#47645a" stroke-width="2"/>
      <line x1="160" y1="70" x2="230" y2="112" stroke="#47645a" stroke-width="2"/>
      <line x1="360" y1="70" x2="305" y2="112" stroke="#47645a" stroke-width="2"/>
      <line x1="360" y1="70" x2="430" y2="112" stroke="#47645a" stroke-width="2"/>
      ${svgNode(230, 14, 60, 24, "Carnivora")}
      ${svgNode(132, 58, 56, 24, "Panthera")}
      ${svgNode(338, 58, 44, 24, "Canis")}
      ${svgNode(42, 100, 96, 24, "Persian leopard")}
      ${svgNode(187, 100, 86, 24, "Bengal tiger")}
      ${svgNode(270, 100, 74, 24, "Indian wolf")}
      ${svgNode(392, 100, 86, 24, "Afghan hound")}
      <text x="260" y="164" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureAlt() {
  return `
    <svg viewBox="0 0 520 210" role="img" aria-label="Alternative animal classification tree">
      <line x1="250" y1="28" x2="166" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="250" y1="28" x2="344" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="166" y1="72" x2="96" y2="124" stroke="#47645a" stroke-width="2"/>
      <line x1="166" y1="72" x2="222" y2="124" stroke="#47645a" stroke-width="2"/>
      <line x1="344" y1="72" x2="304" y2="124" stroke="#47645a" stroke-width="2"/>
      <line x1="304" y1="124" x2="266" y2="172" stroke="#47645a" stroke-width="2"/>
      <line x1="304" y1="124" x2="350" y2="172" stroke="#47645a" stroke-width="2"/>
      ${svgNode(208, 14, 84, 24, "Carnivora")}
      ${svgNode(138, 60, 58, 24, "Felidae")}
      ${svgNode(316, 60, 56, 24, "Canidae")}
      ${svgNode(60, 112, 48, 24, "Lynx")}
      ${svgNode(190, 112, 66, 24, "Cheetah")}
      ${svgNode(276, 112, 56, 24, "Canis")}
      ${svgNode(226, 160, 78, 24, "Red fox")}
      ${svgNode(314, 160, 78, 24, "Grey wolf")}
      <text x="260" y="198" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Alternative animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureThird() {
  return `
    <svg viewBox="0 0 520 190" role="img" aria-label="Third animal classification tree">
      <line x1="250" y1="30" x2="180" y2="78" stroke="#47645a" stroke-width="2"/>
      <line x1="180" y1="78" x2="116" y2="126" stroke="#47645a" stroke-width="2"/>
      <line x1="180" y1="78" x2="248" y2="126" stroke="#47645a" stroke-width="2"/>
      <line x1="250" y1="30" x2="334" y2="78" stroke="#47645a" stroke-width="2"/>
      <line x1="334" y1="78" x2="404" y2="126" stroke="#47645a" stroke-width="2"/>
      ${svgNode(216, 16, 72, 24, "Carnivora")}
      ${svgNode(146, 66, 68, 24, "Ursidae")}
      ${svgNode(308, 66, 54, 24, "Foxes")}
      ${svgNode(70, 114, 92, 24, "Brown bear")}
      ${svgNode(210, 114, 76, 24, "Sun bear")}
      ${svgNode(368, 114, 92, 24, "Arctic fox")}
      <text x="260" y="170" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Third animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureFourth() {
  return `
    <svg viewBox="0 0 520 210" role="img" aria-label="Fourth animal classification tree">
      <line x1="252" y1="28" x2="176" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="252" y1="28" x2="340" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="176" y1="72" x2="112" y2="122" stroke="#47645a" stroke-width="2"/>
      <line x1="176" y1="72" x2="220" y2="122" stroke="#47645a" stroke-width="2"/>
      <line x1="340" y1="72" x2="384" y2="122" stroke="#47645a" stroke-width="2"/>
      <line x1="384" y1="122" x2="346" y2="170" stroke="#47645a" stroke-width="2"/>
      <line x1="384" y1="122" x2="430" y2="170" stroke="#47645a" stroke-width="2"/>
      ${svgNode(220, 14, 64, 24, "Mammal")}
      ${svgNode(146, 60, 58, 24, "Felis")}
      ${svgNode(312, 60, 56, 24, "Vulpes")}
      ${svgNode(70, 110, 84, 24, "Caracal")}
      ${svgNode(186, 110, 78, 24, "Wildcat")}
      ${svgNode(352, 110, 64, 24, "Foxes")}
      ${svgNode(306, 158, 64, 24, "Fennec")}
      ${svgNode(398, 158, 68, 24, "Corsac")}
      <text x="260" y="198" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Fourth animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureFifth() {
  return `
    <svg viewBox="0 0 520 170" role="img" aria-label="Fifth animal classification tree">
      <line x1="250" y1="28" x2="170" y2="76" stroke="#47645a" stroke-width="2"/>
      <line x1="170" y1="76" x2="112" y2="122" stroke="#47645a" stroke-width="2"/>
      <line x1="170" y1="76" x2="232" y2="122" stroke="#47645a" stroke-width="2"/>
      ${svgNode(212, 14, 74, 24, "Felines")}
      ${svgNode(140, 64, 58, 24, "Puma")}
      ${svgNode(78, 110, 56, 24, "Cat")}
      ${svgNode(204, 110, 72, 24, "Cougar")}
      <text x="250" y="158" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Fifth animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureSixth() {
  return `
    <svg viewBox="0 0 520 220" role="img" aria-label="Sixth animal classification tree">
      <line x1="248" y1="28" x2="174" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="248" y1="28" x2="330" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="330" y1="72" x2="286" y2="120" stroke="#47645a" stroke-width="2"/>
      <line x1="330" y1="72" x2="374" y2="120" stroke="#47645a" stroke-width="2"/>
      <line x1="374" y1="120" x2="418" y2="168" stroke="#47645a" stroke-width="2"/>
      ${svgNode(214, 14, 68, 24, "Animalia")}
      ${svgNode(144, 60, 60, 24, "Felid")}
      ${svgNode(302, 60, 56, 24, "Canid")}
      ${svgNode(252, 108, 74, 24, "Coyote")}
      ${svgNode(340, 108, 66, 24, "Foxes")}
      ${svgNode(382, 156, 72, 24, "Jackal")}
      <text x="250" y="206" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Sixth animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureSeventh() {
  return `
    <svg viewBox="0 0 520 220" role="img" aria-label="Seventh animal classification tree">
      <line x1="252" y1="28" x2="178" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="252" y1="28" x2="340" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="178" y1="72" x2="122" y2="120" stroke="#47645a" stroke-width="2"/>
      <line x1="178" y1="72" x2="234" y2="120" stroke="#47645a" stroke-width="2"/>
      <line x1="234" y1="120" x2="198" y2="168" stroke="#47645a" stroke-width="2"/>
      <line x1="234" y1="120" x2="272" y2="168" stroke="#47645a" stroke-width="2"/>
      ${svgNode(218, 14, 68, 24, "Carnivora")}
      ${svgNode(146, 60, 64, 24, "Marten")}
      ${svgNode(316, 60, 66, 24, "Canidae")}
      ${svgNode(90, 108, 58, 24, "Mink")}
      ${svgNode(206, 108, 60, 24, "Mustela")}
      ${svgNode(164, 156, 66, 24, "Ferret")}
      ${svgNode(246, 156, 64, 24, "Otter")}
      <text x="252" y="206" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Seventh animal classification tree</text>
    </svg>
  `;
}

function animalTreeFigureEighth() {
  return `
    <svg viewBox="0 0 520 220" role="img" aria-label="Eighth animal classification tree">
      <line x1="252" y1="28" x2="166" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="252" y1="28" x2="344" y2="72" stroke="#47645a" stroke-width="2"/>
      <line x1="166" y1="72" x2="134" y2="120" stroke="#47645a" stroke-width="2"/>
      <line x1="134" y1="120" x2="100" y2="168" stroke="#47645a" stroke-width="2"/>
      <line x1="134" y1="120" x2="172" y2="168" stroke="#47645a" stroke-width="2"/>
      <line x1="344" y1="72" x2="408" y2="120" stroke="#47645a" stroke-width="2"/>
      ${svgNode(218, 14, 68, 24, "Mammalia")}
      ${svgNode(138, 60, 56, 24, "Lutra")}
      ${svgNode(314, 60, 62, 24, "Vulpes")}
      ${svgNode(104, 108, 58, 24, "River")}
      ${svgNode(380, 108, 84, 24, "Kit fox")}
      ${svgNode(70, 156, 52, 24, "Pup")}
      ${svgNode(142, 156, 60, 24, "Otter")}
      <text x="252" y="206" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 1. Eighth animal classification tree</text>
    </svg>
  `;
}

function interpolationFigure() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Figure</p>
      <div class="number-strip">
        ${[0, 5, 12, 14, 30, 54, 72, 84, 90, 99, 100].map((value) => `<span>${value}</span>`).join("")}
      </div>
    </div>
  `;
}

function interpolationFigureAlt() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Figure</p>
      <div class="number-strip">
        ${[6, 18, 24, 33, 48, 66, 72, 84, 91, 96, 108].map((value) => `<span>${value}</span>`).join("")}
      </div>
    </div>
  `;
}

function complexityWorksheetFigure() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Figure</p>
      ${growthCurvesFigure()}
    </div>
  `;
}

function recurrenceAlgorithmFigure() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Algorithm</p>
      <pre class="code-answer"><code>fun(n):
Input: n is a positive integer.
Output: y is a positive integer.

If n &lt; 4, then do
    1 -&gt; y.
Else
    fun(n - 3) + fun(n - 2) + fun(n - 1) -&gt; y.
End of the if-statement.

Return(y).</code></pre>
    </div>
  `;
}

function recurrenceAlgorithmFigureAlt() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Algorithm</p>
      <pre class="code-answer"><code>fun(n):
Input: n is a positive integer.
Output: y is a positive integer.

If n &lt; 3, then do
    1 -&gt; y.
Else
    fun(n - 1) + fun(n - 2) -&gt; y.
End of the if-statement.

Return(y).</code></pre>
    </div>
  `;
}

function recurrenceAlgorithmFigureFactorial() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Algorithm</p>
      <pre class="code-answer"><code>fun(n):
Input: n is a non-negative integer.
Output: y is a positive integer.

If n &lt; 2, then do
    1 -&gt; y.
Else
    n * fun(n - 1) -&gt; y.
End of the if-statement.

Return(y).</code></pre>
    </div>
  `;
}

function recurrenceAlgorithmFigureSum() {
  return `
    <div class="algorithm-panel">
      <p class="card-label">Algorithm</p>
      <pre class="code-answer"><code>fun(n):
Input: n is a non-negative integer.
Output: y is an integer.

If n &lt; 1, then do
    0 -&gt; y.
Else
    n + fun(n - 1) -&gt; y.
End of the if-statement.

Return(y).</code></pre>
    </div>
  `;
}

function growthCurvesFigure() {
  return `
    <svg viewBox="0 0 520 280" role="img" aria-label="Four growth curves">
      <line x1="50" y1="20" x2="50" y2="240" stroke="#202722" stroke-width="2"/>
      <line x1="50" y1="240" x2="480" y2="240" stroke="#202722" stroke-width="2"/>
      <path d="M60 232 C150 228, 260 224, 470 214" fill="none" stroke="#d14e43" stroke-width="4"/>
      <path d="M60 225 C150 205, 260 160, 470 52" fill="none" stroke="#58a63c" stroke-width="4"/>
      <path d="M60 226 C120 218, 180 200, 230 150 C270 110, 300 40, 315 10" fill="none" stroke="#6f2dbd" stroke-width="4"/>
      <path d="M60 225 C110 214, 145 180, 165 95 C175 52, 180 15, 182 0" fill="none" stroke="#2563eb" stroke-width="4"/>
      <text x="388" y="112" fill="#d14e43" font-size="14">curve 1</text>
      <text x="388" y="132" fill="#58a63c" font-size="14">curve 2</text>
      <text x="388" y="152" fill="#6f2dbd" font-size="14">curve 3</text>
      <text x="388" y="172" fill="#2563eb" font-size="14">curve 4</text>
      <text x="262" y="268" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 2. Growth of four functions</text>
    </svg>
  `;
}

function growthCurvesFigureAlt() {
  return `
    <svg viewBox="0 0 520 280" role="img" aria-label="Alternative growth curves">
      <line x1="44" y1="230" x2="476" y2="230" stroke="#2d372f" stroke-width="3"/>
      <line x1="44" y1="24" x2="44" y2="230" stroke="#2d372f" stroke-width="3"/>
      <path d="M64 218 C140 214, 240 210, 460 202" fill="none" stroke="#c84c43" stroke-width="6"/>
      <path d="M64 212 C132 196, 236 170, 456 84" fill="none" stroke="#5da843" stroke-width="6"/>
      <path d="M64 212 C128 202, 214 178, 296 118 C346 82, 382 34, 404 14" fill="none" stroke="#6c39c4" stroke-width="6"/>
      <path d="M64 210 C120 196, 170 164, 210 112 C238 76, 258 36, 274 6" fill="none" stroke="#3469e1" stroke-width="6"/>
      <text x="388" y="136" fill="#c84c43" font-size="20" font-family="Trebuchet MS, sans-serif">curve 1</text>
      <text x="388" y="160" fill="#5da843" font-size="20" font-family="Trebuchet MS, sans-serif">curve 2</text>
      <text x="388" y="184" fill="#6c39c4" font-size="20" font-family="Trebuchet MS, sans-serif">curve 3</text>
      <text x="388" y="208" fill="#3469e1" font-size="20" font-family="Trebuchet MS, sans-serif">curve 4</text>
      <text x="262" y="268" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 2. Alternative growth of four functions</text>
    </svg>
  `;
}

function raceConditionFigure() {
  return numberedCodeFigure("Threaded Code", [
    "from threading import Thread",
    "",
    "score = 100",
    "",
    "def deduct(...):",
    "    ...",
    "    score = ...",
    "    ...",
    "",
    "def enhance(...):",
    "    ...",
    "    score = ...",
    "    ...",
    "",
    "thread1 = Thread(target=deduct)",
    "thread2 = Thread(target=enhance)",
    "thread1.start()",
    "thread2.start()",
    "thread1.join()",
    "thread2.join()"
  ]);
}

function raceConditionFigureAlt() {
  return numberedCodeFigure("Code", [
    "from threading import Thread",
    "",
    "balance = 250",
    "",
    "def withdraw():",
    "    ...",
    "    balance = ...",
    "    ...",
    "",
    "def deposit():",
    "    ...",
    "    balance = ...",
    "    ...",
    "",
    "thread1 = Thread(target=withdraw)",
    "thread2 = Thread(target=deposit)",
    "",
    "thread1.start()",
    "thread2.start()",
    "",
    "thread1.join()",
    "thread2.join()",
    "",
    "print(\"Final balance:\", balance)"
  ]);
}

function raceConditionFigureCounter() {
  return numberedCodeFigure("Code", [
    "from threading import Thread",
    "",
    "counter = 0",
    "",
    "def add_one():",
    "    ...",
    "    counter = ...",
    "    ...",
    "",
    "def subtract_one():",
    "    ...",
    "    counter = ...",
    "    ...",
    "",
    "thread1 = Thread(target=add_one)",
    "thread2 = Thread(target=subtract_one)",
    "",
    "thread1.start()",
    "thread2.start()"
  ]);
}

function raceConditionFigurePoints() {
  return numberedCodeFigure("Code", [
    "from threading import Thread",
    "",
    "points = 10",
    "",
    "def increase():",
    "    ...",
    "    points = ...",
    "    ...",
    "",
    "def decrease():",
    "    ...",
    "    points = ...",
    "    ...",
    "",
    "t1 = Thread(target=increase)",
    "t2 = Thread(target=decrease)",
    "",
    "t1.start()",
    "t2.start()"
  ]);
}

function labelledGraphFigure() {
  return `
    <svg viewBox="0 0 560 220" role="img" aria-label="Labelled graph">
      ${graphEdge(84, 110, 190, 50, "2")}
      ${graphEdge(84, 110, 190, 168, "3")}
      ${graphEdge(190, 50, 190, 168, "5")}
      ${graphEdge(190, 50, 330, 50, "4")}
      ${graphEdge(190, 168, 330, 50, "2")}
      ${graphEdge(190, 168, 330, 168, "8")}
      ${graphEdge(330, 50, 330, 168, "7")}
      ${graphEdge(330, 50, 470, 110, "2")}
      ${graphEdge(330, 168, 470, 110, "3")}
      ${graphNode(84, 110, "A")}
      ${graphNode(190, 50, "B")}
      ${graphNode(190, 168, "C")}
      ${graphNode(330, 50, "E")}
      ${graphNode(330, 168, "D")}
      ${graphNode(470, 110, "F")}
      <text x="280" y="208" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 3. Labelled graph for greedy path construction</text>
    </svg>
  `;
}

function labelledGraphFigureAlt() {
  return `
    <svg viewBox="0 0 560 220" role="img" aria-label="Alternative labelled graph">
      <line x1="82" y1="112" x2="182" y2="56" stroke="#475e55" stroke-width="2"/>
      <line x1="82" y1="112" x2="182" y2="164" stroke="#475e55" stroke-width="2"/>
      <line x1="182" y1="56" x2="300" y2="50" stroke="#475e55" stroke-width="2"/>
      <line x1="182" y1="164" x2="300" y2="50" stroke="#475e55" stroke-width="2"/>
      <line x1="182" y1="164" x2="302" y2="166" stroke="#475e55" stroke-width="2"/>
      <line x1="300" y1="50" x2="302" y2="166" stroke="#475e55" stroke-width="2"/>
      <line x1="300" y1="50" x2="444" y2="86" stroke="#475e55" stroke-width="2"/>
      <line x1="302" y1="166" x2="444" y2="86" stroke="#475e55" stroke-width="2"/>
      <text x="128" y="78" fill="#5f6b65" font-size="18">3</text>
      <text x="126" y="148" fill="#5f6b65" font-size="18">4</text>
      <text x="236" y="44" fill="#5f6b65" font-size="18">2</text>
      <text x="236" y="102" fill="#5f6b65" font-size="18">5</text>
      <text x="238" y="158" fill="#5f6b65" font-size="18">6</text>
      <text x="308" y="112" fill="#5f6b65" font-size="18">4</text>
      <text x="374" y="58" fill="#5f6b65" font-size="18">3</text>
      <text x="372" y="146" fill="#5f6b65" font-size="18">2</text>
      ${graphNode(68, 106, "A")}
      ${graphNode(180, 48, "B")}
      ${graphNode(180, 170, "C")}
      ${graphNode(300, 42, "D")}
      ${graphNode(304, 172, "E")}
      ${graphNode(456, 84, "F")}
      <text x="280" y="208" text-anchor="middle" fill="#5f6b65" font-size="14" font-family="Georgia, serif">Figure 3. Alternative labelled graph for greedy path construction</text>
    </svg>
  `;
}

function svgNode(x, y, width, height, label) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" fill="#d8eef0" stroke="#8cb7ba"/>
    <text x="${x + width / 2}" y="${y + 16}" text-anchor="middle" fill="#2c4647" font-size="12" font-family="Trebuchet MS, sans-serif">${label}</text>
  `;
}

function graphNode(x, y, label) {
  return `
    <circle cx="${x}" cy="${y}" r="22" fill="#d9eef8" stroke="#7ca5b6" stroke-width="2"/>
    <text x="${x}" y="${y + 5}" text-anchor="middle" fill="#25424f" font-size="18" font-family="Georgia, serif">${label}</text>
  `;
}

function graphEdge(x1, y1, x2, y2, label) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#47645a" stroke-width="2"/>
    <text x="${midX}" y="${midY - 8}" text-anchor="middle" fill="#2d433a" font-size="14" font-family="Trebuchet MS, sans-serif">${label}</text>
  `;
}

function numberedCodeFigure(label, lines) {
  return `
    <div class="algorithm-panel">
      <p class="card-label">${label}</p>
      <div class="numbered-code">
        ${lines.map((line, index) => `
          <div class="numbered-code-row">
            <span class="numbered-code-line">${index + 1}</span>
            <code class="numbered-code-text">${escapeHtml(line) || "&nbsp;"}</code>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function dedupeById(items) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+\s=]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordPresent(normalizedText, term) {
  return normalizedText.includes(normalize(term));
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      parsed
      && Array.isArray(parsed.history)
      && parsed.used
      && parsed.used["5004cmd"]
      && parsed.used["5002cmd"]
    ) {
      return normalizeLoadedState(parsed);
    }
  } catch (error) {
    console.warn("Failed to load state", error);
  }

  return normalizeLoadedState({
    history: [],
    used: makeUsedState()
  });
}

function normalizeLoadedState(parsed) {
  return {
    ...parsed,
    history: Array.isArray(parsed.history)
      ? parsed.history.map(normalizeHistoryAttempt)
      : [],
    used: parsed.used || makeUsedState()
  };
}

function normalizeHistoryAttempt(attempt) {
  return {
    ...attempt,
    questions: Array.isArray(attempt.questions)
      ? attempt.questions.map(normalizeHistoryQuestion)
      : []
  };
}

function normalizeHistoryQuestion(question) {
  if (question.kind === "multipart" && question.correctAnswer && Array.isArray(question.correctAnswer.parts)) {
    return {
      ...question,
      userAnswer: normalizeMultipartHistoryAnswer(question.userAnswer, question.correctAnswer.parts)
    };
  }

  if (question.kind === "table" && question.correctAnswer && Array.isArray(question.correctAnswer.rows)) {
    return {
      ...question,
      userAnswer: normalizeTableHistoryAnswer(question.userAnswer, question.correctAnswer.rows)
    };
  }

  return question;
}

function normalizeMultipartHistoryAnswer(userAnswer, correctParts) {
  const sourceParts = userAnswer && typeof userAnswer === "object" && Array.isArray(userAnswer.parts)
    ? userAnswer.parts
    : [];

  return {
    parts: correctParts.map((part, index) => ({
      label: sourceParts[index]?.label || part.label,
      prompt: sourceParts[index]?.prompt || part.prompt,
      kind: sourceParts[index]?.kind || part.kind || "short",
      answer: typeof sourceParts[index]?.answer === "string" ? sourceParts[index].answer : "",
      correct: typeof sourceParts[index]?.correct === "boolean" ? sourceParts[index].correct : undefined
    })),
    answered: sourceParts.some((part) => typeof part.answer === "string" && part.answer.trim() !== "")
  };
}

function normalizeTableHistoryAnswer(userAnswer, correctRows) {
  const sourceRows = userAnswer && typeof userAnswer === "object" && Array.isArray(userAnswer.rows)
    ? userAnswer.rows
    : [];

  return {
    rows: correctRows.map((row, index) => ({
      expression: sourceRows[index]?.expression || row.expression,
      expressionHtml: sourceRows[index]?.expressionHtml || row.expressionHtml,
      bigO: typeof sourceRows[index]?.bigO === "string" ? sourceRows[index].bigO : "",
      curve: typeof sourceRows[index]?.curve === "string" ? sourceRows[index].curve : ""
    })),
    answered: sourceRows.some((row) => {
      return (typeof row.bigO === "string" && row.bigO.trim() !== "")
        || (typeof row.curve === "string" && row.curve.trim() !== "");
    })
  };
}

function makeUsedState() {
  return {
    "5004cmd": {
      flashcards: Object.fromEntries(DATASETS.map((profile) => [profile.id, []])),
      exams: Object.fromEntries(DATASETS.map((profile) => [profile.id, []]))
    },
    "5002cmd": {
      flashcards: Object.fromEntries(ALGO_TOPICS.map((topic) => [topic.id, []])),
      exams: Object.fromEntries(ALGO_TOPICS.map((topic) => [topic.id, []]))
    }
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createAttemptId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

