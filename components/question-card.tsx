import { ChangeEvent, SyntheticEvent, useState } from "react";
import getCorrectAnswer from "../lib/get-correct-answer";
import { CorrectAnswers } from "../types";

import Button from "./button";

type QuestionCardProps = {
  id: number;
  question: string;
  description?: string;
  answers: Object;
  tags?: string[];
  category?: string;
  correctAnswers: CorrectAnswers;
  parentCallback: (
    questionId: number,
    playerAnswer: string,
    correctAnswer: string
  ) => void;
};

const QuestionCard = ({
  id,
  question,
  description,
  answers,
  correctAnswers,
  parentCallback,
}: QuestionCardProps) => {
  const answersArray = Object.entries(answers).map(([answer, value]) => {
    return { answer, value };
  });

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      answers: { value: string };
    };

    const playerAnswer = target.answers.value;
    if (playerAnswer === "") return;
    const correctAnswer = getCorrectAnswer(correctAnswers);

    parentCallback(id, playerAnswer, correctAnswer);
    setSelectedAnswer("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <section className="bg-white">
      <h2 className="text-lg">{question}</h2>
      {description && <h2>{description}</h2>}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {answers &&
          answersArray.map((answer, index) => {
            return (
              answer.value && (
                <label key={index}>
                  <input
                    className="sr-only peer"
                    type="radio"
                    name="answers"
                    value={answer.answer}
                    checked={selectedAnswer === answer.answer}
                    onChange={handleChange}
                  />
                  <div className="mx-4 my-2 px-2 py-2 rounded-md border-2 border-sky-600 text-gray-800 peer-checked:text-white bg-transparent peer-checked:bg-sky-600">
                    {answer.value}
                  </div>
                </label>
              )
            );
          })}
        <Button label="Next" />
      </form>
    </section>
  );
};

export default QuestionCard;
