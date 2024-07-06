"use client";
import Image from "next/image";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Emily Anderson",
    text: "My daughter loves this program! She's learning so much and having fun at the same time.",
    avatar:
      "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Michael Brown",
    text: "This coding platform has been a game changer for my son. He can't wait for his next lesson.",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Sophia Garcia",
    text: "Highly recommended! My children are engaged and learning important skills for the future.",
    avatar:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
