import { useEffect, useState } from "react";

import { QuestionCard, ResultsPanel, LoadingOverlay } from ".";
import type { PlayerAnswer, QuestionData } from "../types";
import fetchQuestions from "../lib/fetch-questions";
import setUpQuestions from "../lib/fetch-questions";

type QuizPlayerProps = {
  apiKey: string;
  difficulty: string;
};

const QuizPlayer = ({ apiKey, difficulty }: QuizPlayerProps) => {
  const [questionsData, setQuestionsData] = useState<Array<QuestionData>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData>();
  const [isLoading, setLoading] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState<Array<PlayerAnswer>>([]);
  const [isInitialSetup, setInitialSetup] = useState(true);

  const baseUrl = "https://quizapi.io/api/v1/questions";
  useEffect(() => {
    // if (isInitialSetup) {
    setLoading(true);
    setUpQuestions(apiKey, difficulty)
      .then((data) => {
        setQuestionsData([...data]);
        setCurrentIndex(0);
        setCurrentQuestion(questionsData[currentIndex]);
        setLoading(false);
        setInitialSetup(false);
      })
      .catch((error) => console.error(error));
    // }
  }, []);

  // useEffect(() => {
  //   setCurrentQuestion(questionsData[currentIndex]);
  // }, [currentIndex]);

  if (isLoading)
    return (
      <>
        <LoadingOverlay />
        <p>Loading...</p>
      </>
    );
  if (!questionsData) return <p>No questions data available.</p>;

  const updatePlayerAnswers = (questionId: number, playerAnswer: string) => {
    const currentAnswer: PlayerAnswer = { questionId, answer: playerAnswer };
    setPlayerAnswers([...playerAnswers, currentAnswer]);
    setCurrentIndex(currentIndex + 1);
    setCurrentQuestion(questionsData[currentIndex]);
  };

  return (
    <>
      {currentQuestion && (
        <QuestionCard
          id={currentQuestion.id}
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          description={currentQuestion.description}
          parentCallback={updatePlayerAnswers}
        />
      )}
      {playerAnswers.length === 10 && (
        <ResultsPanel
          playerAnswers={playerAnswers}
          questionsData={questionsData}
        />
      )}
    </>
  );
};

export default QuizPlayer;
