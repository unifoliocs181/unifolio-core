export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

const PDFCO_KEY = process.env.PDFCO_API_KEY!;

interface PdfCoResponse {
  body?: string;
  message?: string;
}

async function extractTextFromPdf(pdfUrl: string): Promise<string> {
  const apiUrl = "https://api.pdf.co/v1/pdf/convert/to/text";

  const payload = {
    url: pdfUrl,
    inline: true,
    pages: "",
    async: false,
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "x-api-key": PDFCO_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as PdfCoResponse;

  if (!data.body) {
    throw new Error(`PDF.co failed: ${data.message || JSON.stringify(data)}`);
  }

  return data.body;
}

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "Missing 'urls' array in request body." },
        { status: 400 }
      );
    }

    const results: Record<string, string> = {};

    for (let i = 0; i < urls.length; i++) {
      const text = await extractTextFromPdf(urls[i]);
      results[`pdf${i + 1}`] = text;
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error("PDF PARSE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to parse PDF: " + (error as Error).message,
      },
      { status: 500 }
    );
  }
}
