import { useEffect, useState } from "react";

import { QuestionCard, ResultsPanel, LoadingOverlay } from ".";
import type { PlayerAnswer, QuestionData } from "../types";
import fetchQuestions from "../lib/fetch-questions";
import setUpQuestions from "../lib/fetch-questions";
import getCorrectAnswer from "../lib/get-correct-answer";

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
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    setLoading(true);
    setUpQuestions(apiKey, difficulty)
      .then((data) => {
        setQuestionsData([...data]);
      })
      .then(() => {
        setCurrentQuestion(questionsData[currentIndex]);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setCurrentQuestion(questionsData[currentIndex]);
  }, [questionsData, currentIndex]);

  const updatePlayerAnswers = (
    questionId: number,
    playerAnswer: string,
    correctAnswer: string
  ) => {
    const currentAnswer: PlayerAnswer = {
      questionId,
      chosenAnswer: playerAnswer,
      correctAnswer,
    };
    if (correctAnswer && correctAnswer.includes(playerAnswer)) {
      setPlayerScore(playerScore + 1);
    }
    setPlayerAnswers([...playerAnswers, currentAnswer]);
    setCurrentIndex(currentIndex + 1);
    setCurrentQuestion(questionsData[currentIndex]);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (!questionsData) return <p>No questions data available.</p>;

  return (
    <>
      {currentQuestion && (
        <QuestionCard
          id={currentQuestion.id}
          number={currentIndex + 1}
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          description={currentQuestion.description}
          parentCallback={updatePlayerAnswers}
          correctAnswers={currentQuestion.correct_answers}
          category={currentQuestion.category}
        />
      )}
      {playerAnswers.length === 10 && (
        <ResultsPanel
          playerAnswers={playerAnswers}
          questionsData={questionsData}
          playerScore={playerScore}
        />
      )}
    </>
  );
};

export default QuizPlayer;
