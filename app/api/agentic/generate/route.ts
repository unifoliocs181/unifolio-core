import { NextResponse } from "next/server"
import { runAgenticGenerate } from "@/lib/services/agentic/runAgenticGenerate"

/**
 * POST /api/agentic/generate
 * Body: { generationPrompt: string, references: string, courseDetails: string }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { generationPrompt, references, courseDetails } = body ?? {}

    if (!generationPrompt || !references || !courseDetails) {
      return NextResponse.json(
        { error: "Missing required fields: generationPrompt, references, courseDetails" },
        { status: 400 },
      )
    }

    const result = await runAgenticGenerate(
      generationPrompt,
      references,
      courseDetails,
    )

    return NextResponse.json({ success: true, data: result })
  } catch (err: any) {
    console.error("/api/agentic/generate error:", err)
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 })
  }
}
