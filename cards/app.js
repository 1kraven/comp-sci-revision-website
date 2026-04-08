const STORAGE_KEY = "ds-revision-lab-v1";

const DATASETS = [
  {
    id: "houseprice",
    name: "House Price Prediction",
    file: "HousePricePrediction.csv",
    rows: 2919,
    cols: 13,
    task: "Regression",
    target: "SalePrice",
    entity: "Ames housing records",
    summary: "A mixed-type property dataset where only 1460 rows have sale prices. The remaining 1459 rows behave like a held-out test partition.",
    stats: {
      trainRows: 1460,
      holdoutRows: 1459,
      strongestFeature: "TotalBsmtSF",
      strongestFeatureCorr: 0.614,
      topZone: "RL",
      topZoneCount: 2265,
      largestMissing: "SalePrice",
      largestMissingCount: 1459
    },
    exampleRow: {
      Id: "0",
      MSSubClass: "60",
      MSZoning: "RL",
      LotArea: "8450",
      LotConfig: "Inside",
      BldgType: "1Fam",
      OverallCond: "5",
      YearBuilt: "2003",
      TotalBsmtSF: "856",
      SalePrice: "208500"
    },
    previewRows: [
      {"Id":"0","MSSubClass":"60","MSZoning":"RL","LotArea":"8450","LotConfig":"Inside","BldgType":"1Fam","OverallCond":"5","YearBuilt":"2003","YearRemodAdd":"2003","Exterior1st":"VinylSd","BsmtFinSF2":"0","TotalBsmtSF":"856","SalePrice":"208500"},
      {"Id":"1","MSSubClass":"20","MSZoning":"RL","LotArea":"9600","LotConfig":"FR2","BldgType":"1Fam","OverallCond":"8","YearBuilt":"1976","YearRemodAdd":"1976","Exterior1st":"MetalSd","BsmtFinSF2":"0","TotalBsmtSF":"1262","SalePrice":"181500"},
      {"Id":"2","MSSubClass":"60","MSZoning":"RL","LotArea":"11250","LotConfig":"Inside","BldgType":"1Fam","OverallCond":"5","YearBuilt":"2001","YearRemodAdd":"2002","Exterior1st":"VinylSd","BsmtFinSF2":"0","TotalBsmtSF":"920","SalePrice":"223500"},
      {"Id":"3","MSSubClass":"70","MSZoning":"RL","LotArea":"9550","LotConfig":"Corner","BldgType":"1Fam","OverallCond":"5","YearBuilt":"1915","YearRemodAdd":"1970","Exterior1st":"Wd Sdng","BsmtFinSF2":"0","TotalBsmtSF":"756","SalePrice":"140000"},
      {"Id":"4","MSSubClass":"60","MSZoning":"RL","LotArea":"14260","LotConfig":"FR2","BldgType":"1Fam","OverallCond":"5","YearBuilt":"2000","YearRemodAdd":"2000","Exterior1st":"VinylSd","BsmtFinSF2":"0","TotalBsmtSF":"1145","SalePrice":"250000"}
    ],
    columns: ["Id", "MSSubClass", "MSZoning", "LotArea", "LotConfig", "BldgType", "OverallCond", "YearBuilt", "YearRemodAdd", "Exterior1st", "BsmtFinSF2", "TotalBsmtSF", "SalePrice"],
    metrics: ["RMSE", "MAE", "R²"],
    methods: ["Linear regression baseline", "Random forest regressor", "Gradient boosting"],
    cleaning: [
      "Split the data into training rows with a non-missing SalePrice and test-like rows where SalePrice is null.",
      "One-hot encode categorical features such as MSZoning, LotConfig, BldgType, and Exterior1st.",
      "Drop Id from modelling because it is an identifier rather than a predictive signal.",
      "Impute small feature gaps, for example with the mode for MSZoning and a sensible numeric fill for basement measurements."
    ],
    studyPoints: [
      "The exam-style trap is treating all 2919 rows as labelled data. Only 1460 rows can be used for supervised training.",
      "TotalBsmtSF is the strongest numeric correlate with SalePrice in the labelled subset.",
      "YearBuilt and YearRemodAdd are also meaningfully associated with price, so age and renovation effects matter.",
      "Because the target is continuous, regression metrics are more appropriate than classification accuracy.",
      "A tree ensemble can capture non-linear relationships between lot size, house age, and sale price."
    ],
    commonMistakes: [
      "Using SalePrice-missing rows in model fitting.",
      "Leaving categorical variables unencoded for linear models.",
      "Reporting accuracy for a regression problem."
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
    entity: "Hourly observations across 2012",
    summary: "A full-year hourly weather dataset with no missing values. It supports forecasting, classification, and descriptive time-series analysis.",
    stats: {
      topClass: "Mainly Clear",
      topClassCount: 2106,
      secondClass: "Mostly Cloudy",
      secondClassCount: 2069,
      minTemp: -23.3,
      maxTemp: 33.0,
      missingCount: 0
    },
    exampleRow: {
      "Date/Time": "1/1/2012 0:00",
      Temp_C: "-1.8",
      "Dew Point Temp_C": "-3.9",
      "Rel Hum_%": "86",
      "Wind Speed_km/h": "4",
      Visibility_km: "8",
      Press_kPa: "101.24",
      Weather: "Fog"
    },
    previewRows: [
      {"Date/Time":"1/1/2012 0:00","Temp_C":"-1.8","Dew Point Temp_C":"-3.9","Rel Hum_%":"86","Wind Speed_km/h":"4","Visibility_km":"8","Press_kPa":"101.24","Weather":"Fog"},
      {"Date/Time":"1/1/2012 1:00","Temp_C":"-1.8","Dew Point Temp_C":"-3.7","Rel Hum_%":"87","Wind Speed_km/h":"4","Visibility_km":"8","Press_kPa":"101.24","Weather":"Fog"},
      {"Date/Time":"1/1/2012 2:00","Temp_C":"-1.8","Dew Point Temp_C":"-3.4","Rel Hum_%":"89","Wind Speed_km/h":"7","Visibility_km":"4","Press_kPa":"101.26","Weather":"Freezing Drizzle,Fog"},
      {"Date/Time":"1/1/2012 3:00","Temp_C":"-1.5","Dew Point Temp_C":"-3.2","Rel Hum_%":"88","Wind Speed_km/h":"6","Visibility_km":"4","Press_kPa":"101.27","Weather":"Freezing Drizzle,Fog"},
      {"Date/Time":"1/1/2012 4:00","Temp_C":"-1.5","Dew Point Temp_C":"-3.3","Rel Hum_%":"88","Wind Speed_km/h":"7","Visibility_km":"4.8","Press_kPa":"101.23","Weather":"Fog"}
    ],
    columns: ["Date/Time", "Temp_C", "Dew Point Temp_C", "Rel Hum_%", "Wind Speed_km/h", "Visibility_km", "Press_kPa", "Weather"],
    metrics: ["F1 score", "Accuracy", "RMSE", "MAE"],
    methods: ["Datetime feature extraction", "Classification on Weather labels", "Regression on Temp_C", "Seasonal visualisation"],
    cleaning: [
      "Parse Date/Time into a datetime object and derive hour, day, month, and season features.",
      "Decide whether the task is label prediction on Weather or numeric prediction on Temp_C before choosing metrics.",
      "Use chronological splits for forecasting-style tasks to avoid temporal leakage.",
      "Scale numeric features if you are using distance-based or regularised models."
    ],
    studyPoints: [
      "The dataset has no missing values, so the focus is feature extraction rather than imputation.",
      "Weather is categorical, making classification natural; Temp_C is continuous, making regression natural.",
      "Hourly granularity makes seasonality and intraday patterns important.",
      "Mainly Clear and Mostly Cloudy are the two most common weather labels.",
      "Random shuffling is risky if the question is about forecasting or future prediction."
    ],
    commonMistakes: [
      "Ignoring the datetime column.",
      "Using a random train/test split for a temporal prediction question without justification.",
      "Treating Weather labels as numeric."
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
    entity: "Daily party support percentages across 2019",
    summary: "A one-year daily polling table stored in wide format, with each party represented as a separate column.",
    stats: {
      leadingParty: "Workers' Party",
      leadingPartyMean: 28.68,
      runnerUp: "Civic Party",
      runnerUpMean: 27.39,
      mostVolatile: "Liberal Party",
      volatility: 8.77,
      missingCount: 0
    },
    exampleRow: {
      "Date \\ Party": "1/1/2019",
      "National Party": "0",
      "People's Party": "20",
      "Alliance Party": "27",
      "Civic Party": "26",
      "Conservative Party": "1",
      "Liberal Party": "3",
      "Workers' Party": "23"
    },
    previewRows: [
      {"Date \\\\ Party":"1/1/2019","National Party":"0","People's Party":"20","Alliance Party":"27","Civic Party":"26","Conservative Party":"1","Liberal Party":"3","Workers' Party":"23"},
      {"Date \\\\ Party":"1/2/2019","National Party":"0","People's Party":"19","Alliance Party":"28","Civic Party":"26","Conservative Party":"1","Liberal Party":"4","Workers' Party":"22"},
      {"Date \\\\ Party":"1/3/2019","National Party":"0","People's Party":"20","Alliance Party":"29","Civic Party":"27","Conservative Party":"0","Liberal Party":"3","Workers' Party":"21"},
      {"Date \\\\ Party":"1/4/2019","National Party":"0","People's Party":"22","Alliance Party":"25","Civic Party":"25","Conservative Party":"1","Liberal Party":"2","Workers' Party":"25"},
      {"Date \\\\ Party":"1/5/2019","National Party":"0","People's Party":"24","Alliance Party":"22","Civic Party":"21","Conservative Party":"4","Liberal Party":"1","Workers' Party":"28"}
    ],
    columns: ["Date \\ Party", "National Party", "People's Party", "Alliance Party", "Civic Party", "Conservative Party", "Liberal Party", "Workers' Party"],
    metrics: ["MAE", "RMSE", "Trend interpretation"],
    methods: ["Wide-to-long reshaping", "Rolling averages", "Line plots over time", "Party comparison"],
    cleaning: [
      "Rename or parse the Date \\ Party column into a proper datetime field.",
      "Reshape from wide to long format if you need grouped line plots or faceted summaries.",
      "Keep time order intact when creating train/test splits for forecasting questions.",
      "Check whether each row sums to approximately 100 before interpreting it as a vote-share distribution."
    ],
    studyPoints: [
      "There is no single target variable unless you define a forecasting task.",
      "Workers' Party has the highest mean support and Civic Party is close behind.",
      "Liberal Party has the highest volatility, so its support changes most sharply across the year.",
      "This dataset is ideal for trend analysis, smoothing, and party comparison.",
      "A random split breaks temporal structure and can leak future information into training."
    ],
    commonMistakes: [
      "Treating each party column as an independent dataset without handling the shared date index.",
      "Skipping the wide-to-long conversion when the question asks for comparative plotting.",
      "Applying classification accuracy to a forecasting problem."
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
    entity: "Patient clinical risk records",
    summary: "A clinical prediction dataset for estimating whether a patient develops coronary heart disease within ten years.",
    stats: {
      positiveRate: 15.2,
      strongestFeature: "age",
      strongestFeatureCorr: 0.225,
      secondFeature: "sysBP",
      secondFeatureCorr: 0.216,
      largestMissing: "glucose",
      largestMissingCount: 388
    },
    exampleRow: {
      male: "1",
      age: "39",
      education: "4",
      currentSmoker: "0",
      cigsPerDay: "0",
      BPMeds: "0",
      prevalentHyp: "0",
      totChol: "195",
      sysBP: "106",
      TenYearCHD: "0"
    },
    previewRows: [
      {"male":"1","age":"39","education":"4","currentSmoker":"0","cigsPerDay":"0","BPMeds":"0","prevalentStroke":"0","prevalentHyp":"0","diabetes":"0","totChol":"195","sysBP":"106","diaBP":"70","BMI":"26.97","heartRate":"80","glucose":"77","TenYearCHD":"0"},
      {"male":"0","age":"46","education":"2","currentSmoker":"0","cigsPerDay":"0","BPMeds":"0","prevalentStroke":"0","prevalentHyp":"0","diabetes":"0","totChol":"250","sysBP":"121","diaBP":"81","BMI":"28.73","heartRate":"95","glucose":"76","TenYearCHD":"0"},
      {"male":"1","age":"48","education":"1","currentSmoker":"1","cigsPerDay":"20","BPMeds":"0","prevalentStroke":"0","prevalentHyp":"0","diabetes":"0","totChol":"245","sysBP":"127.5","diaBP":"80","BMI":"25.34","heartRate":"75","glucose":"70","TenYearCHD":"0"},
      {"male":"0","age":"61","education":"3","currentSmoker":"1","cigsPerDay":"30","BPMeds":"0","prevalentStroke":"0","prevalentHyp":"1","diabetes":"0","totChol":"225","sysBP":"150","diaBP":"95","BMI":"28.58","heartRate":"65","glucose":"103","TenYearCHD":"1"},
      {"male":"0","age":"46","education":"3","currentSmoker":"1","cigsPerDay":"23","BPMeds":"0","prevalentStroke":"0","prevalentHyp":"0","diabetes":"0","totChol":"285","sysBP":"130","diaBP":"84","BMI":"23.1","heartRate":"85","glucose":"85","TenYearCHD":"0"}
    ],
    columns: ["male", "age", "education", "currentSmoker", "cigsPerDay", "BPMeds", "prevalentStroke", "prevalentHyp", "diabetes", "totChol", "sysBP", "diaBP", "BMI", "heartRate", "glucose", "TenYearCHD"],
    metrics: ["ROC-AUC", "Recall", "Precision", "F1 score"],
    methods: ["Logistic regression", "Tree-based classification", "Class imbalance checks", "Confusion-matrix analysis"],
    cleaning: [
      "Impute missing values in glucose, education, BPMeds, totChol, and other clinical fields.",
      "Keep binary indicators such as male, diabetes, and currentSmoker as explicit 0/1 features.",
      "Consider scaling continuous variables for logistic regression or distance-based models.",
      "Use stratified splitting because the positive class rate is only about 15.2%."
    ],
    studyPoints: [
      "TenYearCHD is a binary target, so this is a classification problem.",
      "The dataset is imbalanced, which makes accuracy alone a weak evaluation metric.",
      "Age and systolic blood pressure are among the strongest predictors in the correlation summary.",
      "Clinical missingness must be handled before fitting most models.",
      "Recall is especially important when missing a true high-risk patient would be costly."
    ],
    commonMistakes: [
      "Reporting only accuracy on an imbalanced medical dataset.",
      "Ignoring missing clinical fields.",
      "Using a non-stratified split and ending up with unstable class distributions."
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
    entity: "Mobile app marketplace records",
    summary: "A large app-store dataset with strong cleaning needs, duplicate app names, and mixed-format categorical and numeric fields.",
    stats: {
      topCategory: "FAMILY",
      topCategoryCount: 1972,
      duplicates: 1181,
      largestMissing: "Rating",
      largestMissingCount: 1474,
      invalidMaxRating: 19,
      paidApps: 800,
      freeApps: 10039
    },
    exampleRow: {
      App: "Photo Editor & Candy Camera & Grid & ScrapBook",
      Category: "ART_AND_DESIGN",
      Rating: "4.1",
      Reviews: "159",
      Size: "19000",
      Installs: "10,000+",
      Type: "Free",
      Price: "0",
      Genres: "Art & Design"
    },
    previewRows: [
      {"App":"Photo Editor & Candy Camera & Grid & ScrapBook","Category":"ART_AND_DESIGN","Rating":"4.1","Reviews":"159","Size":"19000","Installs":"10,000+","Type":"Free","Price":"0","Content Rating":"Everyone","Genres":"Art & Design","Last Updated":"7-Jan-18","Current Ver":"1.0.0","Android Ver":"4.0.3 and up"},
      {"App":"Coloring book moana","Category":"ART_AND_DESIGN","Rating":"3.9","Reviews":"967","Size":"14000","Installs":"500,000+","Type":"Free","Price":"0","Content Rating":"Everyone","Genres":"Art & Design;Pretend Play","Last Updated":"15-Jan-18","Current Ver":"2.0.0","Android Ver":"4.0.3 and up"},
      {"App":"U Launcher Lite – FREE Live Cool Themes, Hide Apps","Category":"ART_AND_DESIGN","Rating":"4.7","Reviews":"87510","Size":"8700","Installs":"5,000,000+","Type":"Free","Price":"0","Content Rating":"Everyone","Genres":"Art & Design","Last Updated":"1-Aug-18","Current Ver":"1.2.4","Android Ver":"4.0.3 and up"},
      {"App":"Sketch - Draw & Paint","Category":"ART_AND_DESIGN","Rating":"4.5","Reviews":"215644","Size":"25000","Installs":"50,000,000+","Type":"Free","Price":"0","Content Rating":"Teen","Genres":"Art & Design","Last Updated":"8-Jun-18","Current Ver":"Varies with device","Android Ver":"4.2 and up"},
      {"App":"Pixel Draw - Number Art Coloring Book","Category":"ART_AND_DESIGN","Rating":"4.3","Reviews":"967","Size":"2800","Installs":"100,000+","Type":"Free","Price":"0","Content Rating":"Everyone","Genres":"Art & Design;Creativity","Last Updated":"20-Jun-18","Current Ver":"1.1","Android Ver":"4.4 and up"}
    ],
    columns: ["App", "Category", "Rating", "Reviews", "Size", "Installs", "Type", "Price", "Content Rating", "Genres", "Last Updated", "Current Ver", "Android Ver"],
    metrics: ["RMSE", "MAE", "F1 score", "Descriptive quality checks"],
    methods: ["Duplicate removal", "String-to-numeric cleaning", "Category analysis", "Rating prediction"],
    cleaning: [
      "Remove or reconcile duplicate app entries because App has many repeated names.",
      "Convert Installs, Reviews, and Price into usable numeric forms by stripping punctuation or symbols if needed.",
      "Investigate impossible ratings such as the observed maximum of 19 and either correct or remove those rows.",
      "Handle missing Rating values before using Rating as a regression target."
    ],
    studyPoints: [
      "This dataset is strongest for data cleaning and EDA, but it can also support supervised tasks after preparation.",
      "FAMILY is the most common category in the dataset.",
      "There are many more free apps than paid apps.",
      "Rating cannot be trusted blindly because the summary shows an impossible maximum of 19.",
      "App-level duplicates can distort descriptive summaries and models if not handled."
    ],
    commonMistakes: [
      "Running a model before cleaning duplicated apps and malformed numeric fields.",
      "Using Rating as a target without inspecting missing and invalid values.",
      "Forgetting that text-like version fields may be poor direct numeric predictors."
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
    entity: "Regional housing market observations",
    summary: "A cleaner regression dataset than the Ames-style housing file, with five numeric predictors and one address field that behaves like a near-unique identifier.",
    stats: {
      strongestFeature: "Avg. Area Income",
      strongestFeatureCorr: 0.64,
      secondFeature: "Avg. Area House Age",
      secondFeatureCorr: 0.453,
      missingCount: 0,
      avgPrice: 1232072.65
    },
    exampleRow: {
      "Avg. Area Income": "79545.45857",
      "Avg. Area House Age": "5.682861322",
      "Avg. Area Number of Rooms": "7.009188143",
      "Avg. Area Number of Bedrooms": "4.09",
      "Area Population": "23086.8005",
      Price: "1059033.558"
    },
    previewRows: [
      {"Avg. Area Income":"79545.45857","Avg. Area House Age":"5.682861322","Avg. Area Number of Rooms":"7.009188143","Avg. Area Number of Bedrooms":"4.09","Area Population":"23086.8005","Price":"1059033.558","Address":"208 Michael Ferry Apt. 674 / Laurabury, NE 37010-5101"},
      {"Avg. Area Income":"79248.64245","Avg. Area House Age":"6.002899808","Avg. Area Number of Rooms":"6.730821019","Avg. Area Number of Bedrooms":"3.09","Area Population":"40173.07217","Price":"1505890.915","Address":"188 Johnson Views Suite 079 / Lake Kathleen, CA 48958"},
      {"Avg. Area Income":"61287.06718","Avg. Area House Age":"5.86588984","Avg. Area Number of Rooms":"8.51272743","Avg. Area Number of Bedrooms":"5.13","Area Population":"36882.1594","Price":"1058987.988","Address":"9127 Elizabeth Stravenue / Danieltown, WI 06482-3489"},
      {"Avg. Area Income":"63345.24005","Avg. Area House Age":"7.188236095","Avg. Area Number of Rooms":"5.586728665","Avg. Area Number of Bedrooms":"3.26","Area Population":"34310.24283","Price":"1260616.807","Address":"USS Barnett / FPO AP 44820"},
      {"Avg. Area Income":"59982.19723","Avg. Area House Age":"5.040554523","Avg. Area Number of Rooms":"7.839387785","Avg. Area Number of Bedrooms":"4.23","Area Population":"26354.10947","Price":"630943.4893","Address":"USNS Raymond / FPO AE 09386"}
    ],
    columns: ["Avg. Area Income", "Avg. Area House Age", "Avg. Area Number of Rooms", "Avg. Area Number of Bedrooms", "Area Population", "Price", "Address"],
    metrics: ["RMSE", "MAE", "R²"],
    methods: ["Multiple linear regression", "Regularised regression", "Residual analysis", "Feature importance"],
    cleaning: [
      "Drop Address from the baseline model because it behaves like a nearly unique text identifier.",
      "Use the numeric housing features directly after checking scale and multicollinearity.",
      "No missing values are reported, so model preparation is relatively straightforward.",
      "Standardise the numeric predictors if the chosen model is sensitive to scale."
    ],
    studyPoints: [
      "This is a direct regression problem with Price as the target variable.",
      "Avg. Area Income has the strongest linear correlation with Price.",
      "Because the dataset is relatively clean, it is a good candidate for a linear-regression baseline.",
      "Address is useful for geography-aware feature engineering only if you are willing to extract structured location data.",
      "Residual plots are helpful for checking whether a linear model is missing non-linear structure."
    ],
    commonMistakes: [
      "Feeding raw Address text into a simple regression pipeline.",
      "Evaluating with classification metrics.",
      "Skipping baseline linear regression and jumping straight to a complex model."
    ]
  }
];

const theoryByTask = {
  Regression: [
    "Use RMSE or MAE when the target is continuous.",
    "Compare a simple linear baseline against a non-linear model before deciding the data needs complexity.",
    "Check for leakage, missingness, encoding requirements, and residual behaviour before celebrating a score."
  ],
  "Binary Classification": [
    "Check class balance before choosing metrics.",
    "A confusion matrix matters because false positives and false negatives carry different costs.",
    "Stratified splitting usually gives more stable evaluation than a naive random split on imbalanced targets."
  ],
  "Time Series / Comparative EDA": [
    "Preserve chronology during evaluation.",
    "Feature extraction from date fields and rolling summaries is often more useful than generic random splitting.",
    "Visual trend analysis can be a major part of the answer, not just modelling."
  ],
  "Time Series / Classification / Regression": [
    "The metric depends on whether you are predicting a label or a continuous value.",
    "Datetime features often carry more signal than raw strings.",
    "Temporal order matters whenever the question implies forecasting."
  ],
  "EDA / Cleaning / Optional Regression": [
    "Cleaning quality can matter more than model choice.",
    "Inspect duplicates and malformed values before trusting descriptive statistics.",
    "Not every dataset needs a predictive model if the exam question is about data preparation or exploratory insight."
  ]
};

let state = loadState();
let flashcardPools = {};
let examPools = {};
let currentFlashcardSession = null;
let currentExamSession = null;

const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".nav-link");
const flashcardDatasetSelect = document.getElementById("flashcardDataset");
const flashcardCountInput = document.getElementById("flashcardCount");
const examDatasetSelect = document.getElementById("examDataset");
const examCountInput = document.getElementById("examCount");
const flashcardEmpty = document.getElementById("flashcardEmpty");
const flashcardSession = document.getElementById("flashcardSession");
const flashcardTitle = document.getElementById("flashcardTitle");
const flashcardMeta = document.getElementById("flashcardMeta");
const flashcardSeenNotice = document.getElementById("flashcardSeenNotice");
const flashcardProgress = document.getElementById("flashcardProgress");
const flashcardQuestion = document.getElementById("flashcardQuestion");
const flashcardAnswer = document.getElementById("flashcardAnswer");
const flashcardAnswerWrap = document.getElementById("flashcardAnswerWrap");
const flashcardReviewList = document.getElementById("flashcardReviewList");
const revealFlashcardBtn = document.getElementById("revealFlashcard");
const markFlashcardRightBtn = document.getElementById("markFlashcardRight");
const markFlashcardWrongBtn = document.getElementById("markFlashcardWrong");
const prevFlashcardBtn = document.getElementById("prevFlashcard");
const nextFlashcardBtn = document.getElementById("nextFlashcard");
const submitFlashcardsBtn = document.getElementById("submitFlashcards");
const examEmpty = document.getElementById("examEmpty");
const examForm = document.getElementById("examForm");
const examTitle = document.getElementById("examTitle");
const examMeta = document.getElementById("examMeta");
const examQuestionCount = document.getElementById("examQuestionCount");
const examQuestions = document.getElementById("examQuestions");
const examResults = document.getElementById("examResults");
const historyFilter = document.getElementById("historyFilter");
const historyList = document.getElementById("historyList");
const historyDetail = document.getElementById("historyDetail");
const datasetGrid = document.getElementById("datasetGrid");
const datasetModal = document.getElementById("datasetModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalPreview = document.getElementById("modalPreview");
const metricFlashcards = document.getElementById("metricFlashcards");
const metricExamQuestions = document.getElementById("metricExamQuestions");

init();

function init() {
  flashcardPools = Object.fromEntries(DATASETS.map((profile) => [profile.id, buildFlashcardPool(profile)]));
  examPools = Object.fromEntries(DATASETS.map((profile) => [profile.id, buildExamPool(profile)]));
  populateDatasetSelects();
  renderDashboard();
  renderHistory();
  updateMetrics();
  bindEvents();
}

function bindEvents() {
  navLinks.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });

  document.getElementById("generateFlashcards").addEventListener("click", generateFlashcardDeck);
  revealFlashcardBtn.addEventListener("click", revealFlashcard);
  markFlashcardRightBtn.addEventListener("click", () => markFlashcard(true));
  markFlashcardWrongBtn.addEventListener("click", () => markFlashcard(false));
  prevFlashcardBtn.addEventListener("click", () => moveFlashcard(-1));
  nextFlashcardBtn.addEventListener("click", () => moveFlashcard(1));
  submitFlashcardsBtn.addEventListener("click", submitFlashcardDeck);
  document.getElementById("generateExam").addEventListener("click", generateExam);
  examForm.addEventListener("submit", finishExam);
  historyFilter.addEventListener("change", renderHistory);
  document.getElementById("clearHistory").addEventListener("click", clearHistory);
  document.getElementById("closeDatasetModal").addEventListener("click", closeDatasetModal);
  datasetModal.addEventListener("click", (event) => {
    if (event.target === datasetModal) {
      closeDatasetModal();
    }
  });
}

function setActiveView(viewId) {
  views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  navLinks.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
}

function populateDatasetSelects() {
  const flashcardOptions = ['<option value="all">All datasets</option>']
    .concat(DATASETS.map((profile) => `<option value="${profile.id}">${profile.name}</option>`))
    .join("");
  const examOptions = ['<option value="all">All datasets</option>']
    .concat(DATASETS.map((profile) => `<option value="${profile.id}">${profile.name}</option>`))
    .join("");
  flashcardDatasetSelect.innerHTML = flashcardOptions;
  examDatasetSelect.innerHTML = examOptions;
}

function renderDashboard() {
  datasetGrid.innerHTML = DATASETS.map((profile) => `
    <article class="dataset-card" data-dataset-id="${profile.id}">
      <p class="eyebrow">${profile.task}</p>
      <h3>${profile.name}</h3>
      <p>${profile.summary}</p>
      <div class="pill-row">
        <span class="pill">${profile.rows} rows</span>
        <span class="pill">${profile.cols} columns</span>
        <span class="pill">Target: ${profile.target}</span>
      </div>
      <div class="review-item">
        <p><strong>Key exam angle:</strong> ${profile.studyPoints[0]}</p>
      </div>
    </article>
  `).join("");

  datasetGrid.querySelectorAll(".dataset-card").forEach((card) => {
    card.addEventListener("click", () => openDatasetModal(card.dataset.datasetId));
  });
}

function updateMetrics() {
  metricFlashcards.textContent = Object.values(flashcardPools).reduce((sum, cards) => sum + cards.length, 0);
  metricExamQuestions.textContent = Object.values(examPools).reduce((sum, questions) => sum + questions.length, 0);
}

function buildFlashcardPool(profile) {
  const cards = [];
  const topicTag = profile.name;
  const taskTheory = theoryByTask[profile.task] || [];

  cards.push(makeCard(profile.id, `${profile.id}-overview`, `What is the main story of ${profile.file}?`, profile.summary, topicTag));
  cards.push(makeCard(profile.id, `${profile.id}-task`, `What type of data science problem does ${profile.file} represent?`, `${profile.file} is best framed as ${profile.task.toLowerCase()}. A good answer should also explain why ${profile.target} or the analytical goal fits that task.`, topicTag));
  cards.push(makeCard(profile.id, `${profile.id}-target`, `What should you focus on as the outcome or target in ${profile.file}?`, `A strong answer centres on ${profile.target}. You should link that outcome to the kind of analysis or prediction the dataset supports.`, topicTag));
  cards.push(makeCard(profile.id, `${profile.id}-columns`, `Which columns would you mention first when introducing ${profile.file}?`, `Useful columns to mention include ${profile.columns.slice(0, 4).join(", ")}. The best answers explain what those columns mean in the context of the dataset.`, topicTag));
  cards.push(makeCard(profile.id, `${profile.id}-shape`, `Why does the shape of ${profile.file} matter in an exam answer?`, `It has ${profile.rows} rows and ${profile.cols} columns, which is enough for train/test work or meaningful EDA, but you still need to discuss data quality and variable meaning.`, topicTag));

  if (profile.stats.largestMissingCount !== undefined) {
    cards.push(makeCard(profile.id, `${profile.id}-missing`, `What is the main data quality issue involving missing values in ${profile.file}?`, `${profile.stats.largestMissing} has the biggest missing-value issue with ${profile.stats.largestMissingCount} missing entries, so any good answer should discuss how that affects analysis.`, topicTag));
  } else {
    cards.push(makeCard(profile.id, `${profile.id}-missing`, `What is notable about missing values in ${profile.file}?`, `The dataset profile reports no missing values, so the focus shifts toward interpretation, feature choice, time handling, or modelling rather than imputation.`, topicTag));
  }

  if (profile.stats.strongestFeature) {
    cards.push(makeCard(profile.id, `${profile.id}-signal`, `Which variable appears to have the strongest link to the outcome in ${profile.file}?`, `${profile.stats.strongestFeature} is the strongest highlighted variable, with an approximate correlation of ${profile.stats.strongestFeatureCorr}. That makes it a strong feature to discuss in interpretation.`, topicTag));
  }

  if (profile.stats.topClass) {
    cards.push(makeCard(profile.id, `${profile.id}-class-balance`, `What does the label distribution tell you in ${profile.file}?`, `${profile.stats.topClass} is the most frequent label with ${profile.stats.topClassCount} rows, and ${profile.stats.secondClass} is close behind. This helps explain likely class imbalance or dominant weather patterns.`, topicTag));
  }

  if (profile.stats.leadingParty) {
    cards.push(makeCard(profile.id, `${profile.id}-party-lead`, `Which party appears strongest overall in ${profile.file}?`, `${profile.stats.leadingParty} has the highest mean support at about ${profile.stats.leadingPartyMean}%, with ${profile.stats.runnerUp} not far behind.`, topicTag));
    cards.push(makeCard(profile.id, `${profile.id}-party-volatility`, `Which party changes most over time in ${profile.file}?`, `${profile.stats.mostVolatile} shows the largest variation over time, with a standard deviation of about ${profile.stats.volatility}.`, topicTag));
  }

  if (profile.stats.positiveRate) {
    cards.push(makeCard(profile.id, `${profile.id}-imbalance`, `Why should you worry about class imbalance in ${profile.file}?`, `The positive class rate is only about ${profile.stats.positiveRate}%, so a model can look accurate while still missing many important positive cases.`, topicTag));
  }

  if (profile.stats.invalidMaxRating) {
    cards.push(makeCard(profile.id, `${profile.id}-invalid-rating`, `What obvious warning tells you ${profile.file} needs careful cleaning?`, `The Rating field reaches ${profile.stats.invalidMaxRating}, which is not realistic for a normal app rating scale. That immediately signals dirty data.`, topicTag));
  }

  if (profile.stats.holdoutRows) {
    cards.push(makeCard(profile.id, `${profile.id}-holdout-meaning`, `Why is the missing target in ${profile.file} more than just a missing-value issue?`, `Because ${profile.stats.holdoutRows} rows appear to be unlabeled hold-out examples rather than ordinary random missing values, so they should not be treated as labelled training data.`, topicTag));
  }

  profile.studyPoints.forEach((point, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-insight-${index}`, `What is an important interpretation point for ${profile.file}?`, point, topicTag));
  });

  profile.commonMistakes.forEach((point, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-mistake-${index}`, `What mistake should you avoid when discussing ${profile.file}?`, point, topicTag));
  });

  profile.cleaning.forEach((point, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-prep-${index}`, `What preparation idea matters for ${profile.file} before analysis or modelling?`, point, topicTag));
  });

  profile.metrics.forEach((metric, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-metric-${index}`, `Why is ${metric} relevant for ${profile.file}?`, explainMetric(profile, metric), topicTag));
  });

  taskTheory.forEach((note, index) => {
    cards.push(makeCard(profile.id, `${profile.id}-theory-${index}`, `What general data science principle would strengthen an answer on ${profile.name}?`, note, topicTag));
  });

  return dedupeById(cards);
}

