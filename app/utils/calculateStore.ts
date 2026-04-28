
import { questions } from "../data/questions"
export const calculateScore = (
answers: Record<number, string>
) => {
let score = 0
questions.forEach((question) => {
if (answers[question.id] === question.answer) {
score++
}
})
return score
}
