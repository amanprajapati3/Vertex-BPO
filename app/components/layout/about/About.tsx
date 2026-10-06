import PageBanner from "../../shared/PageBanner";
import AboutSection from "../../homelayout/AboutSection";
import { site } from "@/data";
import Choose from "../choose/Choose";

export default function About() {
  return (
    <>
      <PageBanner data={site.about.banner} />
      <AboutSection hideButton />
      <Choose/>
    </>
  );
}