function buildExamPool(profile) {
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
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to predict on the test set and evaluate the model using RMSE and R².", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "A full answer should predict first, then compute RMSE and R²."),
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
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to evaluate the model using RMSE and R².", ["mean_squared_error", "r2_score", "sqrt"], "rmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "A strong answer includes both RMSE and R²."),
    codeQuestion(profile.id, `${profile.id}-plot-a`, "Write code to visualise actual vs predicted SalePrice values using a scatter plot.", ["scatter", "y_test", "y_pred", "show"], "plt.scatter(y_test, y_pred)\nplt.xlabel('Actual SalePrice')\nplt.ylabel('Predicted SalePrice')\nplt.title('Actual vs Predicted SalePrice')\nplt.show()", "The plot should compare actual target values to predictions."),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Why should rows with missing SalePrice not be used as labelled training data?", ["missing", "target", "unlabeled", "train"], "Those rows are unlabeled because the target SalePrice is missing, so they should not be used as supervised training examples.", "A correct explanation must connect missing SalePrice to unlabeled data.", 2),
    codeQuestion(profile.id, `${profile.id}-corr-a`, "Write code to compute the correlation of numeric variables with SalePrice in the labelled subset.", ["corr", "SalePrice", "sort_values"], "train_df.corr(numeric_only=True)['SalePrice'].sort_values(ascending=False)", "This supports feature interpretation."),
    keywordQuestion(profile.id, `${profile.id}-metric-a`, "Why is R² useful in this house-price regression task?", ["variance", "explained", "regression"], "R² is useful because it shows how much of the variation in SalePrice is explained by the regression model.", "A good answer should connect R² to explained variance.", 2)
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
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to evaluate the Google Play model using RMSE and R².", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "The evaluation stage should include prediction and regression metrics."),
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
    keywordQuestion(profile.id, `${profile.id}-imbalance-a`, "Why can accuracy be misleading on this dataset?", ["imbalanced", "15", "positive", "majority"], "Accuracy can be misleading because the positive class is relatively rare, so a model can score well by favouring the majority class.", "The answer should connect class imbalance to misleading accuracy.", 2),
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
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to predict temperature on the test set and compute RMSE and R².", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "Regression evaluation should include prediction and metrics."),
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
    codeQuestion(profile.id, `${profile.id}-eval-a`, "Write code to predict on the test set and compute RMSE and R².", ["predict", "mean_squared_error", "r2_score", "sqrt"], "y_pred = lm.predict(X_test)\nrmse = np.sqrt(mean_squared_error(y_test, y_pred))\nr2 = r2_score(y_test, y_pred)\nprint(rmse, r2)", "This follows the same regression-evaluation pattern as your mock exam style."),
    keywordQuestion(profile.id, `${profile.id}-chronology-a`, "Why is a random split not ideal for a real forecasting version of this polling task?", ["future", "leakage", "time", "chronology"], "A random split is weak for true forecasting because it can leak future dates into training instead of preserving chronological order.", "A correct answer should mention future leakage or chronology.", 2),
    keywordQuestion(profile.id, `${profile.id}-interpret-a`, "Why is converting the dataset from wide to long format useful?", ["plot", "compare", "party", "visual"], "Wide-to-long conversion makes it easier to compare parties, group results, and create cleaner visualisations.", "A good answer should mention comparison or plotting benefits.", 2),
    codeQuestion(profile.id, `${profile.id}-std-a`, "Write code to calculate the standard deviation of support for each party.", ["std", "sort_values"], "df.drop(columns=['Date \\\\ Party']).std().sort_values(ascending=False)", "Standard deviation helps identify the most volatile party."),
    codeQuestion(profile.id, `${profile.id}-sumcheck-a`, "Write code to check whether daily party percentages sum to about 100 for each row.", ["sum", "axis=1"], "df.drop(columns=['Date \\\\ Party']).sum(axis=1).head()", "This is a good data-understanding check for poll shares.")
  ]);
}

