"use client";
import Image from "next/image";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Tanvir Hasan Prince",
    text: "My daughter loves this program! She's learning so much and having fun at the same time.",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQEiMunth_XhuA/profile-displayphoto-shrink_800_800/0/1715702300610?e=1726099200&v=beta&t=bF-R74UB9qTBQT184icCMfCJF4s3LT-JNAP-Vzz2YFM",
  },
  {
    name: "Muhtasim Hafiz",
    text: "This coding platform has been a game changer for my son. He can't wait for his next lesson.",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQHdmuQQeWHhpg/profile-displayphoto-shrink_400_400/0/1679775181940?e=1726099200&v=beta&t=aoayVEI7GIA2MwyqnICCqOVsHl65X5WywP3QUz_o9zM",
  },
  {
    name: "Istiaque Reza Auyon",
    text: "Highly recommended! My children are engaged and learning important skills for the future.",
    avatar:
      "https://media.licdn.com/dms/image/D5635AQEO_VVZsDANkA/profile-framedphoto-shrink_800_800/0/1719436480959?e=1721023200&v=beta&t=3MAb9EyonKBqc0gxj7mjovTchPkTdmQEaQkvtLeOhxk",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const TestimonialSlider = () => {
  return (
    <div className="testimonial-slider container mx-auto py-10 my-8">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial flex flex-col items-center text-center p-4"
          >
            <div className="w-full flex justify-center mb-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                className="avatar rounded-full w-40 h-40"
                width={500}
                height={500}
              />
            </div>
            <p className="text-lg mb-2">&quot;{testimonial.text}&quot;</p>
            <h3 className="text-xl font-bold">{testimonial.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
