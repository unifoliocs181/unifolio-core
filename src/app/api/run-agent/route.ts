import { NextRequest, NextResponse } from 'next/server'
import { runAgenticGenerate } from '../generation/latex-generation/agents-evaluator'
import { resumeTemplates } from '../../templates/resumes'

export async function POST(req: NextRequest) {
  try {
    const { profileInfo, resumeText, jobDescription, templateId } =
      await req.json()

    // 1. Validate template
    const template = resumeTemplates.find((t) => t.id === templateId)
    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Invalid resume template selected.' },
        { status: 400 }
      )
    }

    console.log('Selected Template:', template.id)
    // 2. Run agentic generation
    const result = await runAgenticGenerate(
      profileInfo,
      resumeText,
      jobDescription,
      template.code // ← only send the LaTeX, not entire object
    )

    return NextResponse.json({
      success: true,
      latex: result.finallatexcode,
    })
  } catch (err) {
    console.error('Agentic Flow Error:', err)
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