function generateFlashcardDeck() {
  const selected = flashcardDatasetSelect.value;
  const count = clamp(parseInt(flashcardCountInput.value, 10) || 12, 6, 20);
  let cards = [];

  if (selected === "all") {
    const perDatasetBase = Math.floor(count / DATASETS.length);
    const remainder = count % DATASETS.length;
    DATASETS.forEach((profile, index) => {
      const sampleCount = perDatasetBase + (index < remainder ? 1 : 0);
      if (sampleCount > 0) {
        cards = cards.concat(getUniqueItems(flashcardPools[profile.id], "flashcards", profile.id, sampleCount));
      }
    });
    while (cards.length < count) {
      const profile = DATASETS[randomInt(0, DATASETS.length - 1)];
      const extra = getUniqueItems(flashcardPools[profile.id], "flashcards", profile.id, 1)[0];
      if (extra && !cards.some((card) => card.id === extra.id)) {
        cards.push(extra);
      } else if (!extra) {
        break;
      }
    }
    cards = shuffle(cards).slice(0, count);
  } else {
    cards = getUniqueItems(flashcardPools[selected], "flashcards", selected, count);
  }

  currentFlashcardSession = {
    id: createAttemptId("flashcard"),
    type: "flashcard",
    datasetId: selected,
    datasetName: selected === "all" ? "All datasets" : getProfile(selected).name,
    startedAt: new Date().toISOString(),
    cards: cards.map((card) => ({ ...card, selfCheck: null, revealed: false })),
    index: 0,
    completed: false
  };

  flashcardEmpty.classList.add("hidden");
  flashcardSession.classList.remove("hidden");
  renderFlashcard();
  setActiveView("flashcards");
}

