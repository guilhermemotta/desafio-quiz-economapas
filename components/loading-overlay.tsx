const LoadingOverlay = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-sky-600 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-gray-600 text-xl font-semibold">
        Setting up quiz...
      </h2>
    </div>
  );
};

export default LoadingOverlay;
