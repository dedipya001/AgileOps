import { motion } from "framer-motion";
import { useState } from "react";

export function TestimonialsCard({ items }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const item = items[index];

  return (
    <div className="testimonial-wrapper">

      <button onClick={prev} className="carousel-btn">
        ←
      </button>

      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="testimonial-card"
      >
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </motion.div>

      <button onClick={next} className="carousel-btn">
        →
      </button>

    </div>
  );
}
