"use client";

import { tailwindButtonClass } from "@/stylesShared/tailwindButtonClass";
import { FaCheck, FaTimes } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      title: "1 Child",
      monthly: "$10",
      yearly: "$100",
      description: "Perfect for individual learners.",
      features: [
        { text: "Access to all lessons", included: true },
        { text: "Progress tracking", included: true },
        { text: "Personalized learning path", included: true },
        { text: "Parent dashboard", included: true },
        { text: "Multi-device support", included: true },
        { text: "Priority support", included: false },
      ],
    },
    {
      title: "2 Children",
      monthly: "$15",
      yearly: "$150",
      description: "Ideal for siblings learning together.",
      features: [
        { text: "Access to all lessons", included: true },
        { text: "Progress tracking", included: true },
        { text: "Personalized learning paths", included: true },
        { text: "Parent dashboard", included: true },
        { text: "Multi-device support", included: true },
        { text: "Priority support", included: true },
      ],
    },
    {
      title: "More than 2 Children",
      monthly: "$20",
      yearly: "$200",
      description: "Best for larger families.",
      features: [
        { text: "Access to all lessons", included: true },
        { text: "Progress tracking", included: true },
        { text: "Personalized learning paths", included: true },
        { text: "Advanced parent dashboard", included: true },
        { text: "Multi-device support", included: true },
        { text: "Priority support", included: true },
      ],
    },
  ];

  return (
    <div className="py-8 ">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Our Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="plan bg-gradient-to-r from-blue-200 to-green-200 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {plan.title}
              </h3>
              <div className="mb-6">
                <p className="text-3xl font-semibold text-indigo-600">
                  {plan.monthly}{" "}
                  <span className="text-sm text-gray-600">/ month</span>
                </p>
                <p className="text-xl font-semibold text-gray-700 mt-2">
                  {plan.yearly}{" "}
                  <span className="text-sm text-gray-600">/ year</span>
                </p>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="text-left mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    {feature.included ? (
                      <FaCheck className="text-green-500 mr-2" />
                    ) : (
                      <FaTimes className="text-red-500 mr-2" />
                    )}
                    <span
                      className={
                        feature.included ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button className={`${tailwindButtonClass} w-full py-3`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
