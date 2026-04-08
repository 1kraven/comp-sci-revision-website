# 5004CMD Data Science Revision Lab

A small revision website built around the 6 datasets in the `datasets` folder for 5004CMD Data Science exam practice.

## What It Includes

### Dashboard
- Shows all 6 datasets used in the revision site.
- Clicking a dataset opens a read-only spreadsheet-style viewer.
- The viewer shows the full dataset inside the website so you can inspect columns and values without editing anything.

### Flashcards
- Dataset-based revision cards focused on understanding the data, interpretation, modelling ideas, common mistakes, and key exam points.
- Flashcards are not meant to be code-writing drills.
- You can generate decks for one dataset or across all datasets.
- The site tries not to repeat flashcards until the question pool has been cycled.

### Mock Exams
- Step-by-step exam-style questions based on the datasets.
- Questions are designed to resemble common university mock-exam structure:
  - read the dataset
  - inspect rows
  - check missing values
  - check duplicates
  - show summary statistics
  - define `X` and `y`
  - split train/test data
  - fit a model
  - evaluate the model
  - visualise results
  - interpret results
- Each mock exam can be generated for one dataset or across all datasets.
- Questions are auto-marked immediately after submission.

### Answered History
- Stores previous flashcard decks and mock exams in the browser.
- Shows:
  - what questions appeared
  - what you answered
  - the correct answer
  - your score
- Also tells you if a flashcard or exam question has appeared before.

## Datasets Covered

The site uses these 6 datasets:

1. `HousePricePrediction.csv`
2. `Weather-data.csv`
3. `electionpoll.csv`
4. `framingham_heart_disease.csv`
5. `googleplaystore.csv`
6. `housing.csv`

## Question Coverage

The exact numbers can vary slightly as the pools evolve, but the site currently includes:

- A large flashcard bank across all 6 datasets
- A large mock-exam bank across all 6 datasets
- Multiple question variants per dataset
- Mixed all-dataset exams and dataset-specific exams

The website metrics on the dashboard show the current total number of flashcards and mock-exam questions available.

## How It Works

1. Open `index.html` in the `cards` folder.
2. Use `Dashboard` to inspect the datasets.
3. Use `Flashcards` for concept revision.
4. Use `Mock Exams` for code-style practice.
5. Use `Answered History` to review mistakes and repeated questions.

## Notes

- All history is stored locally in the browser.
- The dataset viewer is read-only.
- Mock exam code answers are displayed in a separate code style in results/history to make them easier to compare.
