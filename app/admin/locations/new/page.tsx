import { AdminShell } from "@/app/admin/AdminShell";
import { LocationForm } from "@/app/admin/locations/LocationForm";

export const metadata = { title: "New city", robots: { index: false, follow: false } };

export default function NewLocationPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">New city page</h1>
      <LocationForm
        initial={{
          slug: "",
          city: "",
          headline: "",
          intro: "",
          body: "",
          metaTitle: "",
          metaDescription: "",
          focusKeyword: "",
          faqs: [],
          published: true,
        }}
      />
    </AdminShell>
  );
}
