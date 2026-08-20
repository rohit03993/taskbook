import Link from "next/link";
import { DualCta } from "@/components/DualCta";

export default function NotFound() {
  return (
    <div className="container-site py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">404</p>
      <h1 className="mt-3 font-display text-4xl text-navy-900">That page is not here.</h1>
      <p className="mt-3 text-sm text-navy-700">Try features, pricing, or talk on WhatsApp.</p>
      <DualCta className="mt-8 justify-center" />
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-navy-600">
        Back home
      </Link>
    </div>
  );
}
