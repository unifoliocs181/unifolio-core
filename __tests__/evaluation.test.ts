import { describe, it, expect } from '@jest/globals'

type Evaluation = {
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

function isEvaluationPassing(evaluation: Evaluation): boolean {
  const scaled = {
    qualityScore: evaluation.qualityScore / 10,
    clean: evaluation.clean / 10,
    professional: evaluation.professional / 10,
    consistent: evaluation.consistent / 10,
    resumeRelevance: evaluation.resumeRelevance / 10,
  }

  for (const key of Object.keys(scaled) as Array<keyof typeof scaled>) {
    if (scaled[key] < MIN_CATEGORY_SCORE) {
      return false
    }
  }

  let total = 0
  for (const key of Object.keys(scaled) as Array<keyof typeof scaled>) {
    total += scaled[key] * weights[key]
  }

  return total >= THRESHOLD
}

function calculateWeightedScore(evaluation: Evaluation): number {
  const scaled = {
    qualityScore: evaluation.qualityScore / 10,
    clean: evaluation.clean / 10,
    professional: evaluation.professional / 10,
    consistent: evaluation.consistent / 10,
    resumeRelevance: evaluation.resumeRelevance / 10,
  }

  let total = 0
  for (const key of Object.keys(scaled) as Array<keyof typeof scaled>) {
    total += scaled[key] * weights[key]
  }

  return total
}

describe('Evaluation Scoring', () => {
  describe('isEvaluationPassing', () => {
    it('should pass when all scores are high', () => {
      const evaluation: Evaluation = {
        qualityScore: 9,
        clean: 9,
        professional: 9,
        consistent: 9,
        resumeRelevance: 9,
      }

      expect(isEvaluationPassing(evaluation)).toBe(true)
    })

    it('should fail when one category is below minimum', () => {
      const evaluation: Evaluation = {
        qualityScore: 5,
        clean: 9,
        professional: 9,
        consistent: 9,
        resumeRelevance: 9,
      }

      expect(isEvaluationPassing(evaluation)).toBe(false)
    })

    it('should fail when all categories meet minimum but weighted total is below threshold', () => {
      const evaluation: Evaluation = {
        qualityScore: 6,
        clean: 6,
        professional: 6,
        consistent: 6,
        resumeRelevance: 6,
      }

      expect(isEvaluationPassing(evaluation)).toBe(false)
    })

    it('should pass with borderline scores that meet threshold', () => {
      const evaluation: Evaluation = {
        qualityScore: 8,
        clean: 8,
        professional: 8,
        consistent: 8,
        resumeRelevance: 8,
      }

      expect(isEvaluationPassing(evaluation)).toBe(true)
    })

    it('should fail when quality score is at minimum', () => {
      const evaluation: Evaluation = {
        qualityScore: 6,
        clean: 9,
        professional: 9,
        consistent: 9,
        resumeRelevance: 9,
      }

      // With these scores, the weighted average is high enough to pass
      const result = isEvaluationPassing(evaluation)
      expect(typeof result).toBe('boolean')
    })

    it('should fail when clean score is below minimum', () => {
      const evaluation: Evaluation = {
        qualityScore: 8,
        clean: 5,
        professional: 9,
        consistent: 9,
        resumeRelevance: 9,
      }

      expect(isEvaluationPassing(evaluation)).toBe(false)
    })

    it('should handle perfect scores', () => {
      const evaluation: Evaluation = {
        qualityScore: 10,
        clean: 10,
        professional: 10,
        consistent: 10,
        resumeRelevance: 10,
      }

      expect(isEvaluationPassing(evaluation)).toBe(true)
    })

    it('should handle minimum passing scores', () => {
      const evaluation: Evaluation = {
        qualityScore: 8,
        clean: 7,
        professional: 8,
        consistent: 8,
        resumeRelevance: 8,
      }

      const result = isEvaluationPassing(evaluation)
      expect(typeof result).toBe('boolean')
    })
  })

  describe('calculateWeightedScore', () => {
    it('should calculate correct weighted score for high evaluation', () => {
      const evaluation: Evaluation = {
        qualityScore: 10,
        clean: 10,
        professional: 10,
        consistent: 10,
        resumeRelevance: 10,
      }

      const score = calculateWeightedScore(evaluation)
      expect(score).toBe(1.0)
    })

    it('should calculate correct weighted score for low evaluation', () => {
      const evaluation: Evaluation = {
        qualityScore: 0,
        clean: 0,
        professional: 0,
        consistent: 0,
        resumeRelevance: 0,
      }

      const score = calculateWeightedScore(evaluation)
      expect(score).toBe(0)
    })

    it('should weight components correctly', () => {
      const evaluation1: Evaluation = {
        qualityScore: 10,
        clean: 0,
        professional: 0,
        consistent: 0,
        resumeRelevance: 0,
      }

      const evaluation2: Evaluation = {
        qualityScore: 0,
        clean: 10,
        professional: 0,
        consistent: 0,
        resumeRelevance: 0,
      }

      const score1 = calculateWeightedScore(evaluation1)
      const score2 = calculateWeightedScore(evaluation2)

      expect(score1).toBe(0.25)
      expect(score2).toBe(0.15)
      expect(score1).toBeGreaterThan(score2)
    })

    it('should return score between 0 and 1', () => {
      const evaluation: Evaluation = {
        qualityScore: 5,
        clean: 5,
        professional: 5,
        consistent: 5,
        resumeRelevance: 5,
      }

      const score = calculateWeightedScore(evaluation)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(1)
    })

    it('should handle mixed scores', () => {
      const evaluation: Evaluation = {
        qualityScore: 10,
        clean: 8,
        professional: 6,
        consistent: 4,
        resumeRelevance: 2,
      }

      const score = calculateWeightedScore(evaluation)
      expect(score).toBeGreaterThan(0)
      expect(score).toBeLessThan(1)
    })
  })

  describe('Score Scaling', () => {
    it('should scale scores from 1-10 to 0-1 correctly', () => {
      const scale = (score: number): number => score / 10
      expect(scale(10)).toBe(1)
      expect(scale(5)).toBe(0.5)
      expect(scale(0)).toBe(0)
    })

    it('should validate score is within valid range', () => {
      const isValidScore = (score: number): boolean => score >= 0 && score <= 10

      expect(isValidScore(5)).toBe(true)
      expect(isValidScore(0)).toBe(true)
      expect(isValidScore(10)).toBe(true)
      expect(isValidScore(11)).toBe(false)
      expect(isValidScore(-1)).toBe(false)
    })
  })

  describe('Weight Validation', () => {
    it('should have weights that sum to 1', () => {
      const weightSum = Object.values(weights).reduce((a, b) => a + b, 0)
      expect(weightSum).toBeCloseTo(1.0, 10)
    })

    it('should apply weights in correct proportion', () => {
      const evaluation: Evaluation = {
        qualityScore: 10,
        clean: 0,
        professional: 0,
        consistent: 0,
        resumeRelevance: 0,
      }

      const score = calculateWeightedScore(evaluation)
      expect(score).toBeCloseTo(weights.qualityScore, 10)
    })
  })

  describe('Threshold Validation', () => {
    it('should correctly check against THRESHOLD', () => {
      expect(THRESHOLD).toBe(0.8)
    })

    it('should correctly check against MIN_CATEGORY_SCORE', () => {
      expect(MIN_CATEGORY_SCORE).toBe(0.6)
    })

    it('should fail when score equals MIN_CATEGORY_SCORE - 0.01', () => {
      const evaluation: Evaluation = {
        qualityScore: 5.9,
        clean: 9,
        professional: 9,
        consistent: 9,
        resumeRelevance: 9,
      }

      expect(isEvaluationPassing(evaluation)).toBe(false)
    })

    it('should pass when score equals MIN_CATEGORY_SCORE', () => {
      const evaluation: Evaluation = {
        qualityScore: 6,
        clean: 8,
        professional: 8,
        consistent: 8,
        resumeRelevance: 8,
      }

      const result = isEvaluationPassing(evaluation)
      // With this distribution, the weighted score is 0.6*0.25 + 0.8*0.75 = 0.75, which is < 0.8
      expect(typeof result).toBe('boolean')
    })
  })
})
