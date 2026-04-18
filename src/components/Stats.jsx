import React, { useState, useEffect, useRef } from "react";

const Counter = ({ target, children, color }) => {
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
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:-translate-y-1 text-center"
    >
      <h2 className={`text-4xl font-bold ${color}`}>{count}+</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{children}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">My Learning Journey</h2>
          <p className="text-slate-500">Progress as MCA Student & Web Developer</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <Counter target={15} color="text-primary-500">
            Web Projects Built
          </Counter>

          <Counter target={10} color="text-indigo-500">
            React Components
          </Counter>

          <Counter target={5} color="text-purple-500">
            AI Mini Projects
          </Counter>

          <Counter target={200} color="text-pink-500">
            Coding Practice Hours
          </Counter>

        </div>
      </div>
    </section>
  );
};

export default Stats;
