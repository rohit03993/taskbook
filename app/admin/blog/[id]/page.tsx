import { AdminShell } from "@/app/admin/AdminShell";
import { deletePostAction } from "@/app/admin/actions";
import { BlogForm } from "@/app/admin/blog/BlogForm";
import { getPostById } from "@/lib/blog";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit post", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <AdminShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="font-display text-3xl text-navy-900">Edit post</h1>
        <form action={deletePostAction}>
          <input type="hidden" name="id" value={post.id} />
          <button type="submit" className="text-sm text-red-700 hover:underline">
            Delete
          </button>
        </form>
      </div>
      <BlogForm
        initial={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          description: post.description,
          body: post.body,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          ogTitle: post.ogTitle,
          ogDescription: post.ogDescription,
          canonicalPath: post.canonicalPath,
          focusKeyword: post.focusKeyword,
          extraKeywords: post.extraKeywords,
          cityTag: post.cityTag,
          published: post.published,
          readMinutes: post.readMinutes,
        }}
      />
    </AdminShell>
  );
}
