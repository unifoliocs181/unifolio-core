import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 }
      );
    }

    const uploaded = await utapi.uploadFiles(file);

    if (!uploaded.data?.ufsUrl) {
      throw new Error("UploadThing returned no URL");
    }

    return NextResponse.json({
      success: true,
      url: uploaded.data.ufsUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
