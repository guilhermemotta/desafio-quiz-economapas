import { ResultsCard } from ".";
import type { PlayerAnswer, QuestionData } from "../types";

type ResultsPanelProps = {
  playerAnswers: PlayerAnswer[];
  questionsData: QuestionData[];
};

const ResultsPanel = ({ playerAnswers, questionsData }: ResultsPanelProps) => {
  return (
    <article className="flex flex-col p-2">
      <h1 className="text-2xl">Results</h1>
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
    </article>
  );
};

export default ResultsPanel;
