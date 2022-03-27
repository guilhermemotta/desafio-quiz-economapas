import { SyntheticEvent } from "react";

type StartPanelProps = {
  parentCallback: (name: String, difficulty: String) => void;
};

const StartPanel = ({ parentCallback }: StartPanelProps) => {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      playerName: { value: string };
      difficulty: { value: string };
    };
    const playerName = target.playerName.value;
    const difficulty = target.difficulty.value;
    parentCallback(playerName, difficulty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="">Welcome to the Quiz Challenge</h1>
      <h3>Please enter your name so we can get started!</h3>
      <input name="playerName" type="text" placeholder="Name goes here :)" />
      <h3>Now select the difficulty:</h3>
      <label>
        <span>Easy</span>
        <input type="radio" name="difficulty" value="Easy" defaultChecked />
      </label>
      <label>
        <span>Hard</span>
        <input type="radio" name="difficulty" value="Hard" />
      </label>
      <input type="submit" value="Start!" />
    </form>
  );
};

export default StartPanel;
