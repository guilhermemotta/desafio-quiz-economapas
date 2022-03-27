import { useEffect, useRef, useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import loadQuestions from "../lib/load-questions";

import { QuizPlayer, StartPanel } from "../components";

type HomeProps = {
  apiKey: String;
};

const Home: NextPage<HomeProps> = ({ apiKey }: HomeProps) => {
  const [playerName, setPlayerName] = useState<String>("");
  const [difficulty, setDifficulty] = useState<String>("Easy");

  const setupCallback = (newPlayer: String, difficulty: String) => {
    setPlayerName(newPlayer);
    setDifficulty(difficulty);
  };

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
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No questions data available.</p>;

  return (
    <div className="dark:bg-slate-800">
      <Head>
        <title>Quiz!</title>
        <meta name="description" content="Prototype quiz app using Quiz Api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {!playerName ? (
          <StartPanel parentCallback={setupCallback} />
        ) : (
          <>
            <h1>
              Olá {playerName}, difficulty: {difficulty}
            </h1>
            <QuizPlayer />
          </>
        )}
      </main>

      <footer className="">
        <a
          href="https://github.com/guilhermemotta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Desenvolvido por Guilherme Motta
        </a>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_QUIZ_API_KEY;
  return {
    props: {
      apiKey,
    },
  };
};
