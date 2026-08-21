import { AdminShell } from "@/app/admin/AdminShell";
import { BlogForm } from "@/app/admin/blog/BlogForm";

export const metadata = { title: "New post", robots: { index: false, follow: false } };

export default function NewPostPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-navy-900">New post</h1>
      <BlogForm
        initial={{
          slug: "",
          title: "",
          description: "",
          body: "",
          metaTitle: "",
          metaDescription: "",
          ogTitle: "",
          ogDescription: "",
          canonicalPath: "",
          focusKeyword: "",
          extraKeywords: "",
          cityTag: "",
          published: false,
          readMinutes: 5,
        }}
      />
    </AdminShell>
  );
}
