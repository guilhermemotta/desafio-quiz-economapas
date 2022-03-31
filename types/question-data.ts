export type QuestionData = {
  answers: {
    answer_a: string;
    answer_b: string;
    answer_c?: string;
    answer_d?: string;
    answer_e?: string;
    answer_f?: string;
  };
  category: string;
  correct_answer?: string;
  correct_answers: {
    answer_a_correct: string;
    answer_b_correct: string;
    answer_c_correct: string;
    answer_d_correct: string;
    answer_e_correct: string;
    answer_f_correct: string;
  };
  description?: string;
  difficulty: string;
  explanation?: string;
  id: number;
  multiple_correct_answers: string;
  question: string;
  tags: [{ name: string }];
  tip?: string;
};
