import { GetStaticProps } from "next/types";
import { useEffect, useState } from "react";

import { QuestionCard } from ".";

import loadQuestions from "../lib/load-questions";
import ResultsPanel from "./results-panel";

type QuizPlayerProps = {
  apiKey: string;
  difficulty: string;
};

export type QuestionData = {
  id: number;
  question: string;
  description?: string;
  answers: Object;
  tags: string[];
  category: string;
  correct_answers: CorrectAnswers;
};

export type PlayerAnswer = {
  questionId: number;
  answer: string;
};

export type CorrectAnswers = {
  answer_a_correct: string;
  answer_b_correct: string;
  answer_c_correct: string;
  answer_d_correct: string;
  answer_e_correct: string;
  answer_f_correct: string;
};

const QuizPlayer = ({ apiKey, difficulty }: QuizPlayerProps) => {
  const [currentQuestionsData, setCurrentQuestionsData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState<Array<PlayerAnswer>>([]);
  const [isInitialSetup, setInitialSetup] = useState(true);

  const baseUrl = "https://quizapi.io/api/v1/questions";
  useEffect(() => {
    if (isInitialSetup) {
      setLoading(true);
      loadQuestions(
        `${baseUrl}?apiKey=${apiKey}&limit=10&difficulty=${difficulty}`
      ).then((questionsData) => {
        setCurrentQuestionsData(questionsData);
        setCurrentIndex(0);
        setCurrentQuestion(questionsData[currentIndex]);
        setLoading(false);
      });
      setInitialSetup(false);
    } else {
      setCurrentQuestion(currentQuestionsData[currentIndex]);
    }
  }, [difficulty, apiKey, currentIndex, currentQuestionsData, isInitialSetup]);

  if (isLoading) return <p>Loading...</p>;
  if (!currentQuestionsData) return <p>No questions data available.</p>;

  const updatePlayerAnswers = (questionId: number, playerAnswer: string) => {
    const currentAnswer: PlayerAnswer = { questionId, answer: playerAnswer };
    setPlayerAnswers([...playerAnswers, currentAnswer]);
    setCurrentIndex(currentIndex + 1);
    setCurrentQuestion(currentQuestionsData[currentIndex]);
  };

  return (
    <>
      {currentQuestion ? (
        <QuestionCard
          id={currentQuestion.id}
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          description={currentQuestion.description}
          parentCallback={updatePlayerAnswers}
        />
      ) : (
        <ResultsPanel
          playerAnswers={playerAnswers}
          questionsData={currentQuestionsData}
        />
      )}
    </>
  );
};

export default QuizPlayer;
