import { PlayerAnswer, QuestionData } from "./quiz-player";

type ResultsPanelProps = {
  playerAnswers: PlayerAnswer[];
  questionsData: QuestionData[];
};

const ResultsPanel = ({ playerAnswers, questionsData }: ResultsPanelProps) => {
  console.log(playerAnswers);
  console.table(questionsData);
  return <h1>Results Panel</h1>;
};

export default ResultsPanel;
