import Link from "next/link";
import type { CorrectAnswers, PlayerAnswer } from "../types";

type ResultsCardProps = {
  id: number;
  number: number;
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
  number,
  question,
  description,
  answers,
  playerAnswer,
  correctAnswers,
  category,
  parentCallback,
}: ResultsCardProps) => {
  const answersArray = Object.entries(answers).map(([answer, value]) => {
    return { answer, value };
  });

  if (!playerAnswer) return <></>;

  return (
    <section className="py-4 mt-2 mb-4">
      <h3 className="text-sm">
        <strong>Category:</strong> {category ?? "Code"}
      </h3>
      <h1 className="text-xl text-gray-600 mt-2 mb-4">
        Question {"#" + number}
      </h1>
      <h2 className="text-lg">{question}</h2>
      {description && <h2>{description}</h2>}
      <div className="flex flex-col">
        {answers &&
          answersArray.map((answer, index) => {
            const correctKey =
              `${answer.answer}_correct` as keyof CorrectAnswers;
            const correctAnswer = correctAnswers[correctKey];
            const colors =
              answer.answer === playerAnswer.chosenAnswer
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
