import BpoAbout1 from "../../homelayout/AboutSection";
import BpoBanner1 from "../../homelayout/Banner";
import BpoBlog1 from "../../homelayout/BlogSection";
import BpoChoose1 from "../../homelayout/Work";
import BpoServices1 from "../../homelayout/ServicesSection";
import BpoTestimonial1 from "../../homelayout/TestimonialSection";

export default function HomeSection(){
    return(
        <>
        <BpoBanner1/>
        <BpoAbout1/>
        <BpoServices1/>
        <BpoChoose1/>
        <BpoTestimonial1/>
        <BpoBlog1/>
        </>
    )
}