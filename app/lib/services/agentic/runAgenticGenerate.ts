import {
  evaluationSchema,
  improvedSchema,
  latexSchema,
  summarySchema,
} from "@/lib/schema/agentic-schema"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { isEvaluationPassing, EvalMetrics } from "./evaluationScore"

const baseModels = {
  generate: openai("gpt-4o-mini"),
  evaluate: openai("gpt-3.5-turbo"),
}

export async function runAgenticGenerate(
  generationPrompt: string,
  references: string,
  courseDetails: string,
) {
  console.time("Total Runtime")

  console.time("Initial Generation")
  const [latexRes, summaryRes] = await Promise.all([
    generateObject({
      model: baseModels.generate,
      schema: latexSchema,
      system: latexSystemPrompt,
      prompt: buildLatexPrompt(generationPrompt, references, courseDetails),
      maxTokens: Number.parseInt(process.env.MAX_TOKENS_LATEX_GENERATION ?? "1024"),
    }),
    generateObject({
      model: baseModels.generate,
      schema: summarySchema,
      system: summarySystemPrompt,
      prompt: buildSummaryPrompt(references, courseDetails),
      maxTokens: Number.parseInt(process.env.MAX_TOKENS_SUMMARY ?? "512"),
    }),
  ])
  console.timeEnd("Initial Generation")

  let currentLatex = (latexRes as any).object?.latex ?? ""
  const referenceSummary = (summaryRes as any).object?.reference_summary ?? ""

  const MAX_ITER = 2
  for (let i = 0; i < MAX_ITER; i++) {
    console.time(`Iteration ${i + 1}`)
    const { object: evalObj } = await generateObject({
      model: baseModels.evaluate,
      schema: evaluationSchema,
      system: evaluationSystemPrompt,
      prompt: buildEvaluationPrompt(
        generationPrompt,
        referenceSummary,
        currentLatex,
      ),
      maxTokens: Number.parseInt(process.env.MAX_TOKENS_EVALUATION ?? "256"),
    })
    console.timeEnd(`Iteration ${i + 1}`)

    const evalMetrics: EvalMetrics = {
      qualityScore: evalObj.qualityScore,
      clean: evalObj.clean,
      professional: evalObj.professional,
      consistent: evalObj.consistent,
      referenceRelevance: evalObj.referenceRelevance,
    }

    if (isEvaluationPassing(evalMetrics)) break

    console.time(`Improvement ${i + 1}`)
    const { object: improvedObj } = await generateObject({
      model: baseModels.evaluate,
      schema: improvedSchema,
      system: improvementSystemPrompt,
      prompt: buildImprovementPrompt(
        generationPrompt,
        referenceSummary,
        currentLatex,
        evalObj.specificIssues ?? [],
        evalObj.improvementSuggestions ?? [],
      ),
      maxTokens: Number.parseInt(process.env.MAX_TOKENS_LATEX_GENERATION ?? "1024"),
    })
    console.timeEnd(`Improvement ${i + 1}`)

    currentLatex = improvedObj.improvedLatex ?? currentLatex
  }

  console.timeEnd("Total Runtime")
  return { finallatexcode: currentLatex }
}

const latexSystemPrompt = `You are a highly skilled LaTeX generator. Your role is to produce:
  \t**LaTeX Code** — Clean, professional, and well-structured LaTeX code that adheres to best practices. Ensure it is:
 \t - Accurate to the prompt and references
 \t - Properly formatted with correct LaTeX syntax
 \t - Clear, precise, and easy to understand, especially for mathematical or technical content


  Important:
  - Match the tone and intent of the provided course details.
  - Avoid unnecessary complexity or verbosity.
  - Ensure logical flow and proper organization in both output elements.`
const summarySystemPrompt = `You are a highly skilled reference summarizer. Your role is to produce:
\t**Reference Summary** — A concise, well-written summary that distills the essential points, structure, and focus of the reference material. This summary is used to later evaluate the alignment and fidelity of the LaTeX output.`
const evaluationSystemPrompt = `You are an expert in evaluating LaTeX code. Your task is to assess the provided LaTeX content for the following criteria:

  \t  1. **Overall Quality** – How well-written and effective the code is.
  \t  2. **Cleanliness** – Code clarity, organization, and absence of redundancy.
  \t  3. **Professionalism** – Adherence to professional standards in formatting, presentation, and typographic quality.
  \t  4. **Consistency** – Uniformity in formatting, spacing, naming conventions, and structure.
  \t  5. **Reference Relevance** – How well the code aligns with the intent and information in the given reference summary.

  \t  You must provide:
  \t  - A score from 1 to 10 for each category listed above.
  \t  - A list of specific issues identified in the LaTeX code.
  \t  - A list of actionable suggestions for improvement.

  \t  Ensure your evaluation is accurate, objective, and fully based on the provided prompt, reference summary, and LaTeX code.`
const improvementSystemPrompt =
  "You are a professional LaTeX expert. Your job is to generate clean, consistent, and publication-ready LaTeX code that adheres strictly to the provided reference material and feedback."

function buildLatexPrompt(gen: string, refs: string, details: string) {
  return `Using these materials generate LaTeX and summary:\nPrompt: ${gen}\nRefs: ${refs}\nCourse: ${details}`
}
function buildSummaryPrompt(refs: string, details: string) {
  return `Summarize references:\nRefs: ${refs}\nCourse: ${details}`
}
function buildEvaluationPrompt(gen: string, summary: string, latex: string) {
  return `Evaluate LaTeX:\nPrompt: ${gen}\nSummary: ${summary}\nCode: ${latex}`
}
function buildImprovementPrompt(
  gen: string,
  summary: string,
  latex: string,
  issues: string[],
  suggestions: string[],
) {
  return `Improve the LaTeX code based on feedback:\nIssues:${issues.join("; ")}\nSuggestions:${suggestions.join("; ")}\nPrompt:${gen}\nSummary:${summary}\nCode:${latex}`
}
