import { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "./button";

type QuestionCardProps = {
  id: number;
  question: String;
  description?: String;
  answers: Object;
  tags?: String[];
  category?: String;
  parentCallback: (questionId: number, playerAnswer: String) => void;
};

const QuestionCard = ({
  id,
  question,
  description,
  answers,
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
    parentCallback(id, playerAnswer);
    setSelectedAnswer("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <section>
      <h2>{question}</h2>
      {description && <h2>{description}</h2>}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {answers &&
          answersArray.map((answer, index) => {
            return (
              answer.value && (
                <label key={index}>
                  <input
                    type="radio"
                    name="answers"
                    value={answer.answer}
                    key={index}
                    checked={selectedAnswer === answer.answer}
                    onChange={handleChange}
                  />
                  {answer.value}
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
