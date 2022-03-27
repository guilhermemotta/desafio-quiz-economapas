import { SyntheticEvent } from "react";

import { StartButton } from ".";

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
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h1 className="">Welcome to the Quiz Challenge</h1>
      <h3>Please enter your name so we can get started!</h3>
      <input
        name="playerName"
        type="text"
        placeholder="Name goes here :)"
        autoFocus
      />
      <h3>Now select the difficulty:</h3>
      <fieldset className="flex flex-row">
        <label>
          <span>Easy</span>
          <input type="radio" name="difficulty" value="Easy" defaultChecked />
        </label>
        <label>
          <span>Hard</span>
          <input type="radio" name="difficulty" value="Hard" />
        </label>
      </fieldset>
      <StartButton label="Start!" />
    </form>
  );
};

export default StartPanel;
