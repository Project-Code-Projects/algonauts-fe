"use client";
import { tailwindButtonClass } from "@/stylesShared/tailwindButtonClass";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    // Handle the subscription logic here
    // For now, we'll just show a success message
    setMessage(`Thank you for subscribing, ${email}!`);
    setEmail("");
  };

  return (
    <div className="newsletter  py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="mb-6 text-gray-700">
          Stay updated with the latest news and special offers.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row justify-center items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={`${tailwindButtonClass}`}>
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
