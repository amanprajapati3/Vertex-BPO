import { notFound } from "next/navigation";
import BlogDetail from "@/app/components/layout/blog/BlogDetail";
import { getBlogDetailPageBySlug, getBlogPostSlugs } from "@/data";

export function generateStaticParams() {
  return getBlogPostSlugs().map(({ slug }) => ({ slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getBlogDetailPageBySlug(slug);

  if (!result) notFound();

  return <BlogDetail post={result.post} article={result.article} />;
}
