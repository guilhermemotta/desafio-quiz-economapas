import { SyntheticEvent } from "react";

import { Button } from ".";

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
      <h1 className="text-xl font-bold m-3">Welcome to the Quiz Challenge</h1>
      <h3 className="text-lg m-2">
        Please enter your name so we can get started!
      </h3>
      <input
        className="m-2 px-2 text-md"
        name="playerName"
        type="text"
        placeholder="Name goes here :)"
        autoFocus={true}
      />
      <h3 className="text-lg m-2">Now select the difficulty:</h3>
      <fieldset className="flex flex-row m-2">
        <label>
          <span>Easy</span>
          <input
            className="m-2"
            type="radio"
            name="difficulty"
            value="Easy"
            defaultChecked
          />
        </label>
        <label>
          <span>Hard</span>
          <input className="m-2" type="radio" name="difficulty" value="Hard" />
        </label>
      </fieldset>
      <Button label="Start!" />
    </form>
  );
};

export default StartPanel;
