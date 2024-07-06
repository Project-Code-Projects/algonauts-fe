import Image from "next/image";
import algoboy from "../../../../public/homePage/algoboy.jpg";

const Feature1 = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-200 to-green-200 text-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 lg:flex lg:items-center lg:justify-between">
          <div className="text-center lg:text-left lg:w-1/2 lg:pr-12">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Why Choose Our Coding Platform for Your Child?
            </h2>
            <p className="mt-3 text-xl leading-relaxed">
              In this digital age, coding is an essential skill that opens up a
              world of opportunities for children. Our platform makes learning
              to code fun and engaging through gamification, ensuring that your
              child stays motivated and interested. By turning coding lessons
              into exciting games, we help children develop critical thinking,
              problem-solving skills, and creativity. Give your child a head
              start in their education and future career by introducing them to
              coding today!
            </p>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-12">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src={algoboy}
                alt="Coding for Kids"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                width={600}
                height={600}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature1;
