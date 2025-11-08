export type EvalMetrics = {
  qualityScore: number
  clean: number
  professional: number
  consistent: number
  referenceRelevance: number
}

/**
 * Simple passing heuristic for evaluations.
 * - Assumption: Scores are 1-10.
 * - Pass when qualityScore >= 7 and the other metrics average >= 6
 * You can tune this or replace with a more nuanced policy.
 */
export function isEvaluationPassing(metrics: EvalMetrics) {
  if (!metrics) return false
  const { qualityScore, clean, professional, consistent, referenceRelevance } = metrics
  const otherAvg = (clean + professional + consistent + referenceRelevance) / 4
  return qualityScore >= 7 && otherAvg >= 6
}
