# Computer Science Revision App

Browser-based revision app for two Coventry University modules:

- `5002CMD` Advanced Algorithms
- `5004CMD` Data Science

## Features

### Module Switching

- Sidebar navigation lets you switch between `5002CMD` and `5004CMD`.
- Each module has its own dashboard, flashcards, mock exams, and answered history.
- History filtering and deck/exam generation are scoped to the currently selected module.

### Dashboard

- `5004CMD` shows dataset cards and preview access for the six revision datasets.
- `5002CMD` shows topic cards for the algorithms revision areas.
- The dashboard header includes live counts for item coverage, flashcards available, and exam questions available.

### Flashcards

- Generate decks by focus area or from the full module pool.
- Deck sizes are configurable in the UI.
- Questions stay non-repeating until the stored pool for that scope has been cycled.
- Flashcards are self-marked as right or wrong and saved into local history when submitted.

### Mock Exams

- Generate auto-marked mock exams by focus area or from all topics/datasets.
- Questions are marked immediately after submission.
- Different answer types are supported, including:
  - short answers
  - keyword-based answers
  - code/pseudocode answers
  - multipart questions
  - table-style worksheet questions
- Hints and visual figures are included where relevant.

### Actual Mock Mode

- `5002CMD` uses paper-style mock papers built from fixed section patterns.
- The app currently rotates among 8 prepared `5002CMD` actual-mock paper patterns.

### Answered History

- Every submitted flashcard deck and mock exam is stored in browser local storage.
- History can be filtered to show all attempts, flashcards only, or mock exams only.
- Selecting an attempt shows:
  - completion time
  - score
  - each question
  - your saved answer
  - the expected answer
- Multipart and table answers are stored and rendered in structured form for review.
- Repeated questions can show a notice that they have appeared before or have been answered before.

## 5004CMD Dataset Coverage

The `5004CMD` side of the app is built around these six datasets:

1. `HousePricePrediction.csv`
2. `Weather-data.csv`
3. `electionpoll.csv`
4. `framingham_heart_disease.csv`
5. `googleplaystore.csv`
6. `housing.csv`

These files are stored in the top-level `datasets/` folder.

## How To Run

1. Open `cards/index.html` in a browser.
2. Choose a module from the left sidebar.
3. Use `Dashboard`, `Flashcards`, `Mock Exams`, and `Answered History` as needed.
