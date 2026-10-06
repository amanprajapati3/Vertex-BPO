import { notFound } from "next/navigation";
import ServiceDetail from "@/app/components/layout/services/ServiceDetail";
import { getServiceDetailPageBySlug, getServiceSlugs } from "@/data";

export function generateStaticParams() {
  return getServiceSlugs().map(({ slug }) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getServiceDetailPageBySlug(slug);

  if (!result) notFound();

  return <ServiceDetail service={result.service} detail={result.detail} />;
}
