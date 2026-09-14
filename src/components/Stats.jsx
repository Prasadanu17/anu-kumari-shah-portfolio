import React, { useState, useEffect, useRef } from "react";

const Counter = ({ target, children }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let current = 0;
          const increment = target / 50;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 30);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => ref.current && observer.unobserve(ref.current);
  }, [target, hasAnimated]);

  return (
    <div
      ref={ref}
      className="bg-[#FAF8F5] rounded-xl p-6 border border-[#D3CEC7] text-center shadow-sm hover:border-[#2A2825] transition-colors"
    >
      <h2 className="text-4xl font-bold text-[#2A2825] font-display">{count}+</h2>
      <p className="mt-2 text-xs font-mono uppercase tracking-wider text-[#66625C]">{children}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-[#ECE8E3] border-t border-[#D3CEC7]">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-[#66625C] font-mono text-xs uppercase tracking-widest block mb-2">02 FOCUS // METRICS</span>
          <h3 className="text-3xl font-bold text-[#2A2825] font-display uppercase">Academic & Engineering Milestones</h3>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <Counter target={15}>
            Projects Completed
          </Counter>

          <Counter target={10}>
            Machine Learning Models
          </Counter>

          <Counter target={4}>
            Live Production Sites
          </Counter>

          <Counter target={500}>
            Coding Practice Hours
          </Counter>

        </div>
      </div>
    </section>
  );
};

export default Stats;
