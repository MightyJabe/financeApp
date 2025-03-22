import React from "react";

const features = [
  { title: "Real-time Net Worth Calculation", desc: "Always stay updated with your financial standing." },
  { title: "Track Investments & Crypto", desc: "Monitor stocks, crypto, and bank balances." },
  { title: "Secure & Private", desc: "We prioritize security and encryption for your data." }
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
