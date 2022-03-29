import { useEffect, useState } from "react";
import { PlayerAnswer, QuestionData } from "./quiz-player";
import ResultsCard from "./results-card";

type ResultsPanelProps = {
  playerAnswers: PlayerAnswer[];
  questionsData: QuestionData[];
};

const ResultsPanel = ({ playerAnswers, questionsData }: ResultsPanelProps) => {
  console.log(playerAnswers);
  console.table(questionsData);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

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
              correctAnswer={correctAnswers[index]}
            />
          );
        })}
    </article>
  );
};

export default ResultsPanel;
