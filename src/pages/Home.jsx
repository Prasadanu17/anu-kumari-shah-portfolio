
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { 
  ArrowRight, Download, Code, Terminal, Cpu, Database,
  Sparkles, ChevronDown 
} from 'lucide-react'
import { projects as allProjects } from '../utils/constants'

const Home = () => {
  const heroRef = useRef(null)

  // Parallax effect for hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Featured: top 3 Web Development projects
  const featuredProjects = allProjects.filter(p => p.category === 'webdevelopment').slice(0, 3)

  const FeaturedProjectCard = ({ project }) => (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img src={project.image} alt={project.title} className="w-full h-44 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0,3).map((t) => (
            <span key={t} className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 via-transparent to-accent-light/30 dark:from-primary-900/30 dark:to-accent-dark/20 animate-gradient-x" />
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 mb-8 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Available for freelance & full-time
              </span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block gradient-text">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'AI Enthusiast',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
              <span className="block mt-2 text-slate-800 dark:text-slate-200">
                & Creative Thinker
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Crafting intelligent web experiences with modern technologies. 
              Specializing in React, Node.js, Python, and emerging AI/ML solutions.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact" className="group btn-primary flex items-center gap-2">
                Hire Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="btn-secondary flex items-center gap-2 group">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download CV
              </button>
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center gap-8"
            >
              {[
                { icon: Code, label: 'Frontend' },
                { icon: Terminal, label: 'Backend' },
                { icon: Cpu, label: 'AI/ML' },
                { icon: Database, label: 'Database' }
              ].map((tech, idx) => (
                <motion.div
                  key={tech.label}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-primary-500 transition-colors">
                    <tech.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-500">{tech.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">Featured Projects</h2>
              <p className="text-slate-600 dark:text-slate-400">Real-world applications built with passion</p>
            </div>
            <Link to="/projects" className="mt-4 md:mt-0 text-primary-600 dark:text-primary-400 font-semibold hover:gap-4 transition-all flex items-center gap-2 group">
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.slice(0,3).map((project) => (
              <FeaturedProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* (All Projects moved to separate Projects page) */}

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '3+', label: 'Years Experience' },
              { number: '50+', label: 'Projects Completed' },
              { number: '20+', label: 'Happy Clients' },
              { number: '100%', label: 'Commitment' }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

