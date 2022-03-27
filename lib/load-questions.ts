const loadQuestions = async (url: String) => {
  const response = await fetch(url as RequestInfo);
  return response.json();
};

export default loadQuestions;
