type ButtonProps = {
  label: String;
};

const Button = ({ label }: ButtonProps) => {
  return (
    <button
      className="transition ease-in-out hover:scale-110 duration-300 w-20 px-4 py-2 mx-auto text-sm  bg-blue-500 text-white font-semibold rounded-md focus:outline-none"
      type="submit"
    >
      {label}
    </button>
  );
};

export default Button;
