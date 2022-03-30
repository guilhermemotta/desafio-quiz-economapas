import { QuestionData } from "../types";

async function fetchQuestions(
  apiKey: string,
  difficulty: string
): Promise<QuestionData[]> {
  const baseUrl = "https://quizapi.io/api/v1/questions";
  const currentUrl = `${baseUrl}?apiKey=${apiKey}&limit=10&difficulty=${difficulty}`;

  // const response = await fetch(currentUrl, { method: "GET" });
  const response = await fetch(currentUrl);
  const data = await response.json();
  console.log("fetchQuestions()");
  console.log(response);
  if (response.ok) {
    const questions = data;
    if (questions) {
      return questions;
    } else {
      return Promise.reject(new Error("Questions is falsy."));
    }
  } else {
    return Promise.reject(new Error("Couldn't fetch questions."));
  }
}

async function setUpQuestions(
  apiKey: string,
  difficulty: string
): Promise<QuestionData[]> {
  let questionsBatch = [] as QuestionData[];
  let finalBatch = [] as QuestionData[];
  while (finalBatch.length < 10) {
    questionsBatch = await fetchQuestions(apiKey, difficulty);

    for (let question of questionsBatch) {
      if (question.multiple_correct_answers) break;
      if (question.answers.answer_c) {
        if (question.answers.answer_d) {
          if (finalBatch.length >= 10) {
            break;
          }
          finalBatch.push(question);
        }
      }
    }
  }

  return finalBatch;
}

export default setUpQuestions;
