import { SyntheticEvent } from "react";

import { Button } from ".";

type StartPanelProps = {
  parentCallback: (name: string, difficulty: string) => void;
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
    <section className="bg-white rounded-md shadow-lg py-4">
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
        <fieldset className="flex flex-row m-2 justify-around">
          <label>
            <input
              className="sr-only peer"
              type="radio"
              name="difficulty"
              value="Easy"
              defaultChecked
            />
            <div className="rounded-md flex px-4 py-2 bg-transparent text-black peer-checked:bg-sky-600 peer-checked:text-white cursor-pointer">
              Easy
            </div>
          </label>
          <label>
            <input
              className="sr-only peer"
              type="radio"
              name="difficulty"
              value="Hard"
            />
            <div className="rounded-md flex px-4 py-2 bg-transparent text-black peer-checked:bg-sky-600 peer-checked:text-white cursor-pointer">
              Hard
            </div>
          </label>
        </fieldset>
        <Button label="Start!" />
      </form>
    </section>
  );
};

export default StartPanel;
