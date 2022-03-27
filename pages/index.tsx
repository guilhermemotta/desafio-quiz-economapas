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
    <div className="md:flex flex-col bg-slate-100 max-w-sm mx-auto dark:bg-slate-800">
      <Head>
        <title>Quiz!</title>
        <meta name="description" content="Prototype quiz app using Quiz Api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full">
        {!playerName ? (
          <StartPanel parentCallback={setupCallback} />
        ) : (
          <>
            <h1>
              Olá {playerName}, difficulty: {difficulty}
            </h1>
            <QuizPlayer apiKey={apiKey} difficulty={difficulty} />
          </>
        )}
      </main>

      <footer className="flex ">
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
