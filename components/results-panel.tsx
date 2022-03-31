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
    <article className="flex flex-col bg-white rounded-md shadow-lg px-4 pt-2 pb-8">
      <header className="flex flex-row justify-between pb-2">
        <h1 className="text-2xl flex-1">Results</h1>
        <h2 className="text-xl flex-1/2">Score: {playerScore}/10</h2>
      </header>
      {questionsData &&
        questionsData.map((question, index) => {
          return (
            <>
              <ResultsCard
                key={index}
                id={question.id}
                number={index + 1}
                answers={question.answers}
                question={question.question}
                category={question.category}
                parentCallback={() => {}}
                playerAnswer={playerAnswers[index]}
                correctAnswers={question.correct_answers}
              />
              {index < 9 && <hr />}
            </>
          );
        })}
      <Button onClick={handleClick} label="Restart Quiz!" />
    </article>
  );
};

export default ResultsPanel;
