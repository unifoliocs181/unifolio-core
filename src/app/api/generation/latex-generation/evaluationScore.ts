export type Evaluation = {
  qualityScore: number
  clean: number
  professional: number
  consistent: number
  resumeRelevance: number
}

const THRESHOLD = 0.8
const MIN_CATEGORY_SCORE = 0.6

const weights = {
  qualityScore: 0.25,
  clean: 0.15,
  professional: 0.2,
  consistent: 0.2,
  resumeRelevance: 0.2,
}

export function isEvaluationPassing(evaluation: Evaluation): boolean {
  const scaled = {
    qualityScore: evaluation.qualityScore / 10,
    clean: evaluation.clean / 10,
    professional: evaluation.professional / 10,
    consistent: evaluation.consistent / 10,
    resumeRelevance: evaluation.resumeRelevance / 10,
  }

  console.log("Scaled Scores:", scaled)

  for (const key of Object.keys(scaled) as Array<keyof typeof scaled>) {
    if (scaled[key] < MIN_CATEGORY_SCORE) {
      console.log(`Category below minimum: ${key} (${scaled[key]})`)
      return false
    }
  }

  let total = 0
  for (const key of Object.keys(scaled) as Array<keyof typeof scaled>) {
    total += scaled[key] * weights[key]
  }

  const weightedAverage = total
  console.log("Weighted Average Score:", weightedAverage)

  if (Number.isNaN(weightedAverage)) {
    console.log("Weighted score is NaN — failing iteration.")
    return false
  }

  return weightedAverage >= THRESHOLD
}
