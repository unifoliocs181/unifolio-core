import { z } from "zod"
export const latexSchema = z.object({ latex: z.string().min(1) })
export const summarySchema = z.object({ reference_summary: z.string().min(1) })
export const evaluationSchema = z.object({
  qualityScore: z.number().min(1).max(10),
  clean: z.number().min(1).max(10),
  professional: z.number().min(1).max(10),
  consistent: z.number().min(1).max(10),
  resumeRelevance: z.number().min(1).max(10),
  specificIssues: z.array(z.string()),
  improvementSuggestions: z.array(z.string()),
})
export const improvedSchema = z.object({ improvedLatex: z.string().min(1) })
