import React from "react";
import { motion } from "framer-motion";

const skills = [
 {
    title: "Frontend Development",
    image: "https://thumbs.dreamstime.com/b/front-end-development-website-ui-ux-interface-monitor-screen-laptop-tablet-phone-software-development-front-end-coding-271143004.jpg",  // or the LinkedIn one
    items: ["HTML", "CSS", "JavaScript", "React JS", "Bootstrap", "SEO"]
  },
  {
    title: "Backend Development",
    image: "https://thumbs.dreamstime.com/b/backend-development-infographic-icons-server-database-api-code-more-432365807.jpg",  // super clean icons
    items: ["Python", "PHP", "CodeIgniter", "MySQL", "phpMyAdmin"]
  },
  {
    title: "Data Analytics",
    image: "https://images.talkpython.fm/static/course_images/python-data-visualization.webp?cache_id=28132b",
    items: ["Python", "NumPy", "Pandas", "EDA", "Data Cleaning"]
  },
  {
    title: "Tools & Platforms",
    image: "https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/images/screenshot.gif",
    items: ["Git", "GitHub", "VS Code", "Firebase", "Canva"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-primary-500 font-semibold uppercase mb-2">
            Skills
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Technology Stack
          </h3>
          <p className="text-slate-500 mt-2">
            MCA Student • Data Analyst • Web Developer
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <img
                src={skill.image}
                alt={`${skill.title} illustration`}
                className="h-40 w-full object-cover"
              />

              <div className="p-6 text-center">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                  {skill.title}
                </h4>

                <div className="flex flex-wrap justify-center gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Skills;