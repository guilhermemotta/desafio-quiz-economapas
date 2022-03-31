import { CorrectAnswers, QuestionData } from "../types";

export default function getCorrectAnswer(
  correctAnswers: CorrectAnswers
): string {
  let correctAnswer = "";

  let key: keyof CorrectAnswers;
  for (key in correctAnswers) {
    if (correctAnswers[key] === "true") {
      correctAnswer = key;
    }
  }

  return correctAnswer;
}
