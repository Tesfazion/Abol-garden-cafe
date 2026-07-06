import { NextRequest, NextResponse } from "next/server";
export const runtime = 'nodejs';
import fs from "fs";
import path from "path";

const IMAGES_DIR = "C:/Protected File/Real Project/Cafe file/Why Abole Garden Cafe section";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  try {
    const name = decodeURIComponent(params.name);
    const filePath = path.join(IMAGES_DIR, name);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const buffer = await fs.promises.readFile(filePath);
    const ext = path.extname(name).toLowerCase();
    const contentType = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
