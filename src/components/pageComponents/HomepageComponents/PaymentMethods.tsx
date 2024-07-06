import Image from "next/image";

const paymentMethods = [
  {
    name: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  },
  {
    name: "MasterCard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
  {
    name: "PayPal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    name: "American Express",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1024px-American_Express_logo_%282018%29.svg.png",
  },
  {
    name: "Discover",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/1920px-Discover_Card_logo.svg.png",
  },
  {
    name: "Apple Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Google Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/768px-Google_Pay_Logo.svg.png",
  },
  {
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1920px-Stripe_Logo%2C_revised_2016.svg.png",
  },
];

const PaymentMethods = () => {
  return (
    <div className="payment-methods container mx-auto py-10 my-20">
      <h2 className="text-center text-2xl font-bold mb-8">We Accept</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {paymentMethods.map((method, index) => (
          <div key={index} className="flex justify-center items-center p-4 ">
            <Image
              src={method.logo}
              alt={method.name}
              className="h-12 w-auto"
              width={150}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
