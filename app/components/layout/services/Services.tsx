import PageBanner from "../../shared/PageBanner";
import ServicesSection from "../../homelayout/ServicesSection";
import { site } from "@/data";

export default function Services() {
  return (
    <>
      <PageBanner data={site.services.banner} />
      <ServicesSection showAll light />
    </>
  );
}
