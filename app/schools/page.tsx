import type { Metadata } from "next";
import { SchoolsPage, schoolMeta } from "@/components/AudiencePage";

export const metadata: Metadata = schoolMeta;

export default function Page() {
  return <SchoolsPage />;
}
