import React from "react";
import Hero from "@/components/pageComponents/HomepageComponents/Hero";
import Feature1 from "@/components/pageComponents/HomepageComponents/Feature1";
import Feature2 from "@/components/pageComponents/HomepageComponents/Feature2";
import Feature3 from "@/components/pageComponents/HomepageComponents/Feature3";
import TestimonialSlider from "@/components/pageComponents/HomepageComponents/Testimonial";
import Footer from "@/components/shared/Footer";
import PaymentMethods from "@/components/pageComponents/HomepageComponents/PaymentMethods";
import Newsletter from "@/components/pageComponents/HomepageComponents/NewsLetter";
import Pricing from "@/components/pageComponents/Pricing";

const Homepage = () => {
  return (
    <>
      <Hero />
      <Feature1></Feature1>
      <Feature2></Feature2>
      <Feature3></Feature3>
      <TestimonialSlider />
      <Pricing></Pricing>
      <PaymentMethods></PaymentMethods>
      <Newsletter></Newsletter>
      <Footer />
    </>
  );
};

export default Homepage;
