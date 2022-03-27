import { GetStaticProps } from "next/types";
import { useEffect, useState } from "react";

import loadQuestions from "../lib/load-questions";

type QuizPlayerProps = {
  apiKey: String;
  difficulty: String;
};

const QuizPlayer = ({ apiKey, difficulty }: QuizPlayerProps) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const baseUrl = "https://quizapi.io/api/v1/questions";
  useEffect(() => {
    setLoading(true);
    loadQuestions(
      `${baseUrl}?apiKey=${apiKey}&limit=10&difficulty=${difficulty}`
    ).then((questionsData) => {
      setQuestions(questionsData);
      setLoading(false);
    });
  }, [difficulty, apiKey]);

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No questions data available.</p>;

  return <h1>Quiz Player!</h1>;
};

export default QuizPlayer;
