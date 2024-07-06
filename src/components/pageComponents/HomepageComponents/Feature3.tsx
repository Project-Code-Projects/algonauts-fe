import Image from "next/image";
import progressMonitoring from "../../../../public/homePage/progress-monitoring.jpg";

const Feature3 = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-200 to-green-200 text-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 lg:flex lg:items-center lg:justify-between">
          <div className="text-center lg:text-left lg:w-1/2 mr-24">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
              Monitor Your Child&apos;s Progress
            </h2>
            <p className="mt-3 text-xl leading-relaxed">
              Stay informed about your child’s learning journey with our
              comprehensive progress monitoring tools. Our platform provides
              detailed insights and data on your child’s performance, helping
              you understand their strengths and areas for improvement. With
              real-time updates and easy-to-read reports, you can track their
              progress, set goals, and celebrate achievements. Empower your
              child’s education with actionable data and support them every step
              of the way.
            </p>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src={progressMonitoring}
                alt="Progress Monitoring"
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

export default Feature3;
