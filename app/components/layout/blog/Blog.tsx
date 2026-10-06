import PageBanner from "../../shared/PageBanner";
import BlogSection from "../../homelayout/BlogSection";
import { site } from "@/data";

export default function Blog() {
  return (
    <>
      <PageBanner data={site.blog.banner} />
      <BlogSection showAll />
    </>
  );
}
