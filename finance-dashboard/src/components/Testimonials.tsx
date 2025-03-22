import React from "react";

const testimonials = [
  { name: "Alice Johnson", text: "This app completely changed my financial life!" },
  { name: "Michael Smith", text: "I love how easy it is to track everything." },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-200 py-16">
      <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto mt-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="p-6 bg-white shadow-md rounded-lg mb-6">
            <p className="text-gray-800">&ldquo;{t.text}&rdquo;</p>
            <h4 className="mt-2 font-bold">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
