import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { latex } = await req.json();

    if (!latex) {
      return NextResponse.json(
        { error: "Missing LaTeX source" },
        { status: 400 }
      );
    }

    const response = await fetch("https://latex.ytotech.com/builds/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "pdflatex",
        resources: [{ main: true, content: latex }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const logs = errorData?.logs?.toString() || "";

      const latexError =
        logs
          .split("\n")
          .find((line: string) => line.includes("error"))
          ?.replace(/.*error:/i, "")
          .trim() || "PDF generation failed";

      return NextResponse.json(
        {
          error: "LaTeX compilation error",
          details: latexError,
        },
        { status: 500 }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "PDF generation failed",
      },
      { status: 500 }
    );
  }
}
