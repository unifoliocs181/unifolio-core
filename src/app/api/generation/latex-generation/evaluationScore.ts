export type Evaluation = {
  qualityScore: number
  clean: number
  professional: number
  consistent: number
  referenceRelevance: number
}

const THRESHOLD = 0.8
const MIN_CATEGORY_SCORE = 0.6

const weights = {
  qualityScore: 0.25,
  clean: 0.15,
  professional: 0.2,
  consistent: 0.2,
  referenceRelevance: 0.2,
}

export function isEvaluationPassing(evaluation: Evaluation): boolean {
  const scaled = {
    qualityScore: evaluation.qualityScore / 10,
    clean: evaluation.clean / 10,
    professional: evaluation.professional / 10,
    consistent: evaluation.consistent / 10,
    referenceRelevance: evaluation.referenceRelevance / 10,
  }

  if (Object.values(scaled).some((score) => score < MIN_CATEGORY_SCORE)) {
    return false
  }

  const averageScore = Object.entries(scaled).reduce(
    (sum, [key, value]) => sum + value * weights[key as keyof typeof weights],
    0,
  )

  return averageScore >= THRESHOLD
}
