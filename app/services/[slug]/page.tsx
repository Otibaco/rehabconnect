import { notFound } from "next/navigation";
import { servicesData } from "@/lib/data";
import { ServiceDetailPage } from "../ServiceDetailPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const service = servicesData.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}