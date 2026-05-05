import { Question } from "../types/question"

export const calculateScore = (
  questions: Question[],
  answers: Record<number, string>
) => {
  let score = 0

  questions.forEach((question) => {
    if (
      answers[question.id] === question.answer
    ) {
      score++
    }
  })

  return score
}