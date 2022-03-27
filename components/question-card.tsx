type QuestionCardProps = {
  question: String;
  description: String;
  answers: String[];
  tags: String[];
  category: String;
};

const QuestionCard = (questionProps: QuestionCardProps) => {
  const { question, description, answers, tags, category } = questionProps;
  return <h1>Hello dunha</h1>;
};

export default QuestionCard;
