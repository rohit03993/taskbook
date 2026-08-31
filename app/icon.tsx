import { faviconResponse, readFaviconBytes } from "@/lib/favicon-file";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const { body, contentType: type } = await readFaviconBytes();
  return faviconResponse(body, type);
}
