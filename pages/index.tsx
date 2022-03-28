import { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { QuizPlayer, StartPanel } from "../components";

type HomeProps = {
  apiKey: String;
};

const Home: NextPage<HomeProps> = ({ apiKey }) => {
  const [playerName, setPlayerName] = useState<String>("");
  const [difficulty, setDifficulty] = useState<String>("Easy");

  const setupCallback = (newPlayer: String, difficulty: String) => {
    setPlayerName(newPlayer);
    setDifficulty(difficulty);
  };

  return (
    <div className="md:flex flex-col max-w-sm max-h-screen mx-auto px-2 py-4">
      <Head>
        <title>Quiz!</title>
        <meta name="description" content="Prototype quiz app using Quiz Api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full my-5 py-5 bg-slate-100 dark:bg-slate-800 shadow-lg">
        {!playerName ? (
          <StartPanel parentCallback={setupCallback} />
        ) : (
          <>
            <h1>
              Hello {playerName}, difficulty: {difficulty}
            </h1>
            <QuizPlayer apiKey={apiKey} difficulty={difficulty} />
          </>
        )}
      </main>

      <footer className=" bg-gray-100 dark:bg-gray-900 text-gray-500 text-center">
        <small>
          Desafio por{" "}
          <a
            className="underline"
            href="https://economapas.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Economapas
          </a>
          . Desenvolvido por{" "}
          <a
            className="underline"
            href="https://github.com/guilhermemotta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guilherme Motta
          </a>
          .
        </small>
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
