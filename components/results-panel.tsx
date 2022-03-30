import { useEffect, useState } from "react";
import { CorrectAnswers, PlayerAnswer, QuestionData } from "./quiz-player";
import ResultsCard from "./results-card";

type ResultsPanelProps = {
  playerAnswers: PlayerAnswer[];
  questionsData: QuestionData[];
};

const ResultsPanel = ({ playerAnswers, questionsData }: ResultsPanelProps) => {
  // const getCorrectAnswer = (questionsData: QuestionData, index: number) => {
  //   if (!questionsData)
  //     throw Error("getCorrectAnswer(...args) Invalid argument");
  //   const correctAnswers = questionsData.correct_answers;
  //   let currentCorrectAnswer = "";
  //   for (let key in correctAnswers) {
  //     console.log(`index = ${index}: key = ${key}`);
  //     if (key === "true") {
  //       currentCorrectAnswer = key;
  //     }
  //     console.log(key);
  //     currentCorrectAnswer = "false";
  //   }
  //   return currentCorrectAnswer;
  // };

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
