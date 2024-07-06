import Image from "next/image";
import kidVideoCall from "../../../../public/homePage/kid-video-call-instructor.jpg";

const Feature2 = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-200 to-green-200 text-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 lg:flex lg:items-center lg:justify-between">
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src={kidVideoCall}
                alt="Coding for Kids"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                width={600}
                height={600}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="text-center lg:text-left lg:w-1/2 ml-24">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Learn Coding with Live Instructors
            </h2>
            <p className="mt-3 text-xl leading-relaxed">
              Our platform not only makes learning to code fun and engaging
              through gamification but also provides the unique opportunity for
              children to interact with live instructors via video calls. This
              personalized approach ensures that your child receives immediate
              feedback and support, enhancing their learning experience and
              keeping them motivated. By combining interactive games with live
              mentorship, we help children develop critical thinking,
              problem-solving skills, and creativity. Start your child&apos;s
              coding journey with expert guidance today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature2;
