import React from 'react'
import { Link } from 'react-router-dom'
import CustomCursor from '../components/common/CustomCursor'
import Projects from '../components/Projects'

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
      <CustomCursor />
      <div className="container mx-auto px-6">
        <div className="mb-8 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
        <Projects />
      </div>
    </div>
  )
}

export default ProjectsPage
