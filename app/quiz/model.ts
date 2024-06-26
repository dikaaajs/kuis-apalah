export interface QuizModel {
  headline: string;
  description: string;
  questions: QuestionModel[];
}

export interface QuestionModel {
  paragraf: string;
  image: string[];
  options: OptionModel[];
}

export interface OptionModel {
  paragraf: string;
  image: string[];
  nav: boolean;
}
