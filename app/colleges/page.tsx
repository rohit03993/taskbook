import type { Metadata } from "next";
import { CollegesPage, collegeMeta } from "@/components/AudiencePage";

export const metadata: Metadata = collegeMeta;

export default function Page() {
  return <CollegesPage />;
}
