import {
  evaluationSchema,
  improvedSchema,
  latexSchema,
  summarySchema,
} from './agentic-schema'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { isEvaluationPassing } from './evaluationScore'
import {
  evaluationSystemPrompt,
  improvementSystemPrompt,
  latexSystemPrompt,
  summarySystemPrompt,
} from './systemPrompts'
const baseModels = {
  generate: openai('o3-mini'),
  evaluate: openai('o3-mini'),
}

export async function runAgenticGenerate(
  profileInfo: string,
  currentResume: string,
  jobDescription: string,
  templateLatex: string
) {
  console.time('Total Runtime')

  console.time('Initial Generation')
  const [latexRes, summaryRes] = await Promise.all([
    generateObject({
      model: baseModels.generate,
      schema: latexSchema,
      system: latexSystemPrompt,
      prompt: `
Using the information below, generate an ATS-friendly, professional LaTeX resume. Use ONLY the information provided below and strictly use the template provided. Do NOT fabricate any experience, skills, or dates.

LinkedIn Profile Information:
${profileInfo}

Old Resume:
${currentResume}

Job Description:
${jobDescription}

Template to Be Used:
${templateLatex}

Instructions:
- Combine LinkedIn + old resume information into one unified resume.
- Tailor the content toward the job description.
- Improve clarity, phrasing, impact, and structure.
- Keep all details factual.
- Produce clean, modern, valid LaTeX code.
- Output ONLY LaTeX. No comments, no explanations, no markdown, no backticks.
`,
    }),
    generateObject({
      model: baseModels.generate,
      schema: summarySchema,
      system: summarySystemPrompt,
      prompt: `
Summarize the user's LinkedIn profile using ONLY the information below.

${profileInfo}

Your task:
- Extract every important detail from the LinkedIn profile.
- Rewrite everything clearly, professionally, and concisely.
- Include roles, responsibilities, skills, achievements, education, and any present sections.
- Do NOT invent anything not in the profile.
`,
    }),
  ])
  console.timeEnd('Initial Generation')

  let currentLatex = latexRes.object.latex
  const resumeSummary = summaryRes.object.reference_summary

  const MAX_ITER = 2
  for (let i = 0; i < MAX_ITER; i++) {
    console.time(`Iteration ${i + 1}`)
    const { object: evalObj } = await generateObject({
      model: baseModels.evaluate,
      schema: evaluationSchema,
      system: evaluationSystemPrompt,
      prompt: `
Evaluate the following LaTeX resume.

LaTeX Resume:
${currentLatex}

resume Summary:
${resumeSummary}

Job Description:
${jobDescription}

Template to be Used:
${templateLatex}

Instructions:
- Score each category from 1 to 10.
- Identify specific issues.
- Provide actionable improvement suggestions only if there are any.
- Output ONLY values for the required fields. No extra text.
`,
    })
    console.timeEnd(`Iteration ${i + 1}`)

    const evalMetrics = {
      qualityScore: evalObj.qualityScore,
      clean: evalObj.clean,
      professional: evalObj.professional,
      consistent: evalObj.consistent,
      resumeRelevance: evalObj.resumeRelevance,
    }
    console.log(`Evaluation Metrics (Iteration ${i + 1}):`, evalMetrics)
    if (isEvaluationPassing(evalMetrics)) break

    console.time(`Improvement ${i + 1}`)
    const { object: improvedObj } = await generateObject({
      model: baseModels.evaluate,
      schema: improvedSchema,
      system: improvementSystemPrompt,
      prompt: `
You are improving a professional LaTeX resume based on real user data.

Raw LinkedIn Profile Information:
${profileInfo}

Raw Old Resume Text:
${currentResume}

Job Description:
${jobDescription}

Template to be Used:
${templateLatex}

LinkedIn Summary (derived from LinkedIn profile):
${resumeSummary}

Current LaTeX Resume:
${currentLatex}

Issues Identified by the Evaluation Step:
${evalObj.specificIssues.join('\n')}

Suggested Improvements:
${evalObj.improvementSuggestions.join('\n')}

Your task:
- Fix EVERY issue listed.
- Apply ALL improvement suggestions.
- Use ONLY information from LinkedIn, the old resume, and the job description.
- Do NOT invent or hallucinate anything new.
- Strengthen clarity, impact, correctness, and job alignment.
- Preserve a clean, modern, valid LaTeX structure.
- Ensure result is ATS-friendly and strictly factual.
- Return ONLY the improved LaTeX code.

Output ONLY LaTeX. No comments, markdown, or explanations.
`,
    })
    console.timeEnd(`Improvement ${i + 1}`)

    currentLatex = improvedObj.improvedLatex
  }

  console.timeEnd('Total Runtime')
  return { finallatexcode: currentLatex }
}
