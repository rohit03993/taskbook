import type { Metadata } from "next";
import { InstitutesPage, instituteMeta } from "@/components/AudiencePage";

export const metadata: Metadata = instituteMeta;

export default function Page() {
  return <InstitutesPage />;
}
