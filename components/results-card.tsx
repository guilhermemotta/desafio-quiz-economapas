import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./button";
import { CorrectAnswers, PlayerAnswer } from "./quiz-player";

type ResultsCardProps = {
  id: number;
  question: string;
  description?: string;
  answers: Object;
  tags?: string[];
  category?: string;
  playerAnswer: PlayerAnswer;
  correctAnswers: CorrectAnswers;
  parentCallback: (questionId: number, playerAnswer: string) => void;
};

const ResultsCard = ({
  id,
  question,
  description,
  answers,
  playerAnswer,
  correctAnswers,
  parentCallback,
}: ResultsCardProps) => {
  const answersArray = Object.entries(answers).map(([answer, value]) => {
    return { answer, value };
  });

  // console.log(`correctAnswer = ${correctAnswer}`);

  return (
    <section>
      <h2 className="text-xl">{question}</h2>
      {description && <h2>{description}</h2>}
      <div className="flex flex-col">
        {answers &&
          answersArray.map((answer, index) => {
            const correctKey =
              `${answer.answer}_correct` as keyof CorrectAnswers;
            const correctAnswer = correctAnswers[correctKey];
            const colors =
              answer.answer === playerAnswer.answer
                ? "text-white bg-sky-600"
                : "text-gray-800 bg-transparent";
            const border =
              correctAnswer === "true"
                ? "border-green-500 border-4"
                : "border-red-500 border-4";
            return (
              answer.value && (
                <label key={index}>
                  <div
                    className={`mx-4 my-2 px-2 py-2 rounded-md border-2 border-sky-600 ${colors} ${border}`}
                  >
                    {answer.value}
                  </div>
                </label>
              )
            );
          })}
      </div>
    </section>
  );
};

export default ResultsCard;