function renderFlashcard() {
  if (!currentFlashcardSession || currentFlashcardSession.cards.length === 0) {
    return;
  }

  const current = currentFlashcardSession.cards[currentFlashcardSession.index];
  const questionHistory = getQuestionHistoryStatus(current.question);
  flashcardTitle.textContent = `${currentFlashcardSession.datasetName} Deck`;
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
  flashcardAnswerWrap.classList.remove("hidden");
  revealFlashcardBtn.classList.add("hidden");
  markFlashcardRightBtn.classList.remove("hidden");
  markFlashcardWrongBtn.classList.remove("hidden");
}

function markFlashcard(isRight) {
  if (!currentFlashcardSession) {
    return;
  }

  currentFlashcardSession.cards[currentFlashcardSession.index].revealed = true;
  currentFlashcardSession.cards[currentFlashcardSession.index].selfCheck = isRight ? "right" : "wrong";
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
      <p><strong>${index + 1}.</strong> ${card.question}</p>
      <p>${card.selfCheck === "right" ? "Marked correct" : card.selfCheck === "wrong" ? "Marked incorrect" : "Not answered yet"}</p>
    </article>
  `).join("");
}

function saveFlashcardSession() {
  if (!currentFlashcardSession) {
    return;
  }

  const attempt = {
    id: currentFlashcardSession.id,
    type: "flashcard",
    datasetId: currentFlashcardSession.datasetId,
    datasetName: currentFlashcardSession.datasetName,
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
  renderHistory();
}

function submitFlashcardDeck() {
  if (!currentFlashcardSession || currentFlashcardSession.completed) {
    return;
  }

  saveFlashcardSession();
  currentFlashcardSession.completed = true;
  currentFlashcardSession = null;
  flashcardSession.classList.add("hidden");
  flashcardEmpty.classList.remove("hidden");
  flashcardReviewList.innerHTML = "";
  setActiveView("flashcards");
}

function generateExam() {
  const selected = examDatasetSelect.value;
  const count = clamp(parseInt(examCountInput.value, 10) || 10, 6, 14);
  let questions = [];
  let datasetName = "";
  let examMetaText = "";

  if (selected === "all") {
    const perDatasetBase = Math.floor(count / DATASETS.length);
    const remainder = count % DATASETS.length;
    DATASETS.forEach((profile, index) => {
      const sampleCount = perDatasetBase + (index < remainder ? 1 : 0);
      if (sampleCount > 0) {
        questions = questions.concat(getUniqueItems(examPools[profile.id], "exams", profile.id, sampleCount));
      }
    });

    while (questions.length < count) {
      const profile = DATASETS[randomInt(0, DATASETS.length - 1)];
      const extra = getUniqueItems(examPools[profile.id], "exams", profile.id, 1)[0];
      if (extra && !questions.some((question) => question.id === extra.id)) {
        questions.push(extra);
      } else if (!extra) {
        break;
      }
    }

    questions = shuffle(questions).slice(0, count).map((question) => ({ ...question }));
    datasetName = "All datasets";
    examMetaText = "Mixed paper across all six datasets";
  } else {
    const profile = getProfile(selected);
    questions = getUniqueItems(examPools[selected], "exams", selected, count).map((question) => ({ ...question }));
    datasetName = profile.name;
    examMetaText = `${profile.file} • ${profile.task}`;
  }

  currentExamSession = {
    id: createAttemptId("exam"),
    datasetId: selected,
    datasetName,
    startedAt: new Date().toISOString(),
    questions
  };

  examEmpty.classList.add("hidden");
  examForm.classList.remove("hidden");
  examResults.classList.add("hidden");
  examTitle.textContent = `${datasetName} Mock Exam`;
  examMeta.textContent = examMetaText;
  examQuestionCount.textContent = `${questions.length} questions`;
  examQuestions.innerHTML = questions.map((question, index) => renderExamQuestion(question, index)).join("");
  setActiveView("exams");
}

function renderExamQuestion(question, index) {
  const questionProfile = getProfile(question.datasetId);
  const preview = renderDatasetPreview(questionProfile);
  const questionHistory = getQuestionHistoryStatus(question.prompt);
  const seenNotice = renderSeenNotice(questionHistory);

  if (question.kind === "mcq") {
    return `
      <article class="question-card">
        ${preview}
        ${seenNotice}
        <h4>${index + 1}. ${question.prompt}</h4>
        <div class="option-list">
          ${question.options.map((option, optionIndex) => `
            <label class="option-item">
              <input type="radio" name="${question.id}" value="${optionIndex}">
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }

  return `
    <article class="question-card">
      ${preview}
      ${seenNotice}
      <h4>${index + 1}. ${question.prompt}</h4>
      <textarea name="${question.id}" placeholder="${question.kind === "code" ? "Write Python code here" : "Write your short answer here"}"></textarea>
    </article>
  `;
}

function finishExam(event) {
  event.preventDefault();
  if (!currentExamSession) {
    return;
  }

  const formData = new FormData(examForm);
  const gradedQuestions = currentExamSession.questions.map((question, index) => {
    const rawAnswer = formData.get(question.id);
    const userAnswer = typeof rawAnswer === "string" ? rawAnswer.trim() : "";
    const result = gradeQuestion(question, userAnswer);
    return {
      number: index + 1,
      kind: question.kind,
      prompt: question.prompt,
      userAnswer: userAnswer || "No answer given",
      correctAnswer: result.correctAnswer,
      explanation: question.explanation,
      correct: result.correct
    };
  });

  const score = gradedQuestions.filter((item) => item.correct).length;
  const attempt = {
    id: currentExamSession.id,
    type: "exam",
    datasetId: currentExamSession.datasetId,
    datasetName: currentExamSession.datasetName,
    createdAt: new Date().toISOString(),
    score,
    total: gradedQuestions.length,
    questions: gradedQuestions
  };

  state.history.unshift(attempt);
  saveState();
  renderHistory();
  renderExamResults(attempt);
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
        <h3>${attempt.datasetName} results</h3>
        <p>Marked immediately on ${formatDate(attempt.createdAt)}. Review every answer below.</p>
      </div>
    </div>
    <div class="exam-questions">
      ${attempt.questions.map((question) => `
        <article class="history-question ${question.correct ? "correct" : "incorrect"}">
          <h4>${question.number}. ${question.prompt}</h4>
          ${renderAnswerBlock("Your answer:", question.userAnswer, question.kind)}
          ${renderAnswerBlock("Correct answer:", question.correctAnswer, question.kind === "code" ? "code" : question.kind)}
          <p>${escapeHtml(question.explanation)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderHistory() {
  const filter = historyFilter.value;
  const attempts = state.history.filter((item) => filter === "all" || item.type === filter);

  if (attempts.length === 0) {
    historyList.innerHTML = '<div class="empty-state"><p>No saved attempts match this filter yet.</p></div>';
    historyDetail.innerHTML = '<p>Select an attempt to inspect its questions and answers.</p>';
    return;
  }

  historyList.innerHTML = attempts.map((attempt) => `
    <article class="history-item" data-attempt-id="${attempt.id}">
      <p class="eyebrow">${attempt.type === "exam" ? "Mock Exam" : "Flashcards"}</p>
      <h4>${attempt.datasetName}</h4>
      <p class="history-meta">${formatDate(attempt.createdAt)}</p>
      <p class="history-meta">Score: ${attempt.score}/${attempt.total}</p>
    </article>
  `).join("");

  historyList.querySelectorAll(".history-item").forEach((item) => {
    item.addEventListener("click", () => renderHistoryDetail(item.dataset.attemptId));
  });

  const firstAttempt = attempts[0];
  if (firstAttempt) {
    renderHistoryDetail(firstAttempt.id);
  }
}

function renderHistoryDetail(attemptId) {
  historyList.querySelectorAll(".history-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.attemptId === attemptId);
  });

  const attempt = state.history.find((item) => item.id === attemptId);
  if (!attempt) {
    historyDetail.innerHTML = "<p>Attempt not found.</p>";
    return;
  }

  historyDetail.classList.remove("empty-state");
  historyDetail.innerHTML = `
    <div class="review-item">
      <p class="eyebrow">${attempt.type === "exam" ? "Mock Exam" : "Flashcards"}</p>
      <h4>${attempt.datasetName}</h4>
      <p>Completed on ${formatDate(attempt.createdAt)}</p>
      <p>Score: ${attempt.score}/${attempt.total}</p>
    </div>
    <div class="review-list">
      ${attempt.questions.map((question, index) => `
        <article class="history-question ${question.correct ? "correct" : "incorrect"}">
          <h4>${index + 1}. ${escapeHtml(question.prompt)}</h4>
          ${renderAnswerBlock("Your answer:", question.userAnswer, question.kind)}
          ${renderAnswerBlock("Correct answer:", question.correctAnswer, question.kind === "code" ? "code" : question.kind)}
        </article>
      `).join("")}
    </div>
  `;
}

function clearHistory() {
  if (!confirm("Clear all saved flashcard and exam history from this browser?")) {
    return;
  }

  state.history = [];
  saveState();
  renderHistory();
}

function openDatasetModal(datasetId) {
  const profile = getProfile(datasetId);
  if (!profile) {
    return;
  }

  modalTitle.textContent = profile.name;
  modalMeta.textContent = `${profile.file} • ${profile.rows} rows • ${profile.cols} columns • Read-only preview`;
  modalPreview.innerHTML = renderSpreadsheet(profile);
  datasetModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeDatasetModal() {
  datasetModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function getUniqueItems(pool, mode, datasetId, count) {
  const used = state.used[mode][datasetId] || [];
  let available = pool.filter((item) => !used.includes(item.id));

  if (available.length < count) {
    state.used[mode][datasetId] = [];
    available = [...pool];
  }

  const chosen = shuffle([...available]).slice(0, Math.min(count, available.length));
  state.used[mode][datasetId] = [...(state.used[mode][datasetId] || []), ...chosen.map((item) => item.id)];
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

function makeCard(datasetId, id, question, answer, tag) {
  return { datasetId, id, question, answer, tag };
}

function mcq(datasetId, id, prompt, options, answerIndex, explanation) {
  return { datasetId, id, kind: "mcq", prompt, options, answerIndex, explanation };
}

function shortQuestion(datasetId, id, prompt, acceptableAnswers, explanation) {
  return { datasetId, id, kind: "short", prompt, acceptableAnswers, explanation };
}

function codeQuestion(datasetId, id, prompt, requiredTerms, modelAnswer, explanation, passingScore = null) {
  return { datasetId, id, kind: "code", prompt, requiredTerms, modelAnswer, explanation, passingScore };
}

function keywordQuestion(datasetId, id, prompt, requiredTerms, modelAnswer, explanation, passingScore = null) {
  return { datasetId, id, kind: "keyword", prompt, requiredTerms, modelAnswer, explanation, passingScore };
}

function getProfile(datasetId) {
  return DATASETS.find((profile) => profile.id === datasetId);
}

function renderDatasetPreview(profile) {
  if (!profile || !profile.exampleRow) {
    return "";
  }

  const rows = Object.entries(profile.exampleRow).map(([column, value]) => `
    <tr>
      <td>${escapeHtml(column)}</td>
      <td>${escapeHtml(String(value))}</td>
    </tr>
  `).join("");

  return `
    <div class="dataset-preview">
      <p class="eyebrow">Dataset Snapshot</p>
      <h5>${escapeHtml(profile.name)} sample row</h5>
      <table class="preview-table">
        <thead>
          <tr>
            <th>Column</th>
            <th>Example Data</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderSpreadsheet(profile) {
  const datasetRows = (window.DATASET_ROWS && window.DATASET_ROWS[profile.id]) || profile.previewRows || [];
  const columns = datasetRows[0] ? Object.keys(datasetRows[0]) : profile.columns;
  const head = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("");
  const body = datasetRows.map((row, index) => `
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

function getQuestionHistoryStatus(prompt) {
  const previousEntries = state.history.flatMap((attempt) => attempt.questions || []);
  const matches = previousEntries.filter((question) => question.prompt === prompt);
  const answeredBefore = matches.some((question) => {
    const answer = String(question.userAnswer || "").trim();
    return answer !== "" && answer !== "No answer given" && answer !== "Not answered";
  });

  return {
    seenBefore: matches.length > 0,
    answeredBefore
  };
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
  const safeValue = escapeHtml(value || "");
  const labelClass = label.startsWith("Correct") ? "correct-answer" : "user-answer";
  if (safeValue === "No answer given") {
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

  return `<p><span class="${labelClass}">${label}</span> ${safeValue}</p>`;
}

function targetAnswers(profile) {
  if (profile.id === "googleplay") {
    return ["Rating", "Usually Rating after cleaning"];
  }
  if (profile.id === "weather") {
    return ["Weather", "Temp_C", "Weather or Temp_C"];
  }
  if (profile.id === "electionpoll") {
    return ["No fixed target", "Forecasting party support", "Party support forecasting"];
  }
  return [profile.target];
}

function explainMetric(profile, metric) {
  if (metric === "RMSE" || metric === "MAE" || metric === "R²") {
    return `${metric} suits ${profile.target} because the target is continuous and the goal is to measure regression performance.`;
  }
  if (metric === "ROC-AUC" || metric === "Recall" || metric === "Precision" || metric === "F1 score" || metric === "Accuracy") {
    return `${metric} is defensible because ${profile.file} includes a categorical outcome or label-focused prediction task.`;
  }
  return `${metric} can be justified if you tie it to the task definition and the consequences of different kinds of error.`;
}

function explainMethod(profile, method) {
  if (/linear regression/i.test(method)) {
    return `the dataset contains structured predictors and a continuous target, making a linear baseline easy to interpret.`;
  }
  if (/logistic regression/i.test(method)) {
    return `the target is binary and logistic regression gives interpretable class probabilities.`;
  }
  if (/random forest|gradient boosting|tree/i.test(method)) {
    return `tree-based models can capture non-linear relationships and interactions without heavy manual feature design.`;
  }
  if (/datetime|rolling|seasonal|visualisation|line plots|reshaping/i.test(method)) {
    return `the dataset contains temporal structure, so extracting date features or plotting trends is central to the analysis.`;
  }
  return `it matches the target structure and the key preprocessing needs of the dataset.`;
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
    .replaceAll("²", "2")
    .toLowerCase()
    .replace(/[^a-z0-9.%+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keywordPresent(normalizedText, term) {
  const normalizedTerm = normalize(term);
  return normalizedText.includes(normalizedTerm);
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && parsed.history && parsed.used) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to load state", error);
  }

  return {
    history: [],
    used: {
      flashcards: Object.fromEntries(DATASETS.map((profile) => [profile.id, []])),
      exams: Object.fromEntries(DATASETS.map((profile) => [profile.id, []]))
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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
