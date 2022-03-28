type ResultsPanelProps = {
  playerAnswers: Object[];
};

const ResultsPanel = ({ playerAnswers }: ResultsPanelProps) => {
  console.log(playerAnswers);
  return <h1>Results Panel</h1>;
};

export default ResultsPanel;
