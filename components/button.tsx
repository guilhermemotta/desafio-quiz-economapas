import { MouseEventHandler } from "react";

type ButtonProps = {
  label: String;
  onClick?: MouseEventHandler;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="transition ease-in-out hover:scale-110 duration-300 w-20 px-4 py-2 mx-auto text-sm  bg-sky-600 text-white font-semibold rounded-md focus:outline-none"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
