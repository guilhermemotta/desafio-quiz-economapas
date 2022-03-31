import { ResultsCard } from ".";
import type { PlayerAnswer, QuestionData } from "../types";
import Button from "./button";

type ResultsPanelProps = {
  playerAnswers: PlayerAnswer[];
  questionsData: QuestionData[];
  playerScore: number;
};

const ResultsPanel = ({
  playerAnswers,
  questionsData,
  playerScore,
}: ResultsPanelProps) => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <article className="flex flex-col p-2">
      <h1 className="text-2xl">Results</h1>
      <h2 className="text-xl">Score: {playerScore}/10</h2>
      {questionsData &&
        questionsData.map((question, index) => {
          return (
            <ResultsCard
              key={index}
              id={question.id}
              answers={question.answers}
              question={question.question}
              parentCallback={() => {}}
              playerAnswer={playerAnswers[index]}
              correctAnswers={question.correct_answers}
            />
          );
        })}
      <Button onClick={handleClick} label="Restart Quiz!" />
    </article>
  );
};

export default ResultsPanel;
